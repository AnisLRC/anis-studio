import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchProjectById,
  fetchClientById,
  fetchCarpenterById,
  fetchProjectFilesForProject,
  updateProjectStatus,
} from "../lib/interiors";

type Project = NonNullable<Awaited<ReturnType<typeof fetchProjectById>>>;
type Client = NonNullable<Awaited<ReturnType<typeof fetchClientById>>>;
type Carpenter = NonNullable<Awaited<ReturnType<typeof fetchCarpenterById>>>;
type ProjectFile = Awaited<
  ReturnType<typeof fetchProjectFilesForProject>
>[number];

const STATUS_OPTIONS: { value: Project["status"]; label: string }[] = [
  { value: "inquiry", label: "Upit" },
  { value: "3d_in_progress", label: "3D u izradi" },
  { value: "3d_done", label: "3D gotovo" },
  { value: "vr_in_progress", label: "VR u izradi" },
  { value: "vr_done", label: "VR gotovo" },
  { value: "presented", label: "Prezentirano" },
];

const AdminInteriorsProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const [client, setClient] = useState<Client | null>(null);
  const [carpenter, setCarpenter] = useState<Carpenter | null>(null);
  const [isLoadingRelated, setIsLoadingRelated] = useState(false);
  const [relatedError, setRelatedError] = useState<string | null>(null);

  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [filesError, setFilesError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const load = async () => {
      if (!id) {
        setLoadError("Nedostaje ID projekta u ruti.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setLoadError(null);

        const data = await fetchProjectById(id);

        if (!isCancelled) {
          if (!data) {
            setLoadError("Projekt nije pronađen.");
          } else {
            setProject(data);
          }
        }
      } catch (error) {
        console.error("[AdminInteriorsProjectDetailPage] Failed to load project:", error);
        if (!isCancelled) {
          setLoadError("Došlo je do greške pri dohvaćanju projekta.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      isCancelled = true;
    };
  }, [id]);

  useEffect(() => {
    let isCancelled = false;

    const loadRelated = async () => {
      // reset starog stanja
      setClient(null);
      setCarpenter(null);
      setRelatedError(null);

      if (!project) return;

      if (project.user_type === "client" && project.client_id) {
        try {
          setIsLoadingRelated(true);
          const data = await fetchClientById(project.client_id);

          if (!isCancelled) {
            if (!data) {
              setRelatedError("Klijent nije pronađen.");
            } else {
              setClient(data);
            }
          }
        } catch (error) {
          console.error(
            "[AdminInteriorsProjectDetailPage] Failed to load client:",
            error
          );
          if (!isCancelled) {
            setRelatedError("Došlo je do greške pri dohvaćanju klijenta.");
          }
        } finally {
          if (!isCancelled) {
            setIsLoadingRelated(false);
          }
        }
      } else if (project.user_type === "carpenter" && project.carpenter_id) {
        try {
          setIsLoadingRelated(true);
          const data = await fetchCarpenterById(project.carpenter_id);

          if (!isCancelled) {
            if (!data) {
              setRelatedError("Stolar / studio nije pronađen.");
            } else {
              setCarpenter(data);
            }
          }
        } catch (error) {
          console.error(
            "[AdminInteriorsProjectDetailPage] Failed to load carpenter:",
            error
          );
          if (!isCancelled) {
            setRelatedError("Došlo je do greške pri dohvaćanju stolara / studija.");
          }
        } finally {
          if (!isCancelled) {
            setIsLoadingRelated(false);
          }
        }
      }
    };

    loadRelated();

    return () => {
      isCancelled = true;
    };
  }, [project]);

  useEffect(() => {
    let isCancelled = false;

    const loadFiles = async () => {
      setFiles([]);
      setFilesError(null);

      if (!project) return;

      try {
        setIsLoadingFiles(true);
        const data = await fetchProjectFilesForProject(project.id);

        if (!isCancelled) {
          setFiles(data);
        }
      } catch (error) {
        console.error(
          "[AdminInteriorsProjectDetailPage] Failed to load project files:",
          error
        );
        if (!isCancelled) {
          setFilesError("Došlo je do greške pri dohvaćanju datoteka projekta.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingFiles(false);
        }
      }
    };

    loadFiles();

    return () => {
      isCancelled = true;
    };
  }, [project]);

  const handleBack = () => {
    navigate("/admin/interiors-projects");
  };

  const handleStatusChange = async (newStatus: Project["status"]) => {
    if (!project || newStatus === project.status) return;

    const previousStatus = project.status;
    setProject({ ...project, status: newStatus });
    setIsUpdatingStatus(true);

    try {
      await updateProjectStatus(project.id, newStatus);
    } catch (error) {
      console.error(
        "[AdminInteriorsProjectDetail] Failed to update status:",
        error
      );
      setProject({ ...project, status: previousStatus });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Detalji projekta
            </h1>
            <p className="text-sm text-slate-600">
              Pregled svih informacija za odabrani interijerski projekt.
            </p>
          </div>

          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            ← Povratak na listu
          </button>
        </header>

        {/* Status poruke */}
        {isLoading && (
          <div className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
            Učitavam projekt...
          </div>
        )}

        {loadError && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {loadError}
          </div>
        )}

        {!isLoading && !loadError && project && (
          <div className="space-y-6">
            {/* Klijent ili stolar */}
            {project.user_type === "client" && (
              <section className="rounded-lg border border-slate-200 bg-white p-4">
                <h2 className="text-sm font-semibold text-slate-900">
                  Klijent
                </h2>

                {isLoadingRelated && (
                  <p className="mt-3 text-xs text-slate-600">
                    Učitavam podatke o klijentu...
                  </p>
                )}

                {relatedError && (
                  <p className="mt-3 text-xs text-red-700">
                    {relatedError}
                  </p>
                )}

                {!isLoadingRelated && !relatedError && client && (
                  <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                    <InfoRow label="Ime" value={client.name || "—"} />
                    <InfoRow label="Email" value={client.email || "—"} />
                    <InfoRow label="Telefon" value={client.phone || "—"} />
                    <InfoRow
                      label="Jezik"
                      value={client.language || "—"}
                    />
                  </div>
                )}

                {!isLoadingRelated && !relatedError && client?.notes && (
                  <div className="mt-3 text-xs text-slate-700 whitespace-pre-line">
                    <span className="font-medium">Napomene klijenta:</span>
                    <br />
                    {client.notes}
                  </div>
                )}
              </section>
            )}

            {project.user_type === "carpenter" && (
              <section className="rounded-lg border border-slate-200 bg-white p-4">
                <h2 className="text-sm font-semibold text-slate-900">
                  Stolar / studio
                </h2>

                {isLoadingRelated && (
                  <p className="mt-3 text-xs text-slate-600">
                    Učitavam podatke o stolaru / studiju...
                  </p>
                )}

                {relatedError && (
                  <p className="mt-3 text-xs text-red-700">
                    {relatedError}
                  </p>
                )}

                {!isLoadingRelated && !relatedError && carpenter && (
                  <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                    <InfoRow
                      label="Naziv firme"
                      value={carpenter.company_name || "—"}
                    />
                    <InfoRow
                      label="Kontakt osoba"
                      value={carpenter.contact_name || "—"}
                    />
                    <InfoRow
                      label="Email"
                      value={carpenter.email || "—"}
                    />
                    <InfoRow
                      label="Telefon"
                      value={carpenter.phone || "—"}
                    />
                  </div>
                )}

                {!isLoadingRelated && !relatedError && carpenter?.notes && (
                  <div className="mt-3 text-xs text-slate-700 whitespace-pre-line">
                    <span className="font-medium">Profil / napomene:</span>
                    <br />
                    {carpenter.notes}
                  </div>
                )}
              </section>
            )}

            {/* Osnovne informacije */}
            <section className="rounded-lg border border-slate-200 bg-white p-4">
              <h2 className="text-sm font-semibold text-slate-900">
                Osnovne informacije
              </h2>
              <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                <InfoRow
                  label="Naslov"
                  value={project.title || "Bez naslova"}
                />
                <InfoRow
                  label="Tip korisnika"
                  value={project.user_type === "client" ? "Klijent" : "Stolar"}
                />
                <InfoRow
                  label="Status"
                  value={
                    <select
                      value={project.status}
                      onChange={(e) =>
                        handleStatusChange(e.target.value as Project["status"])
                      }
                      disabled={isUpdatingStatus}
                      title={isUpdatingStatus ? "Spremam..." : undefined}
                      className={`rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 ${
                        isUpdatingStatus
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  }
                />
                <InfoRow
                  label="VR"
                  value={project.wants_vr ? "Da" : "Ne"}
                />
                <InfoRow
                  label="Datum kreiranja"
                  value={
                    project.created_at
                      ? new Date(project.created_at).toLocaleString("hr-HR")
                      : "—"
                  }
                />
                <InfoRow
                  label="Zadnje ažuriranje"
                  value={
                    project.updated_at
                      ? new Date(project.updated_at).toLocaleString("hr-HR")
                      : "—"
                  }
                />
              </div>
            </section>

            {/* Prostor i budžet */}
            <section className="rounded-lg border border-slate-200 bg-white p-4">
              <h2 className="text-sm font-semibold text-slate-900">
                Prostor i budžet
              </h2>
              <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                <InfoRow
                  label="Vrsta prostora"
                  value={project.space_type || "—"}
                />
                <InfoRow
                  label="Površina"
                  value={
                    project.area_m2 != null ? `${project.area_m2} m²` : "—"
                  }
                />
                <InfoRow
                  label="Budžet"
                  value={
                    project.budget != null ? `${project.budget} €` : "—"
                  }
                />
              </div>
            </section>

            {/* VR detalji */}
            <section className="rounded-lg border border-slate-200 bg-white p-4">
              <h2 className="text-sm font-semibold text-slate-900">
                VR detalji
              </h2>
              <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                <InfoRow
                  label="Želi VR"
                  value={project.wants_vr ? "Da" : "Ne"}
                />
                <InfoRow
                  label="VR lokacija"
                  value={
                    project.vr_location_preference
                      ? mapVrLocation(project.vr_location_preference)
                      : "—"
                  }
                />
                <InfoRow
                  label="VR paket"
                  value={
                    project.vr_package_preference
                      ? mapVrPackage(project.vr_package_preference)
                      : "—"
                  }
                />
              </div>
            </section>

            {/* Datoteke projekta */}
            <section className="rounded-lg border border-slate-200 bg-white p-4">
              <h2 className="text-sm font-semibold text-slate-900">
                Datoteke projekta
              </h2>

              {isLoadingFiles && (
                <p className="mt-3 text-xs text-slate-600">
                  Učitavam datoteke...
                </p>
              )}

              {filesError && (
                <p className="mt-3 text-xs text-red-700">{filesError}</p>
              )}

              {!isLoadingFiles && !filesError && files.length === 0 && (
                <p className="mt-3 text-xs text-slate-600">
                  Još nema povezanih datoteka za ovaj projekt.
                </p>
              )}

              {!isLoadingFiles && !filesError && files.length > 0 && (
                <ul className="mt-3 space-y-2 text-xs text-slate-700">
                  {files.map((file) => (
                    <li
                      key={file.id}
                      className="flex flex-col gap-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {file.original_name}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {mapFileTypeLabel(file.file_type)}
                          {file.size_bytes != null
                            ? ` • ${(file.size_bytes / (1024 * 1024)).toFixed(
                                2
                              )} MB`
                            : ""}
                        </span>
                        {file.notes && (
                          <span className="mt-1 text-[11px] text-slate-600">
                            {file.notes}
                          </span>
                        )}
                      </div>

                      <div className="mt-1 text-[11px] text-slate-500 sm:mt-0 sm:text-right">
                        {file.created_at
                          ? new Date(file.created_at).toLocaleString("hr-HR")
                          : ""}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Napomene */}
            <section className="rounded-lg border border-slate-200 bg-white p-4">
              <h2 className="text-sm font-semibold text-slate-900">
                Napomene
              </h2>
              <div className="mt-3 text-sm text-slate-700 whitespace-pre-line">
                {project.notes?.trim()
                  ? project.notes
                  : "Nema dodatnih napomena."}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

type InfoRowProps = {
  label: string;
  value: string | React.ReactNode;
};

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
      {label}
    </span>
    <span className="text-sm text-slate-900">{value}</span>
  </div>
);

function mapProjectStatusToLabel(status: Project["status"]): string {
  switch (status) {
    case "inquiry":
      return "Upit";
    case "3d_in_progress":
      return "3D u izradi";
    case "3d_done":
      return "3D gotovo";
    case "vr_in_progress":
      return "VR u izradi";
    case "vr_done":
      return "VR gotovo";
    case "presented":
      return "Prezentirano";
    default:
      return status;
  }
}

function mapVrLocation(
  value: Project["vr_location_preference"]
): string {
  switch (value) {
    case "studio":
      return "Ani's studio";
    case "client_home":
      return "Kod klijenta doma";
    case "unsure":
      return "Nisam siguran";
    default:
      return "—";
  }
}

function mapVrPackage(
  value: Project["vr_package_preference"]
): string {
  switch (value) {
    case "3d_vr":
      return "3D projekt + VR obilazak";
    case "3d_vr_online":
      return "3D + VR + online";
    case "unsure":
      return "Nisam siguran";
    default:
      return "—";
  }
}

function mapFileTypeLabel(fileType: ProjectFile["file_type"]): string {
  switch (fileType) {
    case "plan":
      return "Tlocrt";
    case "inspiration":
      return "Inspiracija";
    case "space_photo":
      return "Fotografija prostora";
    case "kitchen_sketch":
      return "Skica kuhinje";
    case "carpenter_3d_export":
      return "3D eksport stolara";
    case "vr_asset":
      return "VR asset";
    case "other":
      return "Ostalo";
    default:
      return fileType;
  }
}

export default AdminInteriorsProjectDetailPage;


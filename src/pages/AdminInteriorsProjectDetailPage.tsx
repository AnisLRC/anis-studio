import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchProjectById,
  fetchClientById,
  fetchCarpenterById,
} from "../lib/interiors";

type Project = NonNullable<Awaited<ReturnType<typeof fetchProjectById>>>;
type Client = NonNullable<Awaited<ReturnType<typeof fetchClientById>>>;
type Carpenter = NonNullable<Awaited<ReturnType<typeof fetchCarpenterById>>>;

const AdminInteriorsProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [client, setClient] = useState<Client | null>(null);
  const [carpenter, setCarpenter] = useState<Carpenter | null>(null);
  const [isLoadingRelated, setIsLoadingRelated] = useState(false);
  const [relatedError, setRelatedError] = useState<string | null>(null);

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

  const handleBack = () => {
    navigate("/admin/interiors-projects");
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
                  value={mapProjectStatusToLabel(project.status)}
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
  value: string;
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

export default AdminInteriorsProjectDetailPage;


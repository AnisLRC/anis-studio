import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchProjectById,
  fetchClientById,
  fetchCarpenterById,
  fetchProjectFilesForProject,
  updateProjectStatus,
  fetchVrScenesForProject,
  createVrScene,
  fetchVrAppointmentsForScene,
  createVrAppointment,
  type VrScene,
  type VrSceneType,
  type VrAppointment,
  type VrAppointmentStatus,
  type VrAppointmentLocationPreference,
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

type NewAppointmentFormState = {
  scheduledAt: string;
  status: VrAppointmentStatus;
  locationPreference: string;
  vrLink: string;
  notes: string;
};

function getDefaultNewAppointmentForm(): NewAppointmentFormState {
  return {
    scheduledAt: "",
    status: "scheduled",
    locationPreference: "online",
    vrLink: "",
    notes: "",
  };
}

function formatLocationPreference(value: string | null): string {
  if (!value) return "—";
  switch (value) {
    case "online":
      return "Online (Meet/Zoom/Teams)";
    case "showroom":
      return "VR showroom / Ani's Studio";
    case "client_home":
      return "Na lokaciji klijenta";
    case "other":
      return "Drugo";
    default:
      return value;
  }
}

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
  const [fileTypeFilter, setFileTypeFilter] = useState<string>("all");

  const [vrScenes, setVrScenes] = useState<VrScene[]>([]);
  const [isLoadingVrScenes, setIsLoadingVrScenes] = useState(false);
  const [vrScenesError, setVrScenesError] = useState<string | null>(null);

  const [isCreatingVrScene, setIsCreatingVrScene] = useState(false);
  const [newSceneType, setNewSceneType] = useState<VrSceneType | "">("");
  const [newSceneTitle, setNewSceneTitle] = useState("");
  const [newSceneUrl, setNewSceneUrl] = useState("");

  // State for VR appointments
  const [appointmentsByScene, setAppointmentsByScene] = useState<Record<string, VrAppointment[]>>({});
  const [appointmentsLoadingByScene, setAppointmentsLoadingByScene] = useState<Record<string, boolean>>({});
  const [appointmentsErrorByScene, setAppointmentsErrorByScene] = useState<Record<string, string | null>>({});
  const [newAppointmentByScene, setNewAppointmentByScene] = useState<Record<string, NewAppointmentFormState>>({});

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

  useEffect(() => {
    let isCancelled = false;

    const loadVrScenes = async () => {
      setVrScenes([]);
      setVrScenesError(null);

      if (!project || !project.id) return;

      try {
        setIsLoadingVrScenes(true);
        const data = await fetchVrScenesForProject(project.id);

        if (!isCancelled) {
          setVrScenes(data);
        }
      } catch (error) {
        console.error(
          "[AdminInteriorsProjectDetailPage] Failed to load VR scenes:",
          error
        );
        if (!isCancelled) {
          setVrScenesError("Došlo je do greške pri dohvaćanju VR scena.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingVrScenes(false);
        }
      }
    };

    loadVrScenes();

    return () => {
      isCancelled = true;
    };
  }, [project]);

  // Automatski učitaj termine za sve VR scene
  useEffect(() => {
    if (!vrScenes || vrScenes.length === 0) return;

    vrScenes.forEach((scene) => {
      // Ako želiš izbjeći dupli fetch kad je već ručno osvježeno:
      if (!appointmentsByScene[scene.id]) {
        loadAppointmentsForScene(scene.id);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vrScenes]);

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

  const handleCreateVrScene = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!project || !newSceneType || !newSceneTitle.trim() || !newSceneUrl.trim()) {
      return;
    }

    setIsCreatingVrScene(true);

    try {
      const input: Parameters<typeof createVrScene>[0] = {
        project_id: project.id,
        scene_type: newSceneType as VrSceneType,
        title: newSceneTitle.trim(),
      };

      // Odaberi koje URL polje popuniti na temelju scene_type
      if (newSceneType === "simlab_package") {
        input.simlab_project_url = newSceneUrl.trim() || null;
      } else if (newSceneType === "webxr_scene") {
        input.webxr_url = newSceneUrl.trim() || null;
      } else if (newSceneType === "video_tour") {
        input.video_url = newSceneUrl.trim() || null;
      } else {
        // Za ostale tipove, koristimo webxr_url kao default
        input.webxr_url = newSceneUrl.trim() || null;
      }

      const newScene = await createVrScene(input);

      // Optimistički update: dodaj novu scenu u listu
      setVrScenes([...vrScenes, newScene]);

      // Resetiraj formu
      setNewSceneType("");
      setNewSceneTitle("");
      setNewSceneUrl("");
    } catch (error) {
      console.error(
        "[AdminInteriorsProjectDetailPage] Failed to create VR scene:",
        error
      );
      // Refetch da osvježimo listu
      try {
        const data = await fetchVrScenesForProject(project.id);
        setVrScenes(data);
      } catch (refetchError) {
        console.error(
          "[AdminInteriorsProjectDetailPage] Failed to refetch VR scenes:",
          refetchError
        );
      }
    } finally {
      setIsCreatingVrScene(false);
    }
  };

  // Helper function to load appointments for a scene
  const loadAppointmentsForScene = async (vrSceneId: string) => {
    setAppointmentsLoadingByScene((prev) => ({ ...prev, [vrSceneId]: true }));
    setAppointmentsErrorByScene((prev) => ({ ...prev, [vrSceneId]: null }));

    try {
      const data = await fetchVrAppointmentsForScene(vrSceneId);
      setAppointmentsByScene((prev) => ({ ...prev, [vrSceneId]: data }));
    } catch (error) {
      console.error(
        "[AdminInteriorsProjectDetailPage] Failed to load appointments:",
        error
      );
      setAppointmentsErrorByScene((prev) => ({
        ...prev,
        [vrSceneId]: "Došlo je do greške pri dohvaćanju termina.",
      }));
    } finally {
      setAppointmentsLoadingByScene((prev) => ({ ...prev, [vrSceneId]: false }));
    }
  };

  // Helper function to update new appointment form
  const updateNewAppointmentForm = (
    vrSceneId: string,
    patch: Partial<NewAppointmentFormState>
  ) => {
    setNewAppointmentByScene((prev) => ({
      ...prev,
      [vrSceneId]: {
        ...getDefaultNewAppointmentForm(),
        ...prev[vrSceneId],
        ...patch,
      },
    }));
  };

  // Helper function to create a new appointment
  const handleCreateAppointment = async (
    vrSceneId: string,
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const formData = newAppointmentByScene[vrSceneId];
    if (!formData || !formData.scheduledAt || !formData.status) {
      return;
    }

    try {
      const input = {
        vr_scene_id: vrSceneId,
        scheduled_at: formData.scheduledAt,
        status: formData.status,
        location_preference: (formData.locationPreference || null) as VrAppointmentLocationPreference | null,
        vr_link: formData.vrLink?.trim() || null,
        notes: formData.notes?.trim() || null,
      };

      const newAppointment = await createVrAppointment(input);

      // Add new appointment to the list
      setAppointmentsByScene((prev) => ({
        ...prev,
        [vrSceneId]: [...(prev[vrSceneId] || []), newAppointment],
      }));

      // Reset form
      setNewAppointmentByScene((prev) => ({
        ...prev,
        [vrSceneId]: getDefaultNewAppointmentForm(),
      }));

      // Clear any previous errors
      setAppointmentsErrorByScene((prev) => ({
        ...prev,
        [vrSceneId]: null,
      }));
    } catch (error) {
      console.error(
        "[AdminInteriorsProjectDetailPage] Failed to create appointment:",
        error
      );
      setAppointmentsErrorByScene((prev) => ({
        ...prev,
        [vrSceneId]: "Došlo je do greške pri dodavanju termina.",
      }));
    }
  };

  const getMainUrl = (scene: VrScene): string => {
    if (scene.webxr_url) return scene.webxr_url;
    if (scene.simlab_project_url) return scene.simlab_project_url;
    if (scene.video_url) return scene.video_url;
    return "Nema URL-a";
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

              {!isLoadingFiles && !filesError && files.length > 0 && (
                <div className="mt-3 flex items-center gap-2">
                  <label className="text-xs text-gray-500">
                    Filter po tipu:
                  </label>
                  <select
                    value={fileTypeFilter}
                    onChange={(e) => setFileTypeFilter(e.target.value)}
                    className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
                  >
                    <option value="all">Sve datoteke</option>
                    <option value="plan">Tlocrt</option>
                    <option value="inspiration">Inspiracija</option>
                    <option value="space_photo">Fotografije prostora</option>
                    <option value="kitchen_sketch">Skice kuhinje</option>
                    <option value="carpenter_3d_export">3D export stolara</option>
                    <option value="vr_asset">VR asset</option>
                    <option value="other">Ostalo</option>
                  </select>
                </div>
              )}

              {!isLoadingFiles && !filesError && files.length === 0 && (
                <p className="mt-3 text-xs text-slate-600">
                  Još nema povezanih datoteka za ovaj projekt.
                </p>
              )}

              {!isLoadingFiles && !filesError && files.length > 0 && (() => {
                const filteredProjectFiles =
                  fileTypeFilter === "all"
                    ? files
                    : fileTypeFilter === "other"
                    ? files.filter(
                        (file) =>
                          ![
                            "plan",
                            "inspiration",
                            "space_photo",
                            "kitchen_sketch",
                            "carpenter_3d_export",
                            "vr_asset",
                          ].includes(file.file_type)
                      )
                    : files.filter((file) => file.file_type === fileTypeFilter);

                if (filteredProjectFiles.length === 0) {
                  return (
                    <p className="mt-3 text-xs text-slate-600">
                      Nema datoteka za odabrani filter.
                    </p>
                  );
                }

                return (
                  <ul className="mt-3 space-y-2 text-xs text-slate-700">
                    {filteredProjectFiles.map((file) => (
                    <li
                      key={file.id}
                      className="flex flex-col gap-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {file.original_name}
                          </span>
                          <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-2 py-0.5 text-[11px] text-slate-700">
                            {mapFileTypeLabel(file.file_type)}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500">
                          {file.size_bytes != null
                            ? `${(file.size_bytes / (1024 * 1024)).toFixed(
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
                );
              })()}
            </section>

            {/* VR scene */}
            <section className="rounded-lg border border-slate-200 bg-white p-4">
              <h2 className="text-sm font-semibold text-slate-900">
                VR scene
              </h2>

              {isLoadingVrScenes && (
                <p className="mt-3 text-xs text-slate-600">
                  Učitavanje VR scena...
                </p>
              )}

              {vrScenesError && (
                <p className="mt-3 text-xs text-red-700">{vrScenesError}</p>
              )}

              {!isLoadingVrScenes && !vrScenesError && vrScenes.length === 0 && (
                <p className="mt-3 text-xs text-slate-600">
                  Još nema dodanih VR scena za ovaj projekt.
                </p>
              )}

              {!isLoadingVrScenes && !vrScenesError && vrScenes.length > 0 && (
                <ul className="mt-3 space-y-4 text-xs text-slate-700">
                  {vrScenes.map((scene) => (
                    <li
                      key={scene.id}
                      className="rounded-md border border-slate-200 bg-slate-50 p-3"
                    >
                      {/* Scene info */}
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-col">
                          <span className="font-medium">{scene.title}</span>
                          <span className="text-[11px] text-slate-500">
                            {mapVrSceneType(scene.scene_type)}
                          </span>
                          <span className="mt-1 text-[11px] text-slate-600 break-all">
                            {getMainUrl(scene)}
                          </span>
                        </div>

                        <div className="mt-1 text-[11px] text-slate-500 sm:mt-0 sm:text-right">
                          {scene.created_at
                            ? new Date(scene.created_at).toLocaleString("hr-HR")
                            : ""}
                        </div>
                      </div>

                      {/* VR termini sub-section */}
                      <div className="mt-4 border-t border-slate-200 pt-3">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xs font-semibold text-slate-900">
                            VR termini
                          </h3>
                          <button
                            type="button"
                            onClick={() => loadAppointmentsForScene(scene.id)}
                            disabled={appointmentsLoadingByScene[scene.id]}
                            className="inline-flex items-center rounded-md border border-slate-300 bg-white px-2 py-1 text-[11px] font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Osvježi
                          </button>
                        </div>

                        {appointmentsLoadingByScene[scene.id] && (
                          <p className="text-[11px] text-slate-600">
                            Učitavanje termina...
                          </p>
                        )}

                        {appointmentsErrorByScene[scene.id] && (
                          <p className="text-[11px] text-red-700">
                            {appointmentsErrorByScene[scene.id]}
                          </p>
                        )}

                        {!appointmentsLoadingByScene[scene.id] &&
                          !appointmentsErrorByScene[scene.id] &&
                          (!appointmentsByScene[scene.id] ||
                            appointmentsByScene[scene.id].length === 0) && (
                            <p className="text-[11px] text-slate-600">
                              Nema definiranih termina za ovu scenu.
                            </p>
                          )}

                        {!appointmentsLoadingByScene[scene.id] &&
                          !appointmentsErrorByScene[scene.id] &&
                          appointmentsByScene[scene.id] &&
                          appointmentsByScene[scene.id].length > 0 && (
                            <ul className="mt-2 space-y-2">
                              {appointmentsByScene[scene.id].map((appointment) => (
                                <li
                                  key={appointment.id}
                                  className="flex flex-col gap-1 rounded border border-slate-200 bg-white px-2 py-1.5"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-[11px] text-slate-700">
                                      {new Date(
                                        appointment.scheduled_at
                                      ).toLocaleString("hr-HR")}
                                    </span>
                                    <span
                                      className={`rounded border px-1.5 py-0.5 text-[10px] font-medium ${
                                        appointment.status === "scheduled"
                                          ? "border-blue-300 bg-blue-50 text-blue-700"
                                          : appointment.status === "completed"
                                          ? "border-green-300 bg-green-50 text-green-700"
                                          : "border-red-300 bg-red-50 text-red-700"
                                      }`}
                                    >
                                      {appointment.status === "scheduled"
                                        ? "Zakazano"
                                        : appointment.status === "completed"
                                        ? "Završeno"
                                        : "Otkazano"}
                                    </span>
                                  </div>
                                  {appointment.location_preference && (
                                    <span className="text-[11px] text-slate-600">
                                      Način kontakta: {formatLocationPreference(appointment.location_preference)}
                                    </span>
                                  )}
                                  {appointment.vr_link && (
                                    <a
                                      href={appointment.vr_link}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-[11px] text-blue-600 hover:text-blue-800 underline"
                                    >
                                      VR link za klijenta
                                    </a>
                                  )}
                                  {appointment.notes && (
                                    <span className="text-[11px] text-slate-600">
                                      {appointment.notes}
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}

                        {/* Forma za novi termin */}
                        <form
                          onSubmit={(e) => handleCreateAppointment(scene.id, e)}
                          className="mt-4 space-y-2 border-t border-slate-200 pt-3"
                        >
                          <div className="grid gap-2 sm:grid-cols-3">
                            <div>
                              <label
                                htmlFor={`appointment-datetime-${scene.id}`}
                                className="block text-[11px] font-medium text-slate-700 mb-1"
                              >
                                Datum i vrijeme
                              </label>
                              <input
                                id={`appointment-datetime-${scene.id}`}
                                type="datetime-local"
                                value={
                                  newAppointmentByScene[scene.id]?.scheduledAt ||
                                  ""
                                }
                                onChange={(e) =>
                                  updateNewAppointmentForm(scene.id, {
                                    scheduledAt: e.target.value,
                                  })
                                }
                                className="w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-[11px] text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
                                required
                              />
                            </div>

                            <div>
                              <label
                                htmlFor={`appointment-status-${scene.id}`}
                                className="block text-[11px] font-medium text-slate-700 mb-1"
                              >
                                Status
                              </label>
                              <select
                                id={`appointment-status-${scene.id}`}
                                value={
                                  newAppointmentByScene[scene.id]?.status ||
                                  "scheduled"
                                }
                                onChange={(e) =>
                                  updateNewAppointmentForm(scene.id, {
                                    status: e.target.value as VrAppointmentStatus,
                                  })
                                }
                                className="w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-[11px] text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
                                required
                              >
                                <option value="scheduled">Zakazano</option>
                                <option value="completed">Završeno</option>
                                <option value="cancelled">Otkazano</option>
                              </select>
                            </div>

                            <div>
                              <label
                                htmlFor={`appointment-location-${scene.id}`}
                                className="block text-[11px] font-medium text-slate-700 mb-1"
                              >
                                Način kontakta
                              </label>
                              <select
                                id={`appointment-location-${scene.id}`}
                                value={
                                  newAppointmentByScene[scene.id]?.locationPreference ||
                                  "online"
                                }
                                onChange={(e) =>
                                  updateNewAppointmentForm(scene.id, {
                                    locationPreference: e.target.value,
                                  })
                                }
                                className="w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-[11px] text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
                              >
                                <option value="online">Online (Meet/Zoom)</option>
                                <option value="showroom">VR showroom / Ani's Studio</option>
                                <option value="client_home">Na lokaciji klijenta</option>
                                <option value="other">Drugo</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid gap-2 sm:grid-cols-2">
                            <div>
                              <label
                                htmlFor={`appointment-vrlink-${scene.id}`}
                                className="block text-[11px] font-medium text-slate-700 mb-1"
                              >
                                VR link
                              </label>
                              <input
                                id={`appointment-vrlink-${scene.id}`}
                                type="url"
                                value={
                                  newAppointmentByScene[scene.id]?.vrLink || ""
                                }
                                onChange={(e) =>
                                  updateNewAppointmentForm(scene.id, {
                                    vrLink: e.target.value,
                                  })
                                }
                                className="w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-[11px] text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
                                placeholder="https://..."
                              />
                            </div>

                            <div>
                              <label
                                htmlFor={`appointment-notes-${scene.id}`}
                                className="block text-[11px] font-medium text-slate-700 mb-1"
                              >
                                Napomene (opcionalno)
                              </label>
                              <textarea
                                id={`appointment-notes-${scene.id}`}
                                value={
                                  newAppointmentByScene[scene.id]?.notes || ""
                                }
                                onChange={(e) =>
                                  updateNewAppointmentForm(scene.id, {
                                    notes: e.target.value,
                                  })
                                }
                                className="w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-[11px] text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
                                rows={1}
                                placeholder="Dodatne napomene..."
                              />
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="inline-flex items-center rounded-md border border-slate-300 bg-white px-2 py-1 text-[11px] font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                          >
                            Dodaj termin
                          </button>
                        </form>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {/* Forma za dodavanje nove VR scene */}
              <div className="mt-4 border-t border-slate-200 pt-4">
                <form onSubmit={handleCreateVrScene} className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="scene-type"
                        className="block text-xs font-medium text-slate-700 mb-1"
                      >
                        Tip scene
                      </label>
                      <select
                        id="scene-type"
                        value={newSceneType}
                        onChange={(e) =>
                          setNewSceneType(e.target.value as VrSceneType | "")
                        }
                        className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
                        required
                      >
                        <option value="">Odaberi tip</option>
                        <option value="simlab_package">SimLab paket</option>
                        <option value="webxr_scene">WebXR scena</option>
                        <option value="video_tour">Video tura</option>
                        <option value="image_gallery">Galerija slika</option>
                        <option value="other">Ostalo</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="scene-title"
                        className="block text-xs font-medium text-slate-700 mb-1"
                      >
                        Naslov
                      </label>
                      <input
                        id="scene-title"
                        type="text"
                        value={newSceneTitle}
                        onChange={(e) => setNewSceneTitle(e.target.value)}
                        className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
                        placeholder="Npr. Glavna scena"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="scene-url"
                        className="block text-xs font-medium text-slate-700 mb-1"
                      >
                        URL
                      </label>
                      <input
                        id="scene-url"
                        type="url"
                        value={newSceneUrl}
                        onChange={(e) => setNewSceneUrl(e.target.value)}
                        className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
                        placeholder="https://..."
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isCreatingVrScene}
                    className={`inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 ${
                      isCreatingVrScene
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isCreatingVrScene ? "Dodavanje..." : "Dodaj VR scenu"}
                  </button>
                </form>
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

function mapVrSceneType(sceneType: VrSceneType): string {
  switch (sceneType) {
    case "simlab_package":
      return "SimLab paket";
    case "webxr_scene":
      return "WebXR scena";
    case "video_tour":
      return "Video tura";
    case "image_gallery":
      return "Galerija slika";
    case "other":
      return "Ostalo";
    default:
      return sceneType;
  }
}

export default AdminInteriorsProjectDetailPage;


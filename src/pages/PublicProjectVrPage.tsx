import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchProjectById,
  fetchVrScenesForProject,
  fetchVrAppointmentsForScene,
  type Project,
  type VrScene,
  type VrAppointment,
} from "../lib/interiors";

const getMainUrl = (scene: VrScene): string => {
  if (scene.webxr_url) return scene.webxr_url;
  if (scene.simlab_project_url) return scene.simlab_project_url;
  if (scene.video_url) return scene.video_url;
  return "";
};

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

const PublicProjectVrPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [vrScenes, setVrScenes] = useState<VrScene[]>([]);
  const [appointmentsByScene, setAppointmentsByScene] = useState<
    Record<string, VrAppointment[]>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const loadData = async () => {
      if (!projectId) {
        setError("Nedostaje ID projekta u URL-u.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Paralelno dohvaćanje projekta i VR scena
        const [projectData, scenesData] = await Promise.all([
          fetchProjectById(projectId),
          fetchVrScenesForProject(projectId),
        ]);

        if (!isCancelled) {
          if (!projectData) {
            setError("Projekt nije pronađen. Provjerite link koji ste dobili.");
            setIsLoading(false);
            return;
          }

          setProject(projectData);
          setVrScenes(scenesData);

          // Za svaku scenu dohvatiti termine i filtrirati samo scheduled
          const appointmentsMap: Record<string, VrAppointment[]> = {};
          const appointmentPromises = scenesData.map(async (scene) => {
            try {
              const appointments = await fetchVrAppointmentsForScene(scene.id);
              const scheduledAppointments = appointments.filter(
                (app) => app.status === "scheduled"
              );
              appointmentsMap[scene.id] = scheduledAppointments;
            } catch (err) {
              console.error(
                `[PublicProjectVrPage] Failed to load appointments for scene ${scene.id}:`,
                err
              );
              appointmentsMap[scene.id] = [];
            }
          });

          await Promise.all(appointmentPromises);

          if (!isCancelled) {
            setAppointmentsByScene(appointmentsMap);
          }
        }
      } catch (err) {
        console.error("[PublicProjectVrPage] Failed to load data:", err);
        if (!isCancelled) {
          setError("Došlo je do greške pri dohvaćanju podataka.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isCancelled = true;
    };
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
            Učitavanje VR sadržaja...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
            Projekt nije pronađen. Provjerite link koji ste dobili.
          </div>
        </div>
      </div>
    );
  }

  const sceneUrl = (scene: VrScene) => getMainUrl(scene);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Header */}
        <header className="space-y-3">
          <h1 className="text-2xl font-semibold text-slate-900">
            VR pregled vašeg interijera
          </h1>
          <p className="text-sm text-slate-600">
            Ovdje možete pregledati VR scene i zakazane termine za vaš projekt. Kliknite na "Otvori VR scenu" za pregled interijera u virtualnoj stvarnosti. Ako imate problema s pristupom VR sceni ili imate pitanja, javite se Ani.
          </p>
        </header>

        {/* VR Scenes */}
        {vrScenes.length === 0 ? (
          <div className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
            Trenutno nema dostupnih VR scena za ovaj projekt. Ako mislite da je došlo do greške, javite nam se.
          </div>
        ) : (
          <div className="space-y-6">
            {vrScenes.map((scene) => {
              const url = sceneUrl(scene);
              const appointments = appointmentsByScene[scene.id] || [];

              return (
                <div
                  key={scene.id}
                  className="rounded-md border border-slate-200 bg-white p-5 shadow-sm"
                >
                  {/* Scene Title */}
                  <h2 className="text-lg font-medium text-slate-900">
                    {scene.title}
                  </h2>

                  {/* Scene Description */}
                  {scene.description && (
                    <p className="mt-2 text-sm text-slate-600">
                      {scene.description}
                    </p>
                  )}

                  {/* VR Scene URL Button */}
                  {url && (
                    <div className="mt-4">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
                      >
                        Otvori VR scenu
                      </a>
                    </div>
                  )}

                  {/* Scheduled Appointments */}
                  {appointments.length > 0 && (
                    <div className="mt-6 border-t border-slate-200 pt-4">
                      <h3 className="mb-3 text-sm font-semibold text-slate-900">
                        Zakazani VR termini
                      </h3>
                      <p className="text-xs text-slate-500 mb-3">
                        Ovdje su prikazani zakazani termini za VR prezentaciju vašeg projekta.
                      </p>
                      <div className="space-y-4">
                        {appointments.map((app) => (
                          <div
                            key={app.id}
                            className="rounded-md border border-slate-100 bg-slate-50 p-3"
                          >
                            {/* Date/Time */}
                            <div className="text-sm font-medium text-slate-900">
                              {new Date(app.scheduled_at).toLocaleString("hr-HR")}
                            </div>

                            {/* Status Badge */}
                            <div className="mt-2">
                              <span className="inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                                {app.status === "scheduled"
                                  ? "Zakazano"
                                  : app.status}
                              </span>
                            </div>

                            {/* Location Preference */}
                            {app.location_preference && (
                              <div className="mt-2 text-sm text-slate-700">
                                Način kontakta: {formatLocationPreference(app.location_preference)}
                              </div>
                            )}

                            {/* VR Link */}
                            {app.vr_link && (
                              <div className="mt-2">
                                <a
                                  href={app.vr_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="break-all text-sm text-blue-600 underline hover:text-blue-800"
                                >
                                  VR link za klijenta
                                </a>
                              </div>
                            )}

                            {/* Notes */}
                            {app.notes && (
                              <div className="mt-2 whitespace-pre-line text-sm text-slate-600">
                                {app.notes}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicProjectVrPage;


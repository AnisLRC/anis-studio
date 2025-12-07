import React, { useEffect, useState } from "react";
import { fetchProjects, type ProjectListFilters } from "../lib/interiors";

type Project = Awaited<ReturnType<typeof fetchProjects>>[number];

export const AdminInteriorsProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // za buduće filtere, za sada prazno
  const [filters] = useState<ProjectListFilters>({});

  useEffect(() => {
    let isCancelled = false;

    const loadProjects = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);

        const data = await fetchProjects(filters);

        if (!isCancelled) {
          setProjects(data);
        }
      } catch (error) {
        console.error("[AdminInteriorsProjectsPage] Failed to load projects:", error);
        if (!isCancelled) {
          setLoadError("Došlo je do greške pri dohvaćanju projekata.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadProjects();

    return () => {
      isCancelled = true;
    };
  }, [filters]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Interijeri – projekti
            </h1>
            <p className="text-sm text-slate-600">
              Pregled svih projekata za klijente i stolare.
            </p>
          </div>

          {/* Mjesto za buduće filtere (user_type, status, wants_vr...) */}
          <div className="text-xs text-slate-500">
            Filteri dolaze u sljedećem koraku 🙂
          </div>
        </header>

        {/* Status poruke */}
        {isLoading && (
          <div className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
            Učitavam projekte...
          </div>
        )}

        {loadError && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {loadError}
          </div>
        )}

        {!isLoading && !loadError && projects.length === 0 && (
          <div className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
            Još nema nijednog projekta.
          </div>
        )}

        {!isLoading && !loadError && projects.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="whitespace-nowrap px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Datum
                  </th>
                  <th className="whitespace-nowrap px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Naslov
                  </th>
                  <th className="whitespace-nowrap px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Tip
                  </th>
                  <th className="whitespace-nowrap px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    VR
                  </th>
                  <th className="whitespace-nowrap px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                  <th className="whitespace-nowrap px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Kvadratura
                  </th>
                  <th className="whitespace-nowrap px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Budžet
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {projects.map((project) => {
                  const createdAt = project.created_at
                    ? new Date(project.created_at)
                    : null;

                  const formattedDate = createdAt
                    ? createdAt.toLocaleDateString("hr-HR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                    : "—";

                  const userTypeLabel =
                    project.user_type === "client" ? "Klijent" : "Stolar";

                  const statusLabel = mapProjectStatusToLabel(project.status);

                  const vrLabel = project.wants_vr ? "Da" : "Ne";

                  const area =
                    project.area_m2 != null ? `${project.area_m2} m²` : "—";

                  const budget =
                    project.budget != null ? `${project.budget} €` : "—";

                  return (
                    <tr key={project.id}>
                      <td className="whitespace-nowrap px-3 py-2 text-xs text-slate-700">
                        {formattedDate}
                      </td>
                      <td className="max-w-xs px-3 py-2 text-xs font-medium text-slate-900">
                        {project.title || "Bez naslova"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-xs text-slate-700">
                        {userTypeLabel}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-xs text-slate-700">
                        {vrLabel}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-xs text-slate-700">
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                          {statusLabel}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-xs text-slate-700">
                        {area}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-xs text-slate-700">
                        {budget}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

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

export default AdminInteriorsProjectsPage;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProjects, updateProjectStatus, type ProjectListFilters } from "../lib/interiors";
import { TableSkeleton } from "../components/Skeleton";
import { AnimatedPage } from "../components/AnimatedPage";

type Project = Awaited<ReturnType<typeof fetchProjects>>[number];

const USER_TYPE_OPTIONS: { value: "" | "client" | "carpenter"; label: string }[] = [
  { value: "", label: "Svi" },
  { value: "client", label: "Klijenti" },
  { value: "carpenter", label: "Stolari" },
];

const STATUS_OPTIONS: { value: "" | Project["status"]; label: string }[] = [
  { value: "", label: "Svi statusi" },
  { value: "inquiry", label: "Upit" },
  { value: "3d_in_progress", label: "3D u izradi" },
  { value: "3d_done", label: "3D gotovo" },
  { value: "vr_in_progress", label: "VR u izradi" },
  { value: "vr_done", label: "VR gotovo" },
  { value: "presented", label: "Prezentirano" },
];

const WANTS_VR_OPTIONS = [
  { value: "all" as const, label: "Svi" },
  { value: "yes" as const, label: "S VR-om" },
  { value: "no" as const, label: "Bez VR-a" },
];

export const AdminInteriorsProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [userTypeFilter, setUserTypeFilter] = useState<"" | "client" | "carpenter">("");
  const [statusFilter, setStatusFilter] = useState<"" | Project["status"]>("");
  const [wantsVrFilter, setWantsVrFilter] = useState<"all" | "yes" | "no">("all");
  // Search query state for client-side filtering by title
  const [searchQuery, setSearchQuery] = useState<string>("");
  // Sort order state for client-side sorting by date
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    let isCancelled = false;

    const loadProjects = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);

        const filters: ProjectListFilters = {};

        if (userTypeFilter) {
          filters.userType = userTypeFilter;
        }

        if (statusFilter) {
          filters.status = statusFilter;
        }

        if (wantsVrFilter === "yes") {
          filters.wantsVr = true;
        } else if (wantsVrFilter === "no") {
          filters.wantsVr = false;
        }

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
  }, [userTypeFilter, statusFilter, wantsVrFilter]);

  const handleRowClick = (id: string) => {
    navigate(`/admin/interiors-projects/${id}`);
  };

  const handleStatusChange = async (
    projectId: string,
    oldStatus: Project["status"],
    newStatus: Project["status"]
  ) => {
    if (oldStatus === newStatus) return;

    setUpdatingId(projectId);

    // Optimistic update
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, status: newStatus } : p))
    );

    try {
      await updateProjectStatus(projectId, newStatus);
    } catch (error) {
      console.error("[AdminInteriorsProjects] Failed to update status:", error);
      // Rollback to old status on error
      setProjects((prev) =>
        prev.map((p) => (p.id === projectId ? { ...p, status: oldStatus } : p))
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Client-side filtering by title (case-insensitive)
  const filteredProjects = searchQuery.trim()
    ? projects.filter((project) =>
        (project.title || "").toLowerCase().includes(searchQuery.toLowerCase())
      )
    : projects;

  // Client-side sorting by created_at date
  const sortedAndFilteredProjects = [...filteredProjects].sort((a, b) => {
    const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;

    // Handle null/undefined dates - put them at the end regardless of sort order
    if (!a.created_at && !b.created_at) return 0;
    if (!a.created_at) return 1;
    if (!b.created_at) return -1;

    if (sortOrder === "newest") {
      // DESC: newer dates first (larger timestamp first)
      return dateB - dateA;
    } else {
      // ASC: older dates first (smaller timestamp first)
      return dateA - dateB;
    }
  });

  return (
    <AnimatedPage>
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

          <div className="flex flex-wrap items-center gap-2 text-xs sm:justify-end">
            {/* Search input */}
            <input
              type="text"
              placeholder="Pretraži projekte..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-800 shadow-sm placeholder:text-slate-400"
            />

            {/* Tip korisnika */}
            <label className="flex items-center gap-1">
              <span className="text-slate-600">Tip korisnika:</span>
              <select
                className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-800 shadow-sm"
                value={userTypeFilter}
                onChange={(e) =>
                  setUserTypeFilter(e.target.value as "" | "client" | "carpenter")
                }
              >
                {USER_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value || "all"} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>

            {/* Status projekta */}
            <label className="flex items-center gap-1">
              <span className="text-slate-600">Status projekta:</span>
              <select
                className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-800 shadow-sm"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as "" | Project["status"])
                }
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value || "all-status"} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>

            {/* VR filter */}
            <label className="flex items-center gap-1">
              <span className="text-slate-600">VR opcija:</span>
              <select
                className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-800 shadow-sm"
                value={wantsVrFilter}
                onChange={(e) =>
                  setWantsVrFilter(e.target.value as "all" | "yes" | "no")
                }
                title="Filtriraj projekte prema tome žele li VR opciju"
              >
                {WANTS_VR_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>

            {/* Sortiranje */}
            <label className="flex items-center gap-1">
              <span className="text-slate-600">Sortiranje:</span>
              <select
                className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-800 shadow-sm"
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value as "newest" | "oldest")
                }
              >
                <option value="newest">Najnoviji prvo</option>
                <option value="oldest">Najstariji prvo</option>
              </select>
            </label>
          </div>
        </header>

        {/* Status poruke */}
        {isLoading && <TableSkeleton rows={4} />}

        {loadError && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {loadError}
          </div>
        )}

        {!isLoading && !loadError && sortedAndFilteredProjects.length === 0 && (
          <div className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
            {searchQuery.trim() ? "Nema projekata koji odgovaraju pretrazi." : "Još nema nijednog projekta."}
          </div>
        )}

        {!isLoading && !loadError && sortedAndFilteredProjects.length > 0 && (
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
                {sortedAndFilteredProjects.map((project) => {
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

                  const vrLabel = project.wants_vr ? "Da" : "Ne";

                  const area =
                    project.area_m2 != null ? `${project.area_m2} m²` : "—";

                  const budget =
                    project.budget != null ? `${project.budget} €` : "—";

                  return (
                    <tr
                      key={project.id}
                      onClick={() => handleRowClick(project.id)}
                      className="cursor-pointer hover:bg-slate-50"
                    >
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
                        <select
                          value={project.status}
                          onChange={(e) =>
                            handleStatusChange(
                              project.id,
                              project.status,
                              e.target.value as Project["status"]
                            )
                          }
                          onClick={(e) => e.stopPropagation()}
                          disabled={updatingId === project.id}
                          title={
                            updatingId === project.id ? "Spremam..." : undefined
                          }
                          className={`rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 ${
                            updatingId === project.id
                              ? "opacity-50 cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                        >
                          {STATUS_OPTIONS.filter((opt) => opt.value !== "").map(
                            (opt) => (
                              <option
                                key={opt.value}
                                value={opt.value as Project["status"]}
                              >
                                {opt.label}
                              </option>
                            )
                          )}
                        </select>
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
    </AnimatedPage>
  );
};

export default AdminInteriorsProjectsPage;


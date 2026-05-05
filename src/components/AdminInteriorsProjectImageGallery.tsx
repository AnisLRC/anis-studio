import React, { useEffect, useMemo, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import type { ProjectFile } from "../lib/interiors";

type Props = {
  files: ProjectFile[];
};

function isInlineImagePreview(file: ProjectFile): boolean {
  const mime = (file.mime_type || "").toLowerCase();
  if (mime.startsWith("image/")) return true;
  if (mime === "application/pdf") return false;
  const n = file.original_name.toLowerCase();
  return /\.(jpe?g|png|gif|webp|bmp|svg)$/.test(n);
}

function fileQualifiesForGallery(file: ProjectFile): boolean {
  if (!isInlineImagePreview(file)) return false;
  if (file.file_type === "carpenter_3d_export") return false;
  return true;
}

function mapGalleryFileTypeLabel(fileType: string): string {
  switch (fileType) {
    case "plan":
      return "Tlocrt";
    case "inspiration":
      return "Inspiracija";
    case "space_photo":
      return "Fotografija prostora";
    case "kitchen_sketch":
      return "Skica";
    default:
      return fileType;
  }
}

export const AdminInteriorsProjectImageGallery: React.FC<Props> = ({ files }) => {
  const previewable = useMemo(
    () => files.filter(fileQualifiesForGallery),
    [files]
  );

  const [urlById, setUrlById] = useState<Record<string, string>>({});
  const [errorById, setErrorById] = useState<Record<string, string>>({});
  const [isLoadingUrls, setIsLoadingUrls] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!isSupabaseConfigured || !supabase || previewable.length === 0) {
        if (!cancelled) {
          setUrlById({});
          setErrorById({});
          setIsLoadingUrls(false);
        }
        return;
      }

      if (!cancelled) {
        setIsLoadingUrls(true);
        setErrorById({});
      }

      const next: Record<string, string> = {};
      const nextErrors: Record<string, string> = {};

      for (const file of previewable) {
        const bucket = file.storage_bucket;
        const path = file.storage_path;

        if (!bucket || !path) {
          nextErrors[file.id] = "Nedostaje putanja datoteke.";
          continue;
        }

        const { data, error } = await supabase.storage
          .from(bucket)
          .createSignedUrl(path, 3600);

        if (cancelled) return;

        if (error || !data?.signedUrl) {
          console.warn(
            "[AdminInteriorsProjectImageGallery] signed URL failed:",
            file.id,
            error?.message
          );
          nextErrors[file.id] =
            error?.message ?? "Nije moguće učitati pregled slike.";
          continue;
        }

        next[file.id] = data.signedUrl;
      }

      if (!cancelled) {
        setUrlById(next);
        setErrorById(nextErrors);
        setIsLoadingUrls(false);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [previewable]);

  if (files.length === 0) {
    return null;
  }

  if (previewable.length === 0) {
    return (
      <div className="mt-6 border-t border-slate-200 pt-4">
        <h3 className="text-xs font-semibold text-slate-900">
          Pregled slika (veći format)
        </h3>
        <p className="mt-2 text-xs text-slate-600">
          Nema priloženih slika za prikaz.
        </p>
      </div>
    );
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="mt-6 border-t border-slate-200 pt-4">
        <h3 className="text-xs font-semibold text-slate-900">
          Pregled slika (veći format)
        </h3>
        <p className="mt-3 text-xs text-slate-500">
          Pregled slika nije dostupan dok Supabase nije konfiguriran.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 border-t border-slate-200 pt-4">
      <h3 className="text-xs font-semibold text-slate-900">
        Pregled slika (veći format)
      </h3>
      <p className="text-[11px] text-slate-500 mt-1 mb-3">
        Klik na sliku otvara punu veličinu u novoj kartici. Za ispis, slike se prikazuju ispod.
      </p>

      <ul className="grid gap-4 sm:grid-cols-2 print:grid-cols-2">
        {previewable.map((file) => {
          const url = urlById[file.id];
          const fileError = errorById[file.id];

          return (
            <li
              key={file.id}
              className="rounded-lg border border-slate-200 bg-slate-50 p-2 print:break-inside-avoid"
            >
              <div className="mb-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                <span className="font-medium text-slate-800 truncate max-w-full">
                  {file.original_name}
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-2 py-0.5 text-[10px] text-slate-700">
                  {mapGalleryFileTypeLabel(file.file_type)}
                </span>
              </div>

              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="block outline-none focus-visible:ring-2 focus-visible:ring-slate-400 rounded-md"
                >
                  <img
                    src={url}
                    alt={file.original_name}
                    className="max-h-[min(28rem,70vh)] w-full object-contain rounded-md bg-white print:max-h-[40rem]"
                  />
                </a>
              ) : isLoadingUrls ? (
                <p className="text-[11px] text-slate-500 py-4">
                  Učitavam pregled…
                </p>
              ) : fileError ? (
                <p className="text-[11px] text-red-600 py-4">
                  Pregled nije dostupan: {fileError}
                </p>
              ) : (
                <p className="text-[11px] text-slate-500 py-4">
                  Nije moguće učitati pregled slike.
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

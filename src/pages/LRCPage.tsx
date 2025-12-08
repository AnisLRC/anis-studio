import React from "react";
import LRCSection from "../components/LRCSection";
import { useSettings } from "../hooks/useSettings";

interface LRCPageProps {
  language?: 'hr' | 'en';
}

const LRCPage: React.FC<LRCPageProps> = ({ language = 'hr' }) => {
  const { settings, isLoading, error } = useSettings();
  const LRC_FORM_ENABLED = settings?.is_lrc_form_enabled ?? true;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Glavni sadržaj: webshop uvijek vidljiv, forma ovisno o isFormEnabled */}
      <section className="pb-16 px-4">
        <div className="mx-auto max-w-6xl">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-slate-600">Učitavanje postavki prijava...</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-6 text-center mb-6">
                  <p className="text-sm text-yellow-800 mb-2">
                    Trenutno ne možemo učitati postavke prijave. Ako imate problem s prijavom, javite se na e-mail.
                  </p>
                  <a 
                    href="mailto:info.anilrc@gmail.com" 
                    className="text-sm text-yellow-900 underline hover:text-yellow-700"
                  >
                    info.anilrc@gmail.com
                  </a>
                </div>
              )}
              <LRCSection language={language} isFormEnabled={error ? true : LRC_FORM_ENABLED} />
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default LRCPage;

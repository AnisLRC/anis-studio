import React from "react";
import LRCSection from "../components/LRCSection";
import { useSettings } from "../hooks/useSettings";

interface LRCPageProps {
  language?: 'hr' | 'en';
}

const LRCPage: React.FC<LRCPageProps> = ({ language = 'hr' }) => {
  const { settings, isLoading } = useSettings();
  const LRC_FORM_ENABLED = settings?.is_lrc_form_enabled ?? true;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Glavni sadržaj: webshop uvijek vidljiv, forma ovisno o isFormEnabled */}
      <section className="pb-16 px-4">
        <div className="mx-auto max-w-6xl">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-slate-600">Učitavanje...</p>
            </div>
          ) : (
            <LRCSection language={language} isFormEnabled={LRC_FORM_ENABLED} />
          )}
        </div>
      </section>
    </main>
  );
};

export default LRCPage;

export default function ProcessSection() {
  const steps = [
    { n: 1, t: "Brief", d: "Razumijemo potrebe i budžet." },
    { n: 2, t: "Mjerenja", d: "Prostor, materijali, rokovi." },
    { n: 3, t: "2D koncept", d: "Tlocrt i funkcija." },
    { n: 4, t: "3D render", d: "Vizual, boje, materijali." },
    { n: 5, t: "Ponuda", d: "Finalni prijedlog i rok isporuke." },
  ];
  return (
    <section id="process" className="Section fade-in">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
        <div className="min-w-0">
          <h2 className="mb-2 text-3xl font-bold font-heading text-plum dark:text-pearl sm:text-4xl">
            Naš proces
          </h2>
          <p className="text-lg text-[--color-ink-muted] dark:text-pearl/75">
            Od ideje do realizacije — korak po korak
          </p>
        </div>
        <a href="#contact" className="btn btn-primary hidden sm:inline-flex shrink-0">Zatraži ponudu</a>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5 lg:gap-6">
        {steps.map((s) => (
          <article 
            key={s.n} 
            className="flex h-full min-h-[120px] flex-col rounded-2xl p-5 sm:p-6 bg-white/80 dark:bg-white/8 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] dark:border-lavender/15 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] sm:hover:scale-105 fade-in"
          >
            <div className="flex items-center gap-3 mb-3">
              <span 
                className="inline-flex items-center justify-center size-10 rounded-full font-bold text-white transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #BDA6FF 0%, #6E44FF 100%)',
                  boxShadow: '0 2px 8px rgba(110, 68, 255, 0.3)'
                }}
              >
                {s.n}
              </span>
              <h3 className="text-lg font-bold text-plum dark:text-pearl">{s.t}</h3>
            </div>
            <p className="mt-auto text-sm leading-relaxed text-[--color-ink-muted] dark:text-pearl/75">{s.d}</p>
          </article>
        ))}
      </div>
      <div className="sm:hidden mt-6">
        <a href="#contact" className="btn btn-primary w-full">Zatraži ponudu</a>
      </div>
    </section>
  );
}
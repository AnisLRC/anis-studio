export default function ProcessSection() {
  const steps = [
    { n: 1, t: "Brief", d: "Razumijemo potrebe i budžet." },
    { n: 2, t: "Mjerenja", d: "Prostor, materijali, rokovi." },
    { n: 3, t: "2D koncept", d: "Tlocrt i funkcija." },
    { n: 4, t: "3D render", d: "Vizual, boje, materijali." },
    { n: 5, t: "Ponuda", d: "Finalni prijedlog i rok isporuke." },
  ];
  return (
    <section id="process" className="Section">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold">Naš proces</h2>
        <a href="#contact" className="btn btn-primary hidden sm:inline-flex">Zatraži ponudu</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {steps.map((s) => (
          <article key={s.n} className="rounded-2xl p-6 bg-[--color-card] shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center size-9 rounded-full border font-semibold">{s.n}</span>
              <h3 className="text-lg font-semibold">{s.t}</h3>
            </div>
            <p className="text-sm text-slate-600">{s.d}</p>
          </article>
        ))}
      </div>
      <div className="sm:hidden mt-6">
        <a href="#contact" className="btn btn-primary w-full">Zatraži ponudu</a>
      </div>
    </section>
  );
}

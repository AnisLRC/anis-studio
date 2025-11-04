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
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: '#2E2447', fontFamily: 'Poppins, sans-serif' }}>
            Naš proces
          </h2>
          <p className="text-[#5A4A6B] text-lg">
            Od ideje do realizacije — korak po korak
          </p>
        </div>
        <a href="#contact" className="btn btn-primary hidden sm:inline-flex">Zatraži ponudu</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {steps.map((s) => (
          <article 
            key={s.n} 
            className="rounded-2xl p-6 bg-white/80 backdrop-blur-sm border border-[rgba(110,68,255,0.15)] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 fade-in"
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
              <h3 className="text-lg font-bold text-[#2E2447]">{s.t}</h3>
            </div>
            <p className="text-sm text-[#5A4A6B] leading-relaxed">{s.d}</p>
          </article>
        ))}
      </div>
      <div className="sm:hidden mt-6">
        <a href="#contact" className="btn btn-primary w-full">Zatraži ponudu</a>
      </div>
    </section>
  );
}
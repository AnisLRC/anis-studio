export default function HomeHero() {
  return (
    <section className="Section hero-bg fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Lijevo: copy */}
        <div className="lg:col-span-6 max-w-2xl">
          <p className="eyebrow">Fuzija zanatskih vještina i moderne tehnologije</p>
          <h1 className="title-hero mb-6">
            Svaka ideja je bitna <span aria-hidden className="inline-block animate-pulse">✨</span>
          </h1>
          <p className="lead mb-8">
            Suveniri, 3D interijeri i web stranice koje prodaju — ručno rađeno, precizno i održivo.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <a className="btn btn-primary" href="#lrc">
              Pogledaj ponudu
            </a>
            <a className="btn btn-secondary" href="#contact">
              Zatraži ponudu
            </a>
          </div>

          {/* Tagovi */}
          <div className="flex flex-wrap gap-3">
            {["Epoksidna smola","Drvo","Keramika","Makrame","Laser","Prilagođeno","Poklon","Dom","Ukrasi","Nakit"].map(t => (
              <span key={t} className="pill">{t}</span>
            ))}
          </div>
        </div>

        {/* Desno: vizual + badge */}
        <div className="lg:col-span-6 relative">
          {/* Zamijeni s <img> kada budeš imao render */}
          <div className="rounded-2xl w-full aspect-[3/2] shadow-[0_8px_24px_rgba(110,68,255,0.15)] shimmer transition-all duration-300 hover:shadow-[0_12px_32px_rgba(110,68,255,0.25)] hover:scale-[1.01]" 
            style={{
              background: 'linear-gradient(135deg, rgba(189, 166, 255, 0.2) 0%, rgba(110, 68, 255, 0.15) 100%)'
            }}
          />
          <a href="#process" className="pill absolute -top-6 right-6 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200">
            ✨ Ideja → Skica → Proizvod
          </a>
        </div>
      </div>
    </section>
  );
}
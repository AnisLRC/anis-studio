import React from "react";

export default function HomeHero() {
  return (
    <section className="Section hero-bg">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Lijevo: copy */}
        <div className="lg:col-span-6 max-w-2xl">
          <p className="eyebrow">Fuzija zanatskih vještina i moderne tehnologije</p>
          <h1 className="title-hero">Svaka ideja je bitna <span aria-hidden>✨</span></h1>
          <p className="lead">Suveniri, 3D interijeri i web stranice koje prodaju — ručno rađeno, precizno i održivo.</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a className="btn btn-primary" href="#lrc">Pogledaj ponudu</a>
            <a className="btn btn-secondary" href="#contact">Zatraži ponudu</a>
          </div>

          {/* Tagovi */}
          <div className="mt-8 flex flex-wrap gap-3">
            {["Epoksidna smola","Drvo","Keramika","Makrame","Laser","Prilagođeno","Poklon","Dom","Ukrasi","Nakit"].map(t => (
              <span key={t} className="pill">{t}</span>
            ))}
          </div>
        </div>

        {/* Desno: vizual + badge */}
        <div className="lg:col-span-6 relative">
          {/* Zamijeni s <img> kada budeš imao render */}
          <div className="rounded-2xl w-full aspect-[3/2] shadow-[var(--shadow-card)] shimmer" />
          <a href="#process" className="pill absolute -top-6 right-6 bg-white/70 backdrop-blur-sm">
            ✨ Ideja → Skica → Proizvod
          </a>
        </div>
      </div>
    </section>
  );
}

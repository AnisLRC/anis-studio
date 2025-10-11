export default function App() {
  return (
    <div style={{padding: 24, fontFamily: 'sans-serif'}}>
      <h1>Hello, Ani 👋</h1>
      <p>App je živ. Sada možeš vratiti svoje sekcije korak po korak.</p>
    </div>
  )
}
import Header from "./sections/Header"; // ako ga još nemaš, vidi korak 4
import InteriorsSection from "./components/InteriorsSection";
import LRCSection from "./components/LRCSection";
import WebAtelierSection from "./components/WebAtelierSection";

export default function App() {
  return (
    <>
      {/** Header (opcionalno, vidi korak 4) */}
      {Header ? <Header /> : null}

      <main className="container" style={{ padding: "32px 0" }}>
        <section id="interiors" style={{ padding: "48px 0" }}>
          <h2>Interiors</h2>
          <InteriorsSection />
        </section>

        <section id="lrc" style={{ padding: "48px 0" }}>
          <h2>LRC</h2>
          <LRCSection />
        </section>

        <section id="web-atelier" style={{ padding: "48px 0" }}>
          <h2>Web Atelier</h2>
          <WebAtelierSection />
        </section>
      </main>
    </>
  );
}
import Header from "./components/Header";
import InteriorsSection from "./components/InteriorsSection";
import LRCSection from "./components/LRCSection";
import WebAtelierSection from "./components/WebAtelierSection";
// (AboutSection i ContactSection ćemo dodati za minutu)
export default function App() {
  return (
    <>
      <Header />
      <main className="container" style={{ padding: "32px 0" }}>
        <section id="interiors" style={{ padding: "48px 0" }}>
          <h2>Interiors</h2>
          <InteriorsSection />
        </section>

        <section id="lrc" style={{ padding: "48px 0" }}>
          <h2>LRC</h2>
          <LRCSection />
        </section>

        <section id="web-atelier" style={{ padding: "48px 0" }}>
          <h2>Web Atelier</h2>
          <WebAtelierSection />
        </section>

        <section id="about" style={{ padding: "48px 0" }}>
          <h2>O meni</h2>
          <AboutSection />
        </section>

        <section id="contact" style={{ padding: "48px 0" }}>
          <h2>Kontakt</h2>
          <ContactSection />
        </section>
      </main>
    </>
  );
}
export default function AboutSection() {
  return (
    <div>
      <p>
        Ja sam Ani — ovo je kratak opis studija. Ovdje može doći tvoj bio, usluge,
        filozofija dizajna i sl.
      </p>
    </div>
  );
}

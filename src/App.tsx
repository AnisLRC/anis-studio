export default function App() {
  return (
    <main className="container mx-auto py-12">
      <h1 className="text-3xl md:text-5xl font-semibold text-gradient">Ani's Studio</h1>
      <p className="mt-3 max-w-prose text-plum/80">Handmade art, interiors & digital design.</p>
      <div className="mt-6 flex gap-3">
        <a href="#lrc" className="btn-primary">LRC</a>
        <a href="#interiors" className="btn-primary">Interiors</a>
        <a href="#web" className="btn-primary">Web Atelier</a>
      </div>
    </main>
  );
}

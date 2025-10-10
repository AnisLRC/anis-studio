export default function App() {
  return (
    <div className="epoxy-background">
      <div className="epoxy-blob" />
      <div className="epoxy-blob" />
      <div className="epoxy-blob" />

      <main className="container section">
        <section className="glass-panel fade-in" style={{ padding: '2rem' }}>
          <h1>Typography & Theme Preview</h1>
          <p>
            Pearl white background, royal purple accents, deep plum text. This page uses Poppins for
            headings and Inter for body text.
          </p>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            <div className="glass-panel" style={{ padding: '1rem' }}><h2>H2 Sample</h2><p className="text-light">Semi-transparent glass card.</p></div>
            <div className="glass-panel" style={{ padding: '1rem' }}><h3>H3 Sample</h3><button className="btn btn-primary">Primary</button></div>
            <div className="glass-panel" style={{ padding: '1rem' }}><h4>H4 Sample</h4><button className="btn btn-secondary">Secondary</button></div>
          </div>
        </section>
      </main>
    </div>
  )
}

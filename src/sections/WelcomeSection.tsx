export default function WelcomeSection() {
  function handleLearnMore() {
    alert('Hvala na interesu! Više informacija uskoro.');
  }

  return (
    <section id="welcome" className="Section">
      <div className="flex items-center justify-between gap-6">
        <h2 className="text-2xl sm:text-3xl font-semibold">Dobrodošli</h2>
        <button type="button" className="btn btn-primary" onClick={handleLearnMore}>
          Saznaj više
        </button>
      </div>
    </section>
  );
}

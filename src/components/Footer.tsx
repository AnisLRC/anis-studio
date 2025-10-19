export default function Footer() {
  return (
    <footer className="border-t">
      <section className="Section py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-7 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#BDA6FF 0%,#6E44FF 100%)", boxShadow: "0 3px 8px rgba(110,68,255,.25)" }}>
              ✨
            </div>
            <span className="font-semibold">Ani's Studio</span>
          </div>
          <p className="text-sm text-slate-600 text-center">© 2025 Ani's Studio — ručno izrađeno u Hrvatskoj</p>
          <div className="flex items-center gap-3">
            <a className="p-2 rounded-md hover:bg-black/5 focus-ring" href="https://instagram.com/" aria-label="Instagram">IG</a>
            <a className="p-2 rounded-md hover:bg-black/5 focus-ring" href="mailto:studio@ani.hr" aria-label="Email">✉</a>
          </div>
        </div>
      </section>
    </footer>
  );
}
export default function Footer() {
  return (
    <footer className="border-t bg-gradient-to-b from-white to-[rgba(247,246,255,0.6)]">
      <section className="Section py-10 sm:py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
            <div className="size-8 rounded-xl flex items-center justify-center transition-all duration-200 hover:shadow-lg"
              style={{ 
                background: "linear-gradient(135deg,#BDA6FF 0%,#6E44FF 100%)", 
                boxShadow: "0 3px 8px rgba(110,68,255,.25)" 
              }}>
              ✨
            </div>
            <span className="font-semibold text-lg" style={{ fontFamily: 'Poppins, sans-serif', color: '#2E2447' }}>
              Ani's Studio
            </span>
          </div>
          
          <p className="text-sm text-[#5A4A6B] text-center max-w-md">
            © 2025 Ani's Studio — ručno izrađeno u Hrvatskoj
          </p>
          
          <div className="flex items-center gap-4">
            <a 
              className="p-3 rounded-xl hover:bg-gradient-to-br hover:from-[rgba(110,68,255,0.1)] hover:to-[rgba(189,166,255,0.1)] transition-all duration-200 hover:scale-110 hover:shadow-md focus-ring" 
              href="https://instagram.com/" 
              aria-label="Instagram"
              style={{ color: '#5A4A6B' }}
            >
              <span className="text-lg font-semibold">IG</span>
            </a>
            <a 
              className="p-3 rounded-xl hover:bg-gradient-to-br hover:from-[rgba(110,68,255,0.1)] hover:to-[rgba(189,166,255,0.1)] transition-all duration-200 hover:scale-110 hover:shadow-md focus-ring" 
              href="mailto:studio@ani.hr" 
              aria-label="Email"
              style={{ color: '#5A4A6B', fontSize: '1.25rem' }}
            >
              ✉
            </a>
          </div>
        </div>
      </section>
    </footer>
  );
}
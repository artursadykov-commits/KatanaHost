import WaitlistForm from "@/components/WaitlistForm";

// SVG logo MyFinz
function MyFinzLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="#0A0046" />
      <path d="M7 22V10l5.5 8 5.5-8v12" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 10h5M20 16h5M23 10v12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

// Apple App Store badge
function AppStoreBadge() {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-2.5 bg-black text-white px-4 py-2.5 rounded-xl hover:bg-gray-900 transition-colors"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <div className="text-left leading-tight">
        <div className="text-[9px] text-gray-300 font-normal">Descarga en el</div>
        <div className="text-sm font-semibold">App Store</div>
      </div>
    </a>
  );
}

// Google Play badge
function GooglePlayBadge() {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-2.5 bg-black text-white px-4 py-2.5 rounded-xl hover:bg-gray-900 transition-colors"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.18 23.76c.33.18.7.22 1.06.12l11.2-11.2-2.37-2.37L3.18 23.76z" fill="#EA4335" />
        <path d="M21.54 10.27L19 8.83l-2.68 2.68 2.68 2.68 2.57-1.46c.73-.42.73-1.44-.03-1.86z" fill="#FBBC04" />
        <path d="M2.1 1.02C1.8 1.34 1.62 1.82 1.62 2.44v19.12c0 .62.18 1.1.5 1.42l.08.07L13.54 12l-.08-.08L2.1 1.02z" fill="#4285F4" />
        <path d="M13.54 12l2.79-2.79L5.12.43C4.73.2 4.27.1 3.84.3L13.54 12z" fill="#34A853" />
      </svg>
      <div className="text-left leading-tight">
        <div className="text-[9px] text-gray-300 font-normal">Disponible en</div>
        <div className="text-sm font-semibold">Google Play</div>
      </div>
    </a>
  );
}

const transactions = [
  { icon: "🛒", name: "Lider", cat: "Supermercado", amount: "-$45.200" },
  { icon: "⛽", name: "Copec", cat: "Combustible", amount: "-$32.000" },
  { icon: "🍔", name: "Rappi", cat: "Comida", amount: "-$18.500" },
  { icon: "💊", name: "Salcobrand", cat: "Salud", amount: "-$12.300" },
];

const steps = [
  {
    step: "01",
    icon: "📄",
    title: "Sube tu cartola",
    desc: "Descarga el PDF de tu banco y súbelo a MyFinz. Compatible con los principales bancos de Chile.",
  },
  {
    step: "02",
    icon: "🤖",
    title: "La IA categoriza",
    desc: "Nuestra IA analiza cada transacción y la categoriza automáticamente. Sin claves bancarias.",
  },
  {
    step: "03",
    icon: "📊",
    title: "Ve tus gastos",
    desc: "Visualiza en qué gastaste, cuánto y en qué categorías. Toma el control de tu dinero.",
  },
];

const features = [
  {
    icon: "📄",
    title: "Importación de cartolas PDF",
    desc: "Sube el PDF de tu banco y la IA categoriza todo tu mes en segundos.",
  },
  {
    icon: "🔒",
    title: "100% privado y local",
    desc: "Tu información nunca sale de tu teléfono. Sin compartir claves bancarias.",
  },
  {
    icon: "👆",
    title: "Seguridad biométrica",
    desc: "Protege tus saldos con huella o PIN de 4 dígitos.",
  },
  {
    icon: "📊",
    title: "Categorización automática",
    desc: "Supermercado, combustible, comida, salud y más. Todo ordenado automáticamente.",
  },
];

const categories = [
  { label: "Supermercado", pct: 35, color: "bg-blue-500" },
  { label: "Combustible", pct: 20, color: "bg-orange-500" },
  { label: "Comida", pct: 18, color: "bg-green-500" },
  { label: "Salud", pct: 12, color: "bg-purple-500" },
  { label: "Otros", pct: 15, color: "bg-gray-400" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F9F9FA" }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <MyFinzLogo size={32} />
            <span className="font-bold text-gray-900 text-lg tracking-tight">MyFinz</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#como-funciona" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Cómo funciona
            </a>
            <a href="#funcionalidades" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Funcionalidades
            </a>
            <a href="#descargar" className="text-sm font-semibold text-white bg-[#0A0046] px-4 py-2 rounded-xl hover:opacity-90 transition-opacity">
              Descargar
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero — gradiente Kuanto */}
        <section
          className="pt-32 pb-24 px-6"
          style={{ background: "linear-gradient(45deg, #0A0046 0%, #625C86 100%)" }}
        >
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-xs font-semibold text-purple-200 bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-6">
                Próximamente · iOS &amp; Android
              </span>
              <h1 className="text-5xl font-extrabold text-white leading-tight">
                Tus finanzas,<br />claras en segundos.
              </h1>
              <p className="mt-6 text-xl text-purple-200 leading-relaxed">
                Sube la cartola de tu banco y deja que la IA categorice todo tu mes. Sin formularios, sin complicaciones.
              </p>
              <div className="mt-8 flex flex-wrap gap-3" id="descargar">
                <AppStoreBadge />
                <GooglePlayBadge />
              </div>
              <p className="mt-4 text-xs text-purple-300">Gratis · Sin suscripción</p>
            </div>

            {/* Phone mockup */}
            <div className="flex justify-center">
              <div className="relative w-64 h-[520px] bg-gray-900 rounded-[2.5rem] shadow-2xl border-4 border-white/10 flex flex-col overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-10" />
                <div className="flex-1 bg-gray-50 mt-6 flex flex-col">
                  <div className="bg-[#0A0046] px-4 pt-4 pb-5">
                    <div className="flex items-center gap-1.5 mb-2">
                      <MyFinzLogo size={16} />
                      <span className="text-xs text-purple-300 font-semibold">MyFinz</span>
                    </div>
                    <p className="text-xs text-purple-300">Balance total</p>
                    <p className="text-2xl font-bold text-white">$1.240.500</p>
                    <p className="text-xs text-green-400 mt-1">↓ 8% vs mes anterior</p>
                  </div>
                  <div className="p-3 space-y-2 flex-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">
                      Últimos movimientos
                    </p>
                    {transactions.map((t) => (
                      <div key={t.name} className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm">
                        <span className="text-xl">{t.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-900 truncate">{t.name}</p>
                          <p className="text-xs text-gray-400">{t.cat}</p>
                        </div>
                        <p className="text-xs font-bold text-red-500">{t.amount}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3">
                    <button className="w-full bg-[#0A0046] text-white text-xs font-semibold py-3 rounded-xl">
                      + Importar cartola
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 bg-white px-6" id="como-funciona">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">Así de simple.</h2>
            <p className="text-gray-500 text-center mt-3 text-lg">
              Tres pasos para tener tus finanzas bajo control.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {steps.map((s) => (
                <div key={s.step} className="rounded-2xl p-8 border border-gray-200" style={{ backgroundColor: "#F9F9FA" }}>
                  <div className="text-xs font-bold text-gray-300 mb-4">{s.step}</div>
                  <div className="text-3xl mb-4">{s.icon}</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features + PDF visual */}
        <section className="py-20 px-6" id="funcionalidades" style={{ backgroundColor: "#F9F9FA" }}>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Diseñada para Chile.</h2>
              <p className="text-gray-500 mt-4 text-lg leading-relaxed">
                Pensada para los bancos y hábitos de consumo chilenos. Sin suscripciones, sin complicaciones.
              </p>
              <div className="mt-8 space-y-6">
                {features.map((f) => (
                  <div key={f.title} className="flex gap-4">
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center flex-shrink-0 text-xl shadow-sm">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{f.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PDF visual */}
            <div className="flex justify-center">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-sm shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-14 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📄</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Cartola_BCI_Mar2024.pdf</p>
                    <p className="text-xs text-gray-400">142 transacciones · 1.2 MB</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {categories.map((c) => (
                    <div key={c.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600 font-medium">{c.label}</span>
                        <span className="text-gray-400">{c.pct}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-center text-green-600 font-semibold mt-6">
                  ✓ Categorizado en 3 segundos
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Security — gradiente Kuanto */}
        <section
          className="py-20 px-6"
          style={{ background: "linear-gradient(45deg, #0A0046 0%, #625C86 100%)" }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-5xl mb-6">👆</div>
            <h2 className="text-3xl font-extrabold text-white">Tus finanzas, bajo llave.</h2>
            <p className="mt-4 text-purple-200 text-lg leading-relaxed max-w-xl mx-auto">
              Tu información nunca sale de tu teléfono. Procesamiento 100% local, sin servidores externos, sin compartir tus claves bancarias.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <span className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                👆 Huella digital
              </span>
              <span className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                🔢 PIN de 4 dígitos
              </span>
              <span className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                🔒 Datos locales
              </span>
            </div>
          </div>
        </section>

        {/* Waitlist CTA */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold text-gray-900">¿Listo para conocer tus gastos?</h2>
            <p className="mt-4 text-gray-500 text-lg">
              Próximamente disponible. Deja tu email y te avisamos cuando lancemos.
            </p>
            <WaitlistForm />
            <div className="flex justify-center gap-3 mt-8">
              <AppStoreBadge />
              <GooglePlayBadge />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-6" style={{ backgroundColor: "#F9F9FA" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <MyFinzLogo size={28} />
                <span className="font-bold text-gray-900 tracking-tight">MyFinz</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Finanzas personales para Chile.<br />Simple, privado y gratis.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-3">App</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">App Store</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Google Play</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Privacidad</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Términos de Uso</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-3">Contacto</h4>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:hola@myfinz.cl" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    hola@myfinz.cl
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-10 pt-8 text-center">
            <p className="text-xs text-gray-400">© 2025 MyFinz. Hecho con ❤️ en Chile.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

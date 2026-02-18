"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function HeroSection() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>(0.1)

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-[#0a1628]"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0066ff]/20 blur-[120px] rounded-full" />
        <div className="absolute top-20 right-20 w-[200px] h-[200px] bg-[#00e5ff]/5 blur-[80px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <div className={`flex-1 space-y-8 ${isVisible ? 'animate-slide-left animate-visible' : 'animate-slide-left'}`}>
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-balance lg:text-7xl">
              <span className="[#00e5ff]">REDUZIMOS</span>
              <br />
              <span className="[#00e5ff]">IMPOSTOS</span>
              <br />
              <span className="[#00e5ff]">COM PRECISAO</span>
              <br />
              <span className="text-color [#00e5ff]">CIRURGICA</span>
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-[#8ba3c0]">
              A decisao tributaria que seu negocio precisa, com resultados e ZERO riscos.
              Decisoes sustentadas por tecnologia exclusiva e execucao orientada a
              exito financeiro.
            </p>
            <a
              href="#contato"
              className="cta-button inline-block rounded-full bg-[#00e5ff] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#0a1628] glow-effect"
            >
              Solicitar Diagnostico Tributario Estrategico
            </a>
          </div>

          {/* Right content - Tablet mockup */}
          <div className={`flex-1 relative ${isVisible ? 'animate-slide-right animate-visible' : 'animate-slide-right'}`}>
            <div className="relative">
              {/* Tablet frame */}
              <div className="relative mx-auto w-full max-w-[560px] rounded-2xl border-[6px] border-[#2a3a50] bg-[#0d1d33] p-4 shadow-2xl shadow-[#0066ff]/10">
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[#1a2a40]">
                  {/* Dashboard content simulation */}
                  <div className="p-3 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-[#8ba3c0]">
                      <span className="text-[#00e5ff] font-semibold">{'Diagnostico'}</span>
                      <span>{'/'}</span>
                      <span>{'Analises e Cruzamentos'}</span>
                    </div>
                    <div className="bg-[#0d1d33] rounded-lg p-3">
                      <p className="text-xs font-bold text-[#ffffff] mb-2">ANALISE GERENCIAL</p>
                      <p className="text-[10px] text-[#00e5ff]">INFORMACOES GERENCIAIS</p>
                      <div className="mt-3 grid grid-cols-4 gap-2">
                        {[
                          { label: "Resultados", value: "853.064.298,51" },
                          { label: "Oportunidades", value: "39,16 M" },
                          { label: "A Explorar", value: "1,98 M" },
                          { label: "Certificadas", value: "6,01 M" },
                        ].map((item, i) => (
                          <div key={i} className="bg-[#1a2a40] rounded p-2 text-center">
                            <p className="text-[8px] text-[#8ba3c0]">{item.label}</p>
                            <p className="text-[10px] font-bold text-[#ffffff]">{item.value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="bg-[#1a2a40] rounded p-2">
                          <p className="text-[8px] text-[#8ba3c0]">{'ICMS e Restituicao'}</p>
                          <p className="text-xs font-bold text-[#ffffff]">766.281.204,96</p>
                        </div>
                        <div className="bg-[#1a2a40] rounded p-2">
                          <p className="text-[8px] text-[#8ba3c0]">{'Total Recuperado'}</p>
                          <p className="text-xs font-bold text-[#ffffff]">12.437.996,76</p>
                        </div>
                      </div>
                      {/* Charts simulation */}
                      <div className="mt-3 flex gap-2">
                        <div className="flex-1 bg-[#1a2a40] rounded p-2 h-16 flex items-end gap-1">
                          {[40, 65, 45, 80, 55, 70, 90, 60].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-[#00e5ff]/60 rounded-t"
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>
                        <div className="flex-1 bg-[#1a2a40] rounded p-2 h-16 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full border-4 border-[#00e5ff] border-r-transparent" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Glow under tablet */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-[#0066ff]/40 blur-xl rounded-full" />
            </div>

            {/* GPTW Badge */}
            <div className="absolute -right-4 top-0 lg:right-0">
              <img
                src="/images/gptw-badge.png"
                alt="Great Place To Work - Certificada 2025 Brasil"
                className="w-20 h-auto lg:w-24"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

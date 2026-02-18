"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const tags = [
  "ANALISES PONTUAIS",
  "AMOSTRAGENS",
  "CRUZAMENTOS MANUAIS",
  "TESES GENERICAS",
  "PLANILHAS",
]

export function ReformaTributariaSection() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>(0.1)

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#0d1d33]">
      {/* Top part - lighter */}
      <div className="relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMEwwIDMwTDMwIDYwTDYwIDMwTDMwIDBaIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMGU1ZmYiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+')] bg-repeat" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
            {/* Left - person image area */}
            <div className={`flex-shrink-0 ${isVisible ? 'animate-slide-left animate-visible' : 'animate-slide-left'}`}>
              <div className="relative w-64 h-80 lg:w-80 lg:h-96 rounded-xl overflow-hidden bg-[#1a2a40]">
                {/* Businessman silhouette */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    width="200"
                    height="280"
                    viewBox="0 0 200 280"
                    fill="none"
                    className="text-[#2a4060]"
                  >
                    <circle cx="100" cy="60" r="40" fill="currentColor" />
                    <path
                      d="M40 280V200C40 170 60 150 100 150C140 150 160 170 160 200V280"
                      fill="currentColor"
                    />
                    <path
                      d="M80 90L70 150H90L85 120Z"
                      fill="currentColor"
                      opacity="0.8"
                    />
                    <path
                      d="M120 90L130 150H110L115 120Z"
                      fill="currentColor"
                      opacity="0.8"
                    />
                  </svg>
                </div>
                {/* Hand on face overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1d33] via-transparent to-transparent" />
              </div>
            </div>

            {/* Right content */}
            <div className="flex-1 space-y-6">
              <div className={`${isVisible ? 'animate-slide-right animate-visible' : 'animate-slide-right'}`}>
                <h2 className="text-3xl font-extrabold leading-tight text-[#ffffff] lg:text-5xl text-balance">
                  A Reforma Tributaria tem tirado o seu sono?
                </h2>
              </div>

              <div className={`max-w-lg ${isVisible ? 'animate-on-scroll animate-visible stagger-2' : 'animate-on-scroll'}`}>
                <p className="text-[#8ba3c0] leading-relaxed">
                  O Brasil esta entre os paises mais complexos do mundo para fazer negocios,
                  e a transicao da Reforma Tributaria tem agravado esse cenario.
                </p>
                <p className="mt-4 text-[#8ba3c0] leading-relaxed">
                  Se voce pensa em fazer uma consultoria tributaria para se adequar, e importante
                  frisar que a maioria desses projetos segue o mesmo padrao:
                </p>
              </div>

              {/* Tags */}
              <div className={`flex flex-wrap gap-3 ${isVisible ? 'animate-on-scroll animate-visible stagger-3' : 'animate-on-scroll'}`}>
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-lg border border-[#1e3a5f] bg-[#0d1d33] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#ffffff] transition-all duration-300 hover:border-[#00e5ff]/50 hover:bg-[#132a45]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom dark band */}
      <div className="bg-[#0a1628] py-12">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          <p className={`text-[#8ba3c0] text-sm leading-relaxed ${isVisible ? 'animate-on-scroll animate-visible stagger-4' : 'animate-on-scroll'}`}>
            O mercado tradicional de consultoria opera de forma limitada
            diante dessa complexidade tributaria.
          </p>
          <h3 className={`mt-4 text-2xl font-extrabold text-[#00e5ff] lg:text-4xl text-balance ${isVisible ? 'animate-on-scroll animate-visible stagger-5' : 'animate-on-scroll'}`}>
            Nos operamos com inteligencia,
            <br />
            tecnologia e precisao cirurgica.
          </h3>
        </div>
      </div>
    </section>
  )
}

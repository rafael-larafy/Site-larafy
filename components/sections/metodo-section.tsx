"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function MetodoSection() {
  const [ref, isVisible] = useScrollAnimation<HTMLElement>(0.3)

  return (
    <section
      ref={ref}
      className="relative py-12 bg-[#061120]"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 ${
            isVisible ? 'animate-on-scroll animate-visible' : 'animate-on-scroll'
          }`}
        >
          <h2 className="text-2xl font-extrabold text-[#00e5ff] lg:text-4xl">
            Entenda nosso metodo
          </h2>
          <a
            href="#metodo"
            className="cta-button rounded-full bg-[#00e5ff] px-10 py-4 text-sm font-bold uppercase tracking-wider text-[#0a1628] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.5)]"
          >
            O METODO
          </a>
        </div>
      </div>
    </section>
  )
}

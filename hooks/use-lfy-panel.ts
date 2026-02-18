"use client"

import { useEffect } from "react"

// Hook que encapsula a inicialização das animações do painel LFY.
// Uso: crie o markup (ids: lfySvg, lfyWheel, lfyScr*, lfyTip*, lfyBadge, etc.) no DOM
// e chame `useLfyPanel(containerRef)` no componente que contém esse markup.
export function useLfyPanel(containerRef: React.RefObject<HTMLElement | null>, opts?: { prefix?: string }) {
  useEffect(() => {
    if (!containerRef?.current) return
    const prefix = opts?.prefix || 'lfy'

    function deg2rad(d: number) { return (d - 90) * Math.PI / 180 }
    function p2c(cx: number, cy: number, r: number, a: number) {
      const d = deg2rad(a)
      return { x: cx + r * Math.cos(d), y: cy + r * Math.sin(d) }
    }

    function pie(cx: number, cy: number, rOuter: number, rInner: number, sa: number, ea: number) {
      const large = (ea - sa) > 180 ? 1 : 0
      const sOuter = p2c(cx, cy, rOuter, sa)
      const eOuter = p2c(cx, cy, rOuter, ea)
      const sInner = p2c(cx, cy, rInner, ea)
      const eInner = p2c(cx, cy, rInner, sa)
      return [
        'M', sOuter.x, ',', sOuter.y,
        ' A', rOuter, ',', rOuter, ' 0 ', large, ' 1 ', eOuter.x, ',', eOuter.y,
        ' L', sInner.x, ',', sInner.y,
        ' A', rInner, ',', rInner, ' 0 ', large, ' 0 ', eInner.x, ',', eInner.y,
        ' Z'
      ].join('')
    }

    function initLFY() {
      const svg = containerRef.current!.querySelector(`#${prefix}Svg`) as SVGElement | null
      const wheel = containerRef.current!.querySelector(`#${prefix}Wheel`) as HTMLElement | null
      if (!svg || !wheel) return false

      const CX = 270, CY = 270, R = 270, R_INNER = 190, GAP = 3, SEG = 72, OFF = -72
      const COLORS = ['#1a3a5c','#1a6b7c','#22b8c9','#1a3a5c','#132a45']
      const HCOLORS = ['#2a5a8c','#2a8b9c','#3ce0f2','#2a5a8c','#1a3a5c']

      if (!(svg as any).dataset.built) {
        const segs: any[] = []
        for (let i = 0; i < 5; i++) {
          const sa = OFF + i * SEG + GAP / 2
          const ea = OFF + (i + 1) * SEG - GAP / 2
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path') as SVGPathElement
          path.setAttribute('d', pie(CX, CY, R, R_INNER, sa, ea))
          path.setAttribute('fill', COLORS[i])
          path.setAttribute('class', `${prefix}-seg`)
          path.setAttribute('data-step', String(i + 1))
          svg.appendChild(path)
          segs.push({ el: path, sa, ea, c: COLORS[i], hc: HCOLORS[i] })
        }
        ;(svg as any).dataset.built = '1'
        ;(window as any).__lfySegs = segs
      }

      const segsRef: any[] = (window as any).__lfySegs || []
      if (!segsRef.length) return false

      segsRef.forEach((s, idx) => {
        const step = idx + 1
        const lbl = containerRef.current!.querySelector(`.${prefix}-lbl-` + step) as HTMLElement | null
        if (!lbl) return
        const mid = (s.sa + s.ea) / 2
        const labelRadius = (R + R_INNER) / 2 - 10
        const pos = p2c(CX, CY, labelRadius, mid)
        lbl.style.left = pos.x + 'px'
        lbl.style.top = pos.y + 'px'
      })

      let active: number | null = null

      function setStep(step: number) {
        if (active === step) return
        active = step
        segsRef.forEach((s, idx) => {
          const on = (idx + 1) === step
          if (on) {
            const mid = (s.sa + s.ea) / 2
            const rd = (mid - 90) * Math.PI / 180
            const tx = Math.cos(rd) * 10
            const ty = Math.sin(rd) * 10
            s.el.style.transform = `translate(${tx}px,${ty}px)`
            s.el.setAttribute('fill', s.hc)
            s.el.classList.add('active')
          } else {
            s.el.style.transform = 'translate(0,0)'
            s.el.setAttribute('fill', s.c)
            s.el.classList.remove('active')
          }
        })

        containerRef.current!.querySelectorAll(`.${prefix}-lbl`).forEach(l => {
          const n = parseInt((l as HTMLElement).getAttribute('data-step') || '0')
          if (n === step) {
            (l as HTMLElement).style.transform = 'translate(-50%, -50%) translateY(-6px) scale(1.04)'
            (l as HTMLElement).style.textShadow = '0 0 16px rgba(34,184,201,0.4)'
          } else {
            (l as HTMLElement).style.transform = 'translate(-50%, -50%)'
            (l as HTMLElement).style.textShadow = 'none'
          }
        })

        for (let j = 1; j <= 5; j++) {
          const tip = document.getElementById(`${prefix}Tip` + j)
          const cn = document.getElementById(`${prefix}C` + j)
          const dt = document.getElementById(`${prefix}D` + j)
          if (!tip || !cn || !dt) continue
          if (j === step) {
            tip.classList.add('active')
            cn.classList.add('active')
            dt.classList.add('active')
          } else {
            tip.classList.remove('active')
            cn.classList.remove('active')
            dt.classList.remove('active')
          }
        }

        for (let k = 1; k <= 5; k++) {
          const scr = document.getElementById(`${prefix}Scr` + k)
          if (!scr) continue
          if (k === step) scr.classList.add('active')
          else scr.classList.remove('active')
        }

        const badge = document.getElementById(`${prefix}Badge`)
        if (badge) {
          badge.textContent = String(step)
          badge.style.transform = 'translateX(-50%) scale(1.25)'
          setTimeout(() => { badge.style.transform = 'translateX(-50%) scale(1)'; }, 200)
        }
      }

      function clearStep() {
        active = null
        segsRef.forEach(s => {
          s.el.style.transform = 'translate(0,0)'
          s.el.setAttribute('fill', s.c)
          s.el.classList.remove('active')
        })
        containerRef.current!.querySelectorAll(`.${prefix}-lbl`).forEach(l => {
          (l as HTMLElement).style.transform = 'translate(-50%, -50%)'
          (l as HTMLElement).style.textShadow = 'none'
        })
        for (let j = 1; j <= 5; j++) {
          const tip = document.getElementById(`${prefix}Tip` + j)
          const cn = document.getElementById(`${prefix}C` + j)
          const dt = document.getElementById(`${prefix}D` + j)
          if (tip) tip.classList.remove('active')
          if (cn) cn.classList.remove('active')
          if (dt) dt.classList.remove('active')
        }
        for (let k = 1; k <= 5; k++) {
          const scr = document.getElementById(`${prefix}Scr` + k)
          if (scr) scr.classList.toggle('active', k === 1)
        }
        const badge = document.getElementById(`${prefix}Badge`)
        if (badge) badge.textContent = '1'
      }

      if (!wheel.dataset.bound) {
        segsRef.forEach((s, i) => s.el.addEventListener('mouseenter', () => setStep(i + 1)))
        containerRef.current!.querySelectorAll(`.${prefix}-lbl`).forEach(l => l.addEventListener('mouseenter', () => setStep(parseInt((l as HTMLElement).getAttribute('data-step') || '1'))))
        wheel.addEventListener('mouseleave', () => clearStep())
        wheel.dataset.bound = '1'
      }

      return true
    }

    let tries = 0
    const attempt = () => {
      const ok = initLFY()
      if (ok) return
      tries++
      if (tries < 60) setTimeout(attempt, 50)
    }
    attempt()
  }, [containerRef, opts])
}

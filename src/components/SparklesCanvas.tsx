import { useEffect, useRef } from 'react'

type Props = {
  density?: number // broj čestica (desktop)
  className?: string
}

export default function SparklesCanvas({ density = 55, className }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let w = 0
    let h = 0
    let raf = 0

    const dpr = Math.min(2, window.devicePixelRatio || 1)

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const isMobile = window.matchMedia('(max-width: 640px)').matches
    const N = Math.max(24, Math.floor((isMobile ? density * 0.55 : density)))

    const dots = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 2.1,
      v: 0.12 + Math.random() * 0.42,
      a: 0.08 + Math.random() * 0.22,
    }))

    resize()
    window.addEventListener('resize', resize)

    const tick = () => {
      ctx.clearRect(0, 0, w, h)

      const isDark = document.documentElement.classList.contains('dark')
      const base = isDark ? '255,255,255' : '110,68,255'

      for (const d of dots) {
        d.y -= d.v
        if (d.y < -20) {
          d.y = h + 20
          d.x = Math.random() * w
        }

        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${base},${d.a})`
        ctx.fill()
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [density])

  return (
    <canvas
      ref={ref}
      className={`${className} block`}
      aria-hidden="true"
    />
  )
}


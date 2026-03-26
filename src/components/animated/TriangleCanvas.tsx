import { useEffect, useRef } from 'react'

type Point = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

type TrianglePalette = {
  stroke: string
  fill: string
}

const POINTS_PER_TRIANGLE = 3

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const normalized = hex.trim().replace('#', '')
  if (!normalized) return null

  const fullHex =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : normalized

  if (!/^[0-9a-fA-F]{6}$/.test(fullHex)) return null

  return {
    r: parseInt(fullHex.slice(0, 2), 16),
    g: parseInt(fullHex.slice(2, 4), 16),
    b: parseInt(fullHex.slice(4, 6), 16),
  }
}

// Generates stroke and fill colors based on the CSS primary color with different opacities
function getTrianglePalette(): TrianglePalette {
  if (typeof window === 'undefined') {
    return {
      stroke: 'rgba(120, 0, 0, 0.35)',
      fill: 'rgba(120, 0, 0, 0.75)',
    }
  }

  const primary = getComputedStyle(document.documentElement).getPropertyValue('--color-primary')
  const rgb = hexToRgb(primary)

  if (!rgb) {
    return {
      stroke: 'rgba(120, 0, 0, 0.35)',
      fill: 'rgba(120, 0, 0, 0.75)',
    }
  }

  return {
    stroke: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.35)`,
    fill: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.75)`,
  }
}

function getTriangleCount() {
  if (typeof window === 'undefined') return 5
  const area = window.innerWidth * window.innerHeight
  return Math.max(3, Math.floor(area / 300000))
}

const TRIANGLE_COUNT = getTriangleCount()

function randomVelocity() {
  const speed = 0.35 + Math.random() * 0.55
  return (Math.random() > 0.5 ? 1 : -1) * speed
}

function createPoint(width: number, height: number): Point {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: randomVelocity(),
    vy: randomVelocity(),
    radius: 4 + Math.random() * 2,
  }
}

function drawTriangle(ctx: CanvasRenderingContext2D, points: Point[], palette: TrianglePalette) {
  const [a, b, c] = points

  ctx.beginPath()
  ctx.moveTo(a.x, a.y)
  ctx.lineTo(b.x, b.y)
  ctx.lineTo(c.x, c.y)
  ctx.closePath()
  ctx.strokeStyle = palette.stroke
  ctx.lineWidth = 1.4
  ctx.stroke()

  points.forEach((point) => {
    ctx.beginPath()
    ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
    ctx.fillStyle = palette.fill
    ctx.fill()
  })
}

function updatePoint(point: Point, width: number, height: number) {
  point.x += point.vx
  point.y += point.vy

  if (point.x <= point.radius || point.x >= width - point.radius) {
    point.vx *= -1
  }

  if (point.y <= point.radius || point.y >= height - point.radius) {
    point.vy *= -1
  }

  point.x = Math.min(width - point.radius, Math.max(point.radius, point.x))
  point.y = Math.min(height - point.radius, Math.max(point.radius, point.y))
}

function TriangleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    let width = 0
    let height = 0
    let rafId = 0
    let palette = getTrianglePalette()

    const points: Point[] = []

    const resetCanvas = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight

      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      points.length = 0
      const totalPoints = TRIANGLE_COUNT * POINTS_PER_TRIANGLE
      for (let i = 0; i < totalPoints; i += 1) {
        points.push(createPoint(width, height))
      }

      palette = getTrianglePalette()
    }

    const animate = () => {
      context.clearRect(0, 0, width, height)

      for (let i = 0; i < points.length; i += POINTS_PER_TRIANGLE) {
        const trianglePoints = points.slice(i, i + POINTS_PER_TRIANGLE)
        trianglePoints.forEach((point) => updatePoint(point, width, height))
        drawTriangle(context, trianglePoints, palette)
      }

      rafId = window.requestAnimationFrame(animate)
    }

    const themeObserver = new MutationObserver(() => {
      palette = getTrianglePalette()
    })

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    resetCanvas()
    animate()

    window.addEventListener('resize', resetCanvas)

    return () => {
      window.removeEventListener('resize', resetCanvas)
      window.cancelAnimationFrame(rafId)
      themeObserver.disconnect()
    }
  }, [])

  return <canvas className="triangle-canvas" ref={canvasRef} aria-hidden="true" />
}

export default TriangleCanvas

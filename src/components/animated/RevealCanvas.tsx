import { useEffect, useRef, type RefObject } from 'react'

type RevealCanvasProps = {
  containerRef: RefObject<HTMLElement> | null
}

function RevealCanvas({ containerRef }: RevealCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mousePositionRef = useRef({ x: 0, y: 0, visible: false })
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef?.current
    if (!canvas || !container) return

    const context = canvas.getContext('2d')
    if (!context) return

    const dpr = window.devicePixelRatio || 1
    let width = 0
    let height = 0
    const radius = 450

    const getMaskColor = () => {
      return (
        getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim() ||
        '#070b1f'
      )
    }

    let maskColor = getMaskColor()

    const setCanvasSize = () => {
      width = container.clientWidth
      height = container.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      context.fillStyle = maskColor
      context.fillRect(0, 0, width, height)

      if (mousePositionRef.current.visible) {
        const { x, y } = mousePositionRef.current
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, 'rgba(0, 0, 0, 1)')
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        context.save()
        context.globalCompositeOperation = 'destination-out'
        context.fillStyle = gradient
        context.beginPath()
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.fill()
        context.restore()
      }

      animationFrameRef.current = window.requestAnimationFrame(draw)
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const inside = x >= 0 && x <= width && y >= 0 && y <= height

      mousePositionRef.current = {
        x: Math.max(0, Math.min(width, x)),
        y: Math.max(0, Math.min(height, y)),
        visible: inside,
      }
    }

    const handleMouseLeave = () => {
      mousePositionRef.current.visible = false
    }

    const themeObserver = new MutationObserver(() => {
      maskColor = getMaskColor()
    })

    setCanvasSize()
    draw()

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', setCanvasSize)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', setCanvasSize)
      themeObserver.disconnect()
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [containerRef])

  return <canvas className="reveal-canvas" ref={canvasRef} aria-hidden="true" />
}

export default RevealCanvas

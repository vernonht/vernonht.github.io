import { useEffect, useRef, useState, useCallback } from 'react'

interface UseScrollFrameOptions {
  totalFrames?: number
  fps?: number
  threshold?: number
}

interface UseScrollFrameReturn {
  frame: number
  fps: number
  isInView: boolean
  ref: React.RefObject<HTMLElement | null>
  progress: number
}

export function useScrollFrame(options: UseScrollFrameOptions = {}): UseScrollFrameReturn {
  const { totalFrames = 60, fps = 60, threshold = 0.1 } = options
  const ref = useRef<HTMLElement | null>(null)
  const [isInView, setIsInView] = useState(false)
  const [progress, setProgress] = useState(0)

  const updateProgress = useCallback(() => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const windowHeight = window.innerHeight

    // Calculate how far into the viewport the element is
    // Animation starts when element enters viewport and completes after more scrolling
    const elementTop = rect.top
    const startPoint = windowHeight * 0.8 // Start animation when 80% into viewport
    const endPoint = windowHeight * 0.3 // Complete animation when element is 30% up the viewport

    // Progress goes from 0 to 1 over a longer scroll distance
    const scrollDistance = startPoint - endPoint
    const rawProgress = (startPoint - elementTop) / scrollDistance
    const clampedProgress = Math.max(0, Math.min(1, rawProgress))

    setProgress(clampedProgress)
  }, [])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        if (entry.isIntersecting) {
          updateProgress()
        }
      },
      { threshold }
    )

    observer.observe(element)

    const handleScroll = () => {
      if (isInView) {
        requestAnimationFrame(updateProgress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Initial check
    updateProgress()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isInView, threshold, updateProgress])

  // Convert progress (0-1) to frame number
  const frame = Math.round(progress * totalFrames)

  return { frame, fps, isInView, ref, progress }
}

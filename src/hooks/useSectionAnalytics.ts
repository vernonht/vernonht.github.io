import { useEffect } from 'react'
import ReactGAFunctions from 'react-ga4'

// @ts-expect-error react-ga4 may expose default export depending on module interop mode
const ReactGA = ReactGAFunctions.default || ReactGAFunctions

interface UseSectionAnalyticsOptions {
  sectionName: string
  sectionId: string
  threshold?: number
}

const trackedSections = new Set<string>()

function useSectionAnalytics({
  sectionName,
  sectionId,
  threshold = 0.5,
}: UseSectionAnalyticsOptions) {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return
    if (typeof IntersectionObserver === 'undefined') return

    const sectionElement = document.getElementById(sectionId)
    if (!sectionElement) return
    if (trackedSections.has(sectionId)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        if (trackedSections.has(sectionId)) {
          observer.unobserve(entry.target)
          return
        }

        trackedSections.add(sectionId)
        ReactGA.event('section_view', {
          section_name: sectionName,
          section_id: sectionId,
        })
        observer.unobserve(entry.target)
      },
      { threshold }
    )

    observer.observe(sectionElement)

    return () => {
      observer.disconnect()
    }
  }, [sectionId, sectionName, threshold])
}

export default useSectionAnalytics

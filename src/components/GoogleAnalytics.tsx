import { useEffect } from 'react'

type GtagCommand = 'js' | 'config' | 'event'
type GtagFn = (command: GtagCommand, ...params: unknown[]) => void
const GA_MEASUREMENT_ID = 'G-1W1Y24C3JE'

declare global {
  interface Window {
    dataLayer: unknown[][]
    gtag?: GtagFn
  }
}

function GoogleAnalytics() {
  useEffect(() => {
    const measurementId = GA_MEASUREMENT_ID
    if (typeof window === 'undefined' || !measurementId) return

    if (!window.dataLayer) {
      window.dataLayer = []
    }

    const gtag: GtagFn = (command, ...params) => {
      window.dataLayer.push([command, ...params])
    }

    window.gtag = window.gtag || gtag

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[data-ga-id="${measurementId}"]`
    )

    if (!existingScript) {
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
      script.dataset.gaId = measurementId
      document.head.appendChild(script)
    }

    window.gtag('js', new Date())
    window.gtag('config', measurementId)
  }, [])

  return null
}

export default GoogleAnalytics

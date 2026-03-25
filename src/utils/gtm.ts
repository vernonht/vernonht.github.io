/**
 * Google Tag Manager initialization and utilities
 */

type EventParams = Record<string, unknown>
type GtagCommand = 'js' | 'config' | 'event'
type GtagFn = (command: GtagCommand, ...params: unknown[]) => void

declare global {
  interface Window {
    dataLayer: unknown[][]
    gtag?: GtagFn
  }
}

const GTM_ID = 'G-1W1Y24C3JE'

/**
 * Initialize Google Tag Manager / Google Analytics
 * Loads the gtag script and initializes tracking
 */
export function initializeGTM(): void {
  if (typeof window === 'undefined') return

  // Avoid duplicate initialization
  if (window.gtag) return

  // Load the gtag script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`
  document.head.appendChild(script)

  // Initialize gtag
  window.dataLayer = window.dataLayer || []

  const gtag: GtagFn = (command, ...params) => {
    window.dataLayer.push([command, ...params])
  }

  gtag('js', new Date())
  gtag('config', GTM_ID)

  window.gtag = gtag
}

/**
 * Track a custom event with Google Analytics
 * @param eventName - Name of the event
 * @param eventParams - Optional event parameters
 */
export function trackEvent(eventName: string, eventParams?: EventParams): void {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', eventName, eventParams ?? {})
}

/**
 * Track page view
 * @param pagePath - Path of the page
 * @param pageTitle - Title of the page
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('config', GTM_ID, {
    page_path: pagePath,
    page_title: pageTitle || document.title,
  })
}

export default { initializeGTM, trackEvent, trackPageView }

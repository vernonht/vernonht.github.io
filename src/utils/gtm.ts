/**
 * Google Tag Manager initialization and utilities
 */

const GTM_ID = 'G-1W1Y24C3JE';

/**
 * Initialize Google Tag Manager / Google Analytics
 * Loads the gtag script and initializes tracking
 */
export function initializeGTM(): void {
  if (typeof window === 'undefined') return;

  // Avoid duplicate initialization
  if ((window as any).gtag) return;

  // Load the gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(this: any, ...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', GTM_ID);

  (window as any).gtag = gtag;
}

/**
 * Track a custom event with Google Analytics
 * @param eventName - Name of the event
 * @param eventParams - Optional event parameters
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>): void {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('event', eventName, eventParams || {});
}

/**
 * Track page view
 * @param pagePath - Path of the page
 * @param pageTitle - Title of the page
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  (window as any).gtag('config', GTM_ID, {
    page_path: pagePath,
    page_title: pageTitle || document.title,
  });
}

export default { initializeGTM, trackEvent, trackPageView };

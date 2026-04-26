import { useEffect, useRef } from 'react'
import ReactGAFunctions from 'react-ga4'
// @ts-expect-error react-ga4 may expose default export depending on module interop mode
const ReactGA = ReactGAFunctions.default || ReactGAFunctions

const GA_MEASUREMENT_ID = 'G-1W1Y24C3JE'

function GoogleAnalytics() {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const measurementId = GA_MEASUREMENT_ID
    if (typeof window === 'undefined' || !measurementId) return

    ReactGA.initialize(GA_MEASUREMENT_ID)
    ReactGA.send({
      hitType: 'pageview',
      page: `${window.location.pathname}${window.location.search}`,
      title: document.title,
    })
  }, [])

  return null
}

export default GoogleAnalytics

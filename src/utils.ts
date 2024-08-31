export const isIOS = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  return /iphone|ipad|ipod/.test(userAgent)
}

export const trackEvent = (
  eventName: string,
  category: string,
  eventParams: Record<string, any>
) => {
  // @ts-ignore
  window.gtag('event', eventName, {
    event_category: category,
    ...eventParams,
  })
}

/**
 * This function constructs the base URL using the current protocol,
 * host, and pathname. It checks if the code is running in a browser
 * environment (i.e., `window` is defined) before accessing the
 * location properties.
 *
 * @returns {string} The base URL as a string in the format
 *                  'protocol://host/pathname', or an empty string
 *                  if not running in a browser environment.
 */

export const getBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    const protocol = window.location.protocol
    const host = window.location.host
    const pathname = window.location.pathname

    return `${protocol}//${host}/${pathname}`
  }

  return ''
}

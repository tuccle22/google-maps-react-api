import { useEffect, useState } from 'react'

/**
 * useScript(someUrl, window.google && window.google.maps)
 * @param {string} url of the script
 * @param {boolean} a window object to determine whether 
 * the script needs to be loaded
 * @returns {boolean} returns a stateful value of whether
 * the status of the script loading
 */
function useScript(url, alreadyLoaded) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // only mount script if passed in val doesn't exist
    if (!alreadyLoaded) {
      const script = document.createElement('script')

      script.src = url
      script.async = true
      script.defer = true
      script.onload = () => setIsLoaded(true)
      // add script to page
      document.head.appendChild(script)

      return () => {
        // although this removes the script tag from
        // the dom, it doesn't remove existing objects,
        // but it's better than nothing
        script.parentNode.removeChild(script)
      }
    }

  }, [url, alreadyLoaded])

  return isLoaded
}

export {
  useScript
}
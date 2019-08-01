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
      script.onload = () => setIsLoaded(true)
      // add script to page
      document.head.appendChild(script)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return isLoaded
}

export {
  useScript
}
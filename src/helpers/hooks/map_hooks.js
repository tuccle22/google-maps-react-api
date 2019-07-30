import { useEffect } from 'react'

function useSetOptions(mapObj, opts) {
  useEffect(() => {
    mapObj.setOptions(opts)
  }, [mapObj, opts])
}

function useMapListener(mapObj, func, event) {
  useEffect(() => {
    if (mapObj && func) {
      // function that passes back all event and the mapObj itself
      const enhancedFunc = (...e) => func(...e, mapObj)
      const listener = mapObj.addListener(event, enhancedFunc)
      return () => window.google.maps.event.removeListener(listener)
    }
  }, [mapObj, func, event])
}

export {
  useSetOptions,
  useMapListener
}
import { useEffect } from 'react'

function useSetOptions(mapObj, opts) {
  useEffect(() => {
    mapObj.setOptions(opts)
  }, [mapObj, opts])
}

function SetOptions({obj, opts}) {
  useSetOptions(obj, opts)
  return null
}

function useMapListener(mapObj, func, event) {
  useEffect(() => {
    // function that passes back all event and the mapObj itself
    const enhancedFunc = (...e) => func(...e, mapObj)
    const listener = mapObj.addListener(event, enhancedFunc)
    return () => window.google.maps.event.removeListener(listener)
  }, [mapObj, func, event])
}

function AddMapListener({obj, func, event}) {
  useMapListener(obj, func, event)
  return null
}

export {
  useSetOptions,
  SetOptions,
  useMapListener,
  AddMapListener
}
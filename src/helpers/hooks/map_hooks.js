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

function SetOption({obj, func, args}) {
  useEffect(() => {
    obj[func](args)
  }, [obj, func, args])
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

function useMapListenerOnce(mapObj, func, event) {
  useEffect(() => {
    const enhancedFunc = (...e) => func(...e, mapObj)
    window.google.event.addListenerOnce(event, enhancedFunc)
    // according to documentation this listener removes itself,
    // but I wonder how it works if the listener never triggers
  }, [mapObj, func, event])
}

function AddMapListener({obj, func, event}) {
  useMapListener(obj, func, event)
  return null
}

function useCreateMapListeners(mapObj, events, eventMapping) {
  return Object.keys(events).map(funcName => {
    function MapListener() {
      useMapListener(mapObj, events[funcName], eventMapping[funcName])
    }
    return MapListener()
  })
}


export {
  useSetOptions,
  SetOptions,
  SetOption,
  useMapListener,
  useMapListenerOnce,
  AddMapListener,
  useCreateMapListeners,
}
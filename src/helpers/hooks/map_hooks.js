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
  console.log(obj, func, args)
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
function useCreateMapListenersOnce(mapObj, eventsOnce, eventMapping) {
  return Object.keys(eventsOnce).forEach(funcName => {
    function MapListenerOnce() {
      useEffect(() => {
        const enhancedFunc = (...e) => eventsOnce[funcName](...e, mapObj)
        mapObj.addListenerOnce(eventMapping[funcName], enhancedFunc)
        // according to documentation this listener removes itself,
        // but I wonder how it works if the listener never triggers
      }, [])
    }
    return MapListenerOnce()
  })
}

export {
  useSetOptions,
  SetOptions,
  SetOption,
  useMapListener,
  AddMapListener,
  useCreateMapListeners,
}
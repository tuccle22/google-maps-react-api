import React, { Fragment as _, createContext, useContext, useRef } from 'react'
import { SetOptions, SetOption, useCreateMapListeners, useMapListener, useMapListenerOnce } from '../../../helpers/hooks/map_hooks'
import { googleMapEvents } from './GoogleMapEvents';
import { useNodeRefConstructor } from '../../../helpers/hooks/use_node_ref_constructor';
/**
 * GoogleMap
 * https://developers.google.com/maps/documentation/javascript/reference/map
 */
function GoogleMap({
  bounds,
  center,
  children,
  options,
  containerProps,
  ...events
}) {

  const [mapRef, map] = useNodeRefConstructor(
    window.google.maps.Map, 
    { zoom: options.zoom }
  )

  return (
    <_>
      <div ref={mapRef} {...containerProps} />
        { map ?
          <_>
            <MapContext.Provider value={map}>
              { children }
            </MapContext.Provider>
            <SetOptions obj={map} opts={options} />
            <SetOption obj={map} func='panTo' args={center} />
            {bounds ? <SetOption obj={map} func='fitBounds' args={bounds} /> : null}
            <OnMap map={map} events={events} googleMapEvents={googleMapEvents} />
          </_>
        : null }
    </_>
  )
}

function OnMap({map, events, googleMapEvents}) {
  useCreateMapListeners(map, events, googleMapEvents)
  return null
}
/**
 * Google Map Context for sharing the map instance
 */
const MapContext = createContext()
function useMap() {
  return useContext(MapContext);
}

function useAMapListener() {
  const map = useMap()
  if (!map) throw new Error(
    'useMapEventListener is not used in a child component of GoogleMap'
  )
  return map
}

function useMapEventListener(event, func) {
  const map = useAMapListener()
  return useMapListener(map, func, event)
}
function useMapEventListenerOnce(event, func) {
  const map = useAMapListener()
  return useMapListenerOnce(map, func, event)
}

export {
  useMap,
  useMapEventListener,
  useMapEventListenerOnce,
  GoogleMap as default
}
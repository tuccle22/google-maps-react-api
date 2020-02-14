import React, { Fragment as _, createContext, useContext, useRef } from 'react'
import { SetOptions, SetOption, useCreateMapListeners, useMapListener, useMapListenerOnce, useSetOptions } from '../../../helpers/hooks/map_hooks'
import { googleMapEvents } from './GoogleMapEvents';
import { useNodeRefConstructor } from '../../../helpers/hooks/use_node_ref_constructor';
import { useEffect } from 'react';
import { memo } from 'react';
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
          <MapContext.Provider value={map}>
            <OnMap center={center} options={options} events={events}>
              { children }
            </OnMap>
          </MapContext.Provider>
        : null }
    </_>
  )
}

const OnMap = memo(({children, center, opts, events, bounds}) => {
  const map = useMap()
  // set map event listeners
  useCreateMapListeners(map, events, googleMapEvents)
  // set options on map
  useSetOptions(map, opts)
  // set center of map
  useEffect(() => {
    map.panTo(center)
  }, [map, center])
  // set bounds of map
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds)
    }
  }, [map, bounds])
  return children
})
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
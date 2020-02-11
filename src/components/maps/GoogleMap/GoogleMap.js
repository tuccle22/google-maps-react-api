import React, { Fragment as _, createContext, useContext, useRef } from 'react'
import { SetOptions, SetOption, useCreateMapListeners, useMapListener } from '../../../helpers/hooks/map_hooks'
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
  const initialZoom = useRef(options.zoom)
  const initialCenter = useRef(options.center)

  const [mapRef, map] = useNodeRefConstructor(
    window.google.maps.Map,
    { zoom: initialZoom.current,
      center: initialCenter.current
    }
  )

  useCreateMapListeners(map, events, googleMapEvents)

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
            {bounds ? <SetOption obj={map} func='panToBounds' args={bounds} />: null}
          </_>
        : null }
    </_>
  )
}
/**
 * Google Map Context for sharing the map instance
 */
const MapContext = createContext()
function useMap() {
  return useContext(MapContext);
}

function useMapEventListener(event, func) {
  const map = useMap()
  if (!map) throw new Error(
    'useMapEventListener is not used in a child component of GoogleMap'
  )
  return useMapListener(map, func, event)
}
export {
  useMap,
  useMapEventListener,
  GoogleMap as default
}
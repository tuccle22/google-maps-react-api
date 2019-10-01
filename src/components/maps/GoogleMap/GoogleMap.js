import React, { Fragment as _, createContext, useContext, useRef } from 'react'
import { AddMapListener, SetOptions, SetOption } from '../../../helpers/hooks/map_hooks'
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
            { Object.keys(events).map(funcName =>
              <AddMapListener key={funcName}
                obj={map}
                func={events[funcName]}
                event={googleMapEvents[funcName]}
              />
            )}
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

export {
  useMap,
  GoogleMap as default
}
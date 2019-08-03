import React, { useEffect, createContext, useContext } from 'react'
import { useSetOptions, AddMapListener } from '../../../helpers/hooks/map_hooks'
import { googleMapEvents } from './GoogleMapEvents';

/**
 * Google Map Context for sharing the map instance
 */
const MapContext = createContext()
function useMap() {
  return useContext(MapContext);
}
/**
 * GoogleMap
 * https://developers.google.com/maps/documentation/javascript/reference/map
 */
function GoogleMap({
  map,
  bounds,
  center,
  children,
  options,
  ...events
}) {

  // set map options
  useSetOptions(map, options)

  // sets map to new bounds
  useEffect(() => {
    if (bounds) map.fitBounds(bounds)
  }, [map, bounds])

  // CENTER - sets center to new center
  useEffect(() => void map.panTo(center), [map, center])

  return (
    <MapContext.Provider value={map}>
      { children }
      { Object.keys(events).map(funcName =>
        <AddMapListener key={funcName}
          obj={map}
          func={events[funcName]}
          event={googleMapEvents[funcName]}
        />
      )}
    </MapContext.Provider>
  )
}

export {
  useMap,
  GoogleMap as default
}
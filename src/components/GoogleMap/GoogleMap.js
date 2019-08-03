import React, { useEffect, createContext, useContext } from 'react'
import { useSetOptions, useMapListener } from '../../helpers/hooks/map_hooks'
import { googleMapEvents } from './GoogleMapEvents';

/**
 * Google Map Context for sharing the map instance
 */
const MapContext = createContext()
function useMap() {
  return useContext(MapContext);
}
/**
 * Full Coverage
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
  
  // EVENTS - add event listeners
  for (let i = 0; i < events.length; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMapListener(map, ...events[googleMapEvents[i]])
  }

  return (
    <MapContext.Provider value={map}>
      {children}
    </MapContext.Provider>
  )
}

export {
  useMap,
  GoogleMap as default
}
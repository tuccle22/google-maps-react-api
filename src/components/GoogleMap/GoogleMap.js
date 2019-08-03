import React, { useEffect } from 'react'
import { MapProvider } from '../../contexts/map/map_context'
import { useSetOptions, useMapListener } from '../../helpers/hooks/map_hooks'
import { googleMapEvents } from './GoogleMapEvents';
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
    <MapProvider value={map}>
      {children}
    </MapProvider>
  )
}

export default GoogleMap
import React, { useEffect } from 'react'
import { useMap } from '../../maps/GoogleMap/GoogleMap'
import { useCallbackRef } from '../../../helpers/hooks/use_callback_ref';
import { useSetOptions, AddMapListener } from '../../../helpers/hooks/map_hooks';
import { polylineEvents } from './PolylineEvents';
/**
 * Polyline
 * https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline
 */
function Polyline({
  options,
  ...events
}) {

  const map = useMap()

  const polyline = useCallbackRef(() =>
    new window.google.maps.Polyline()
  )

  // handle polyline options
  useSetOptions(polyline, options)

  // handle polyline mounting/unmounting
  useEffect(() => {
    polyline.setMap(map)
    return () => polyline.setMap(null)
  }, [map, polyline])

  return Object.keys(events).map(funcName =>
    <AddMapListener key={funcName}
      obj={polyline}
      func={events[funcName]}
      event={polylineEvents[funcName]}
    />
  )
}

export default Polyline
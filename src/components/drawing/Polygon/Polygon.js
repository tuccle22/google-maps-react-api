import React, { useEffect } from 'react'
import { useMap } from '../../maps/GoogleMap/GoogleMap'
import { useCallbackRef } from '../../../helpers/hooks/use_callback_ref';
import { useSetOptions, AddMapListener } from '../../../helpers/hooks/map_hooks';
import { polygonEvents } from './PolygonEvents';

/**
 * Polygon
 * https://developers.google.com/maps/documentation/javascript/reference/polygon#Polygon
 */
function Polygon({
  options,
  ...events
}) {

  const map = useMap()

  const polygon = useCallbackRef(() => 
    new window.google.maps.Polygon()
  )

  // handle polygon options
  useSetOptions(polygon, options)

  // handle polygon mounting/unmounting
  useEffect(() => {
    polygon.setMap(map)
    return () => polygon.setMap(null)
  }, [map, polygon])

  return Object.keys(events).map(funcName =>
    <AddMapListener key={funcName}
      obj={polygon}
      func={events[funcName]}
      event={polygonEvents[funcName]}
    />
  )
}

export default Polygon
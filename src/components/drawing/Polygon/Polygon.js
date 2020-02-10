import { useEffect } from 'react'
import { useMap } from '../../maps/GoogleMap/GoogleMap'
import { useCallbackRef } from '../../../helpers/hooks/use_callback_ref';
import { useSetOptions, useCreateMapListeners } from '../../../helpers/hooks/map_hooks';
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

  useCreateMapListeners(polygon, events, polygonEvents)
  return null
}

export default Polygon
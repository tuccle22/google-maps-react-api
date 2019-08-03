import { useEffect } from 'react'
import { useMap } from '../GoogleMap/GoogleMap'
import { useCallbackRef } from '../../helpers/hooks/use_callback_ref';
import { useSetOptions, useMapListener } from '../../helpers/hooks/map_hooks';
import { PolygonProvider } from '../../contexts/polygon/polygon_context';
import { polygonEvents } from './PolygonEvents';
import { useSetOptions } from '../../helpers/hooks/map_hooks';

/**
 * Working fully as far as I can tell
 */
function Polygon({
  options,
  // mouse events
  ...events
}) {

  const map = useMap()

  const polygon = useCallbackRef(() => 
    new window.google.maps.Polygon()
  )

  // handle polygon options
  useSetOptions(polygon, options)

  // EVENTS - add event listeners
  for (let i = 0; i < events.length; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMapListener(polygon, ...events[polygonEvents[i]])
  }

  // handle polygon mounting/unmounting
  useEffect(() => {
    polygon.setMap(map)
    return () => polygon.setMap(null)
  }, [map, polygon])

  return null
}

export default Polygon
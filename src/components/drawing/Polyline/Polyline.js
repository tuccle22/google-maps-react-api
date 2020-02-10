import { useEffect } from 'react'
import { useMap } from '../../maps/GoogleMap/GoogleMap'
import { useCallbackRef } from '../../../helpers/hooks/use_callback_ref';
import { useSetOptions, useCreateMapListeners } from '../../../helpers/hooks/map_hooks';
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

  useCreateMapListeners(polyline, events, polylineEvents)
  return null
}

export default Polyline
import { useEffect } from 'react'
import { useMap } from '../../maps/GoogleMap/GoogleMap'
import { useCallbackRef } from '../../../helpers/hooks/use_callback_ref';
import { useSetOptions, useCreateMapListeners } from '../../../helpers/hooks/map_hooks';
import { rectangleEvents } from './RectangleEvents';
/**
 * Rectangle
 * https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle
 */
function Rectangle({
  options,
  ...events
}) {

  const map = useMap()

  const rectangle = useCallbackRef(() =>
    new window.google.maps.Rectangle()
  )

  // handle rectangle options
  useSetOptions(rectangle, options)

  // handle rectangle mounting/unmounting
  useEffect(() => {
    rectangle.setMap(map)
    return () => rectangle.setMap(null)
  }, [map, rectangle])

  useCreateMapListeners(rectangle, events, rectangleEvents)
  return null
}

export default Rectangle
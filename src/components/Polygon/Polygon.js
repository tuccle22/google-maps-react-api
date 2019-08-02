import { useEffect } from 'react'
import { useMap } from '../GoogleMap/GoogleMap'
import { useCallbackRef } from '../../helpers/hooks/use_callback_ref';
import { useSetOptions } from '../../helpers/hooks/map_hooks';
import { useMouseEvents } from '../../helpers/hooks/map_events';

/**
 * Working fully as far as I can tell
 */
function Polygon({
  options,
  // mouse events
  onClick,
  onDblClick,
  onDrag,
  onDragEnd,
  onDragStart,
  onMouseDown,
  onMouseOut,
  onMouseOver,
  onMouseUp
}) {

  const map = useMap()

  const polygon = useCallbackRef(() => 
    new window.google.maps.Polygon()
  )

  // handle polygon options
  useSetOptions(polygon, options)

  useMouseEvents(polygon, {
    onClick,
    onDblClick,
    onDrag,
    onDragEnd,
    onDragStart,
    onMouseDown,
    onMouseOut,
    onMouseOver,
    onMouseUp
  })

  // handle polygon mounting/unmounting
  useEffect(() => {
    polygon.setMap(map)
    return () => polygon.setMap(null)
  }, [map, polygon])

  return null
}

export default Polygon
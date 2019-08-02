import { useEffect } from 'react'
import { useMap } from '../GoogleMap/GoogleMap'
import { useMarker } from '../Marker/Marker'
import { useSetOptions, useMapListener } from '../../helpers/hooks/map_hooks'
import { useCallbackRef } from '../../helpers/hooks/use_callback_ref'

/**
 * Full Coverage
 */
function Circle({
  center,
  options,
  // events
  onCenterChanged,
  onClick,
  onDblClick,
  onDrag,
  onDragEnd,
  onDragStart,
  onMouseDown,
  onMouseMove,
  onMouseOut,
  onMouseOver,
  onMouseUp,
  onRadiusChanged,
  onRightClick
}) {
  const map = useMap()
  const marker = useMarker()

  // circle reference
  const circle = useCallbackRef(() =>
    new window.google.maps.Circle()
  )

  // set circle options
  useSetOptions(circle, options)

  // set event listeners
  useMapListener(circle, onCenterChanged, 'center_changed')
  useMapListener(circle, onClick, 'click')
  useMapListener(circle, onDblClick, 'dblclick')
  useMapListener(circle, onDrag, 'drag')
  useMapListener(circle, onDragEnd, 'dragend')
  useMapListener(circle, onDragStart, 'dragstart')
  useMapListener(circle, onMouseDown, 'mousedown')
  useMapListener(circle, onMouseMove, 'mousemove')
  useMapListener(circle, onMouseOut, 'mouseout')
  useMapListener(circle, onMouseOver, 'mouseover')
  useMapListener(circle, onMouseUp, 'mouseup')
  useMapListener(circle, onRadiusChanged, 'radius_changed')
  useMapListener(circle, onRightClick, 'rightclick')

  // set location, if marker context, anchor, else use center
  useEffect(() => {
    if (marker) {
      circle.bindTo('center', marker, 'position')
      circle.bindTo('map', marker, 'map')
    } else {
      circle.setCenter(center)
    }
  }, [circle, marker, center])

  // handles mounting/unmounting
  useEffect(() => {

    if (marker) {
      // add to map if child of marker and marker is on map
      // this means circle isn't on map if marker is clustererd
      if (marker.getMap()) {
        circle.setMap()
      }
    } else {
      circle.setMap()
    }

    return () => circle.setMap(null)
  }, [map, circle, marker])

  return null
}

export default Circle
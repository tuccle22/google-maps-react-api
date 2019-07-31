import { useEffect } from 'react'
import { useMap } from '../../contexts/map/map_context'
import { useSetOptions, useMapListener } from '../../helpers/hooks/map_hooks'

/**
 * WORKING
 */
function GoogleMap({
  bounds,
  center,
  children,
  options,
  // event props
  onBoundsChanged,
  onCenterChanged,
  onClick,
  onDblClick,
  onDrag,
  onDragEnd,
  onDragStart,
  onHeadingChanged,
  onIdle,
  onMapTypeIdChanged,
  onMouseMove,
  onMouseOut,
  onMouseOver,
  onProjectionChanged,
  onRightClick,
  onTilesLoaded,
  onTiltChanged,
  onZoomChanged,
}) {

  const map = useMap()

  // set map options
  useSetOptions(map, options)

  // sets map to new bounds
  useEffect(() => {
    if (bounds) map.fitBounds(bounds)
  }, [map, bounds])

  // CENTER - sets center to new center
  useEffect(() => void map.panTo(center), [map, center])
  
  // EVENTS - add event listeners
  useMapListener(map, onBoundsChanged, 'bounds_changed')
  useMapListener(map, onCenterChanged, 'center_changed')
  useMapListener(map, onClick, 'click')
  useMapListener(map, onDblClick, 'dblclick')
  useMapListener(map, onDrag, 'drag')
  useMapListener(map, onDragEnd, 'dragend')
  useMapListener(map, onDragStart, 'dragstart')
  useMapListener(map, onHeadingChanged, 'heading_changed')
  useMapListener(map, onIdle, 'idle')
  useMapListener(map, onMapTypeIdChanged, 'maptypeid_changed')
  useMapListener(map, onMouseMove, 'mousemove')
  useMapListener(map, onMouseOut, 'mouseout')
  useMapListener(map, onMouseOver, 'mouseover')
  useMapListener(map, onProjectionChanged, 'projection_changed')
  useMapListener(map, onRightClick, 'rightclick')
  useMapListener(map, onTilesLoaded, 'tilesloaded')
  useMapListener(map, onTiltChanged, 'tilt_changed')
  useMapListener(map, onZoomChanged, 'zoom_changed')

  return children
}

export default GoogleMap
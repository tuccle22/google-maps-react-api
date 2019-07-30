import React, { useEffect } from 'react'
import { useMap } from '../../contexts/map/map_context'
import { MarkerProvider } from '../../contexts/marker/marker_context'
import { useSetOptions } from '../../helpers/hooks/map_hooks'
import { useCallbackRef } from '../../helpers/hooks/use_callback_ref'
import { useClusterer } from '../../contexts/marker_clusterer/marker_clusterer_context'
import { useMouseEvents } from '../../helpers/hooks/map_events'

/**
 * Full API Coverage, i think
 * Needs more event coverage
 */
function Marker({
  center,
  children,
  options,
  noRedraw,
  // events
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
  const clusterer = useClusterer()

  // MARKER
  const marker = useCallbackRef(() =>
    new window.google.maps.Marker()
  )

  // MARKER OPTIONS
  useSetOptions(marker, options)

  // CENTER
  useEffect(() => {
    marker.setPosition(center)
  }, [marker, center])

  useMouseEvents(marker, {
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

  /**
  * MOUNTING / UNMOUNTING
  */
  useEffect(() => {
    if (clusterer) {
      clusterer.addMarker(marker, noRedraw)
      return () => {
        clusterer.removeMarker(noRedraw)
        marker.setMap(null)
      }
    } else {
      marker.setMap(map)
      return () => {
        marker.setMap(null)
      }
    }
  }, [map, marker, clusterer, noRedraw])

  return (
    <MarkerProvider value={marker}>
      {children}
    </MarkerProvider>
  )
}

export default Marker
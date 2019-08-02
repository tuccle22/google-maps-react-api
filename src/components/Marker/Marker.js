import React, { useEffect, createContext, useContext } from 'react'
import { useMap } from '../GoogleMap/GoogleMap'
import { useClusterer } from '../Clusterer/Clusterer'
import { useSetOptions } from '../../helpers/hooks/map_hooks'
import { useCallbackRef } from '../../helpers/hooks/use_callback_ref'
import { useMouseEvents } from '../../helpers/hooks/map_events'
/**
 * Marker Context for sharing the map instance
 */
const MarkerContext = createContext()
function useMarker() {
  return useContext(MarkerContext);
}
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
    <MarkerContext.Provider value={marker}>
      {children}
    </MarkerContext.Provider>
  )
}

export {
  useMarker,
  Marker as default
}
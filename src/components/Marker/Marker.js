import React, { useEffect, createContext, useContext } from 'react'
import { useMap } from '../../contexts/map/map_context'
import { useSetOptions, useMapListener } from '../../helpers/hooks/map_hooks'
import { useCallbackRef } from '../../helpers/hooks/use_callback_ref'
import { useClusterer } from '../../contexts/marker_clusterer/marker_clusterer_context'
import { markerEvents } from './MarkerEvents';
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
  ...events
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

  // EVENTS - add event listeners
  for (let i = 0; i < events.length; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMapListener(marker, ...events[markerEvents[i]])
  }
  
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
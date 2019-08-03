import React, { useEffect, createContext, useContext } from 'react'
import { useMap } from '../../maps/GoogleMap/GoogleMap'
import { useSetOptions, AddMapListener } from '../../../helpers/hooks/map_hooks'
import { useCallbackRef } from '../../../helpers/hooks/use_callback_ref'
import { useClusterer } from '../../addons/Clusterer/Clusterer'
import { markerEvents } from './MarkerEvents'
/**
 * Marker
 * https://developers.google.com/maps/documentation/javascript/reference/marker
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
      <React.Fragment>
        {children}
        { Object.keys(events).map(funcName =>
          <AddMapListener key={funcName}
            obj={marker} 
            func={events[funcName]}
            event={markerEvents[funcName]}
          />
        )}
      </React.Fragment>
    </MarkerContext.Provider>
  )
}

/**
 * Marker Context for sharing the marker instance
 */
const MarkerContext = createContext()
function useMarker() {
  return useContext(MarkerContext);
}

export {
  useMarker,
  Marker as default
}
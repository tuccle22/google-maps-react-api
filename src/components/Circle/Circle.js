import { useEffect } from 'react'
import { useMap } from '../../contexts/map/map_context'
import { useSetOptions } from '../../helpers/hooks/map_hooks'
import { useCallbackRef } from '../../helpers/hooks/use_callback_ref'
import { useMarker } from '../../contexts/marker/marker_context'

/**
 * CURRENTLY WORKING
 * TODO: EVENTS
 */
function Circle({
  center,
  options,
}) {
  const map = useMap()
  const marker = useMarker()

  // circle reference
  const circle = useCallbackRef(() =>
    new window.google.maps.Circle()
  )

  // set circle options
  useSetOptions(circle, options)

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
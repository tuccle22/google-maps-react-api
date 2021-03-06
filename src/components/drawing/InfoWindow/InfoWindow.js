import { Children, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useMap } from '../../maps/GoogleMap/GoogleMap'
import { useMarker } from '../Marker/Marker'
import { useCallbackRef } from '../../../helpers/hooks/use_callback_ref'
import { useSetOptions, useCreateMapListeners } from '../../../helpers/hooks/map_hooks'
import { infoWindowEvents } from './InfoWindowEvents'
/**
 * InfoWindow
 * https://developers.google.com/maps/documentation/javascript/reference/info-window
 */
function InfoWindow({
  center,
  children,
  anchor,
  options,
  ...events
}) {

  const map = useMap()
  const marker = useMarker()

  const infoWindow = useCallbackRef(() => 
    new window.google.maps.InfoWindow()
  )

  const div = useCallbackRef(() =>
    document.createElement('div')
  )

  // handle info window options
  useSetOptions(infoWindow, options)

  // handle info window position, when no anchor
  useEffect(() => {
    if (center) {
      infoWindow.setPosition(center)
    }
  }, [infoWindow, center])

  // handle info window content
  useEffect(() => {
    infoWindow.setContent(div)
  }, [infoWindow, div])

  // handle info window mounting/unmounting
  useEffect(() => {
    // InfoWindow is a child of a Marker
    if (marker) {
      infoWindow.open(map, marker)
    // InfoWindow was passed a google map anchor obj
    } else if (anchor) {
      infoWindow.open(map, anchor)
    // InfoWindow is passed center; positioning is handled above
    } else {
      infoWindow.open(map)
    }
    return () => infoWindow.setMap(null)
  }, [map, marker, anchor, infoWindow, children])

  useCreateMapListeners(infoWindow, events, infoWindowEvents)
  // TODO not sure if I need to use Children.only here
  return createPortal(Children.only(children), div)
}

export default InfoWindow
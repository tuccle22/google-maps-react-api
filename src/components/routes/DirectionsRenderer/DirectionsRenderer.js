import React, { useEffect } from 'react'
import { useMap } from '../../maps/GoogleMap/GoogleMap';
import { useCallbackRef } from '../../../helpers/hooks/use_callback_ref';
import { useSetOptions, AddMapListener } from '../../../helpers/hooks/map_hooks';
import { polygonEvents } from '../../drawing/Polygon/PolygonEvents';

function DirectionsRenderer({
  options,
  ...events
}) {

  const map = useMap()

  const directionsRenderer = useCallbackRef(() => 
    new window.google.maps.DirectionsRenderer()
  )

  // set options
  useSetOptions(directionsRenderer, options)

  useEffect(() => {
    directionsRenderer.setMap(map)
    return () => directionsRenderer.setMap(null)
  }, [map, directionsRenderer])

  return Object.keys(events).map(funcName =>
    <AddMapListener key={funcName}
      obj={directionsRenderer}
      func={events[funcName]}
      event={polygonEvents[funcName]}
    />
  )
}

export default DirectionsRenderer
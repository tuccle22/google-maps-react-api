import { useEffect } from 'react'
import { useMap } from '../../maps/GoogleMap/GoogleMap';
import { useCallbackRef } from '../../../helpers/hooks/use_callback_ref';
import { useSetOptions, useCreateMapListeners } from '../../../helpers/hooks/map_hooks';
import { directionsRendererEvents } from './directionsRendererEvents';

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

  useCreateMapListeners(directionsRenderer, events, directionsRendererEvents)
  return null
}

export default DirectionsRenderer
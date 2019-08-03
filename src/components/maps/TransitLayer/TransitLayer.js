import { useEffect } from 'react'
import { useMap } from '../GoogleMap/GoogleMap'
import { useCallbackRef } from '../../../helpers/hooks/use_callback_ref'

function TransitLayer() {
  const map = useMap()
  const transitLayer = useCallbackRef(() =>
    new window.google.maps.TransitLayer()
  )
  useEffect(() => {
    transitLayer.setMap(map)
    return () => transitLayer.setMap(null)
  }, [map, transitLayer])
  return null
}

export default TransitLayer
import { useEffect } from 'react'
import { useMap } from '../GoogleMap/GoogleMap'
import { useCallbackRef } from '../../../helpers/hooks/use_callback_ref'

function BicyclingLayer() {
  const map = useMap()
  const bicyclingLayer = useCallbackRef(() =>
    new window.google.maps.BicyclingLayer()
  )
  useEffect(() => {
    bicyclingLayer.setMap(map)
    return () => bicyclingLayer.setMap(null)
  }, [map, bicyclingLayer])
  return null
}

export default BicyclingLayer
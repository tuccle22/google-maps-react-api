import { useEffect } from 'react'
import { useMap } from "../GoogleMap/GoogleMap";
import { useSetOptions } from "../../../helpers/hooks/map_hooks";
import { useCallbackRef } from "../../../helpers/hooks/use_callback_ref";

function TrafficLayer({options}) {
  const map = useMap()
  const trafficLayer = useCallbackRef(() =>
    new window.google.maps.TrafficLayer()
  )
  useSetOptions(trafficLayer, options)
  useEffect(() => {
    trafficLayer.setMap(map)
    return () => trafficLayer.setMap(null)
  }, [map, trafficLayer])
  return null
}

export default TrafficLayer
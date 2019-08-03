import { useMemo } from 'react'
import { useCallbackRef } from '../../helpers/hooks/use_callback_ref';
import { useMap } from '../GoogleMap/GoogleMap'

function useCustomOverlay() {
  const map = useMap()
  const CustomOverlay = useMemo(() => {
    function CustomOverlay(map) {
      this.setMap(map)
      this.remove = () => this.setMap(null)
    }
    CustomOverlay.prototype = new window.google.maps.OverlayView()
    return CustomOverlay
  }, [])
  
  const customOverlay = useCallbackRef(() => new CustomOverlay(map))
  
  return [customOverlay, CustomOverlay]
}


export { useCustomOverlay }
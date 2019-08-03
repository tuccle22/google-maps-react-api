import { useMemo } from 'react'
import { useCallbackRef } from '../../../helpers/hooks/use_callback_ref';
import { useMap } from '../../maps/GoogleMap/GoogleMap'

/**
 * Hook that creates a CustomerOverlay component
 * with the prototype of google maps OverlayView
 * returns an array of [instance, class]
 */
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

const PANES = {
  FLOAT_PANE: 'floatPane',
  MAP_PANE: 'mapPane',
  MARKER_LAYER: 'markerLayer',
  OVERLAY_LAYER: 'overlayLayer',
  OVERLAY_MOUSE_TARGET: 'overlayMouseTarget'
}

export { useCustomOverlay, PANES }
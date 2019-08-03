import { createPortal } from 'react-dom'
import { memo, useMemo } from 'react'
import { useCallbackRef } from '../../../helpers/hooks/use_callback_ref'
import { useCustomOverlay, PANES } from './helper'
const { FLOAT_PANE, MAP_PANE, MARKER_LAYER, OVERLAY_LAYER, OVERLAY_MOUSE_TARGET } = PANES;
/**
 * OverlayView
 * https://developers.google.com/maps/documentation/javascript/reference/overlay-view#OverlayView
 */
function OverlayView({
  center,
  children,
  className,
  pane = FLOAT_PANE,
  style
}) {

  // [overlay instance, overlay function]
  const [customOverlay, CustomOverlay] = useCustomOverlay()

  const div = useCallbackRef(() => document.createElement('div'))

  useMemo(() => {
    CustomOverlay.prototype.onAdd = (e) => {
      customOverlay.getPanes()[pane].appendChild(div)
    }
  }, [div, pane, customOverlay, CustomOverlay])

  useMemo(() => {
    CustomOverlay.prototype.draw = () => {
      const projection = customOverlay.getProjection()
      const { x, y } = projection.fromLatLngToDivPixel(
        new window.google.maps.LatLng(center)
      )
      if (style) {
        // haven't tested yet
        const strStyles = Object.entries(style).reduce((str, [key, val]) => `${str}${key}:${val};`, '')
        div.style.setAttribute(strStyles)
      }
      div.className = className
      div.style.position = 'absolute'
      div.style.left = `${x}px`
      div.style.top = `${y}px`
    }
  }, [div, customOverlay, CustomOverlay, center, className, style])

  // handle unmounting
  useMemo(() => {
    CustomOverlay.prototype.onRemove = memo(() => {
      div.parentNode.removeChild(div)
    })
    return () => customOverlay.remove()
  }, [div, customOverlay, CustomOverlay])

  return createPortal(children, div)
}

OverlayView.floatPane = FLOAT_PANE
OverlayView.mapPane = MAP_PANE
OverlayView.markerLayer = MARKER_LAYER
OverlayView.overlayLayer = OVERLAY_LAYER
OverlayView.overlayMouseTarget = OVERLAY_MOUSE_TARGET

export default OverlayView

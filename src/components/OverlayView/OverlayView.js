import { createPortal } from 'react-dom'
import { memo, useMemo } from 'react'
import { useCallbackRef } from '../../helpers/hooks/use_callback_ref'
import { usePolygonCenter } from '../../contexts/polygon/polygon_context'
import { useCustomOverlay } from './helper'


/**
 * Probably could use a hook to be able to position it
 * left, right, top, bottom and figure out how it's positioned
 * now
 */
function OverlayView({
  center,
  children,
  className,
  style
}) {

  // [overlay instance, overlay function]
  const [customOverlay, CustomOverlay] = useCustomOverlay()

  const div = useCallbackRef(() => document.createElement('div'))

  const polygonCenter = usePolygonCenter()

  useMemo(() => {
    CustomOverlay.prototype.onAdd = (e) => {
      customOverlay.getPanes().floatPane.appendChild(div)
    }
  }, [div, customOverlay, CustomOverlay])

  useMemo(() => {
    CustomOverlay.prototype.draw = () => {
      const projection = customOverlay.getProjection()
      const { x, y } = projection.fromLatLngToDivPixel(
        new window.google.maps.LatLng(polygonCenter ? polygonCenter : center)
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

  }, [div, customOverlay, CustomOverlay, polygonCenter, center, className, style])

  // handle unmounting
  useMemo(() => {
    CustomOverlay.prototype.onRemove = memo(() => {
      div.parentNode.removeChild(div)
    })
    return () => customOverlay.remove()
  }, [div, customOverlay, CustomOverlay])

  return createPortal(children, div)
}

export default OverlayView

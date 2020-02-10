import { useEffect } from 'react'
import { useCallbackRef } from '../../../helpers/hooks/use_callback_ref'
import { useMap } from '../../maps/GoogleMap/GoogleMap'
import { useSetOptions, useCreateMapListeners } from '../../../helpers/hooks/map_hooks'
import { drawingManagerEvents } from './DrawingManagerEvents'
/**
 * DrawingManager
 * https://developers.google.com/maps/documentation/javascript/reference/drawing#DrawingManager
 */
function DrawingManager({
  options,
  ...events
}) {

  const map = useMap()

  // drawingManager reference
  const drawingManager = useCallbackRef(() =>
    new window.google.maps.drawing.DrawingManager())

  // set drawing manager options
  useSetOptions(drawingManager, options)
  
  // handle drawing manager mounting/unmounting
  useEffect(() => {
    drawingManager.setMap(map)
    return () => drawingManager.setMap(null)
  }, [map, drawingManager])

  useCreateMapListeners(drawingManager, events, drawingManagerEvents)
  return null
}

export default DrawingManager
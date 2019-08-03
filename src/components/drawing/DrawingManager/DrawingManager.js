import React, { useEffect } from 'react'
import { useCallbackRef } from '../../../helpers/hooks/use_callback_ref'
import { useMap } from '../../maps/GoogleMap/GoogleMap'
import { useSetOptions, AddMapListener } from '../../../helpers/hooks/map_hooks'
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

  return Object.keys(events).map(funcName =>
    <AddMapListener key={funcName}
      obj={drawingManager}
      func={events[funcName]}
      event={drawingManagerEvents[funcName]}
    />
  )
}

export default DrawingManager
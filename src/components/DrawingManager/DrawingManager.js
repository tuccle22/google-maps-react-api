import { useEffect } from 'react'
import { useCallbackRef } from '../../helpers/hooks/use_callback_ref';
import { useMap } from '../../contexts/map/map_context';
import { useSetOptions, useMapListener } from '../../helpers/hooks/map_hooks';
import { drawingManagerEvents } from './DrawingManagerEvents';
import { useMap } from '../GoogleMap/GoogleMap'
import { useCallbackRef } from '../../helpers/hooks/use_callback_ref'
import { useSetOptions, useMapListener } from '../../helpers/hooks/map_hooks'


/**
 * WORKING - haven't tried anything complicated
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

  // event listeners
  for (let i = 0; i < events.length; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMapListener(drawingManager, ...events[drawingManagerEvents[i]])
  }
  

  // handle drawing manager mounting/unmounting
  useEffect(() => {
    drawingManager.setMap(map)
    return () => drawingManager.setMap(null)
  }, [map, drawingManager])

  return null
}

export default DrawingManager
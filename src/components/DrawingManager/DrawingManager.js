import { useEffect } from 'react'
import { useCallbackRef } from '../../helpers/hooks/use_callback_ref';
import { useMap } from '../../contexts/map/map_context';
import { useSetOptions, useMapListener } from '../../helpers/hooks/map_hooks';


/**
 * WORKING - haven't tried anything complicated
 */
function DrawingManager({
  options,
  onCircleComplete,
  onMarkerComplete,
  onOverlayComplete,
  onPolygonComplete,
  onPolyLineComplete,
  onRectangleComplete
}) {

  const map = useMap()

  // drawingManager reference
  const drawingManager = useCallbackRef(() =>
    new window.google.maps.drawing.DrawingManager())

  // set drawing manager options
  useSetOptions(drawingManager, options)

  // event listeners
  useMapListener(drawingManager, onCircleComplete, 'circlecomplete')
  useMapListener(drawingManager, onMarkerComplete, 'markercomplete')
  useMapListener(drawingManager, onOverlayComplete, 'overlaycomplete')
  useMapListener(drawingManager, onPolygonComplete, 'polygoncomplete')
  useMapListener(drawingManager, onPolyLineComplete, 'polylinecomplete')
  useMapListener(drawingManager, onRectangleComplete, 'rectanglecomplete')

  // handle drawing manager mounting/unmounting
  useEffect(() => {
    drawingManager.setMap(map)
    return () => drawingManager.setMap(null)
  }, [map, drawingManager])

  return null
}

export default DrawingManager
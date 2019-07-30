import { useMapListener } from './map_hooks';

function useMouseEvents(mapObj, {
  onClick,
  onDblClick,
  onDrag,
  onDragEnd,
  onDragStart,
  onMouseDown,
  onMouseOut,
  onMouseOver,
  onMouseUp,
  onRightClick
}) {
  useMapListener(mapObj, onClick, 'click')
  useMapListener(mapObj, onDblClick, 'dblclick')
  useMapListener(mapObj, onDrag, 'drag')
  useMapListener(mapObj, onDragEnd, 'dragend')
  useMapListener(mapObj, onDragStart, 'dragstart')
  useMapListener(mapObj, onMouseDown, 'mousedown')
  useMapListener(mapObj, onMouseOut, 'mouseout')
  useMapListener(mapObj, onMouseOver, 'mouseover')
  useMapListener(mapObj, onMouseUp, 'mouseup')
  useMapListener(mapObj, onRightClick, 'rightclick')
}

export {
  useMouseEvents
}
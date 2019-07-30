import { useCallback } from 'react'

function useHover(onOver, onOut) {
  const onMouseOver = useCallback((...args) => void onOver(...args), [onOver])
  const onMouseOut = useCallback(() => void onOut(), [onOut])

  return [
    onMouseOver,
    onMouseOut
  ]
}
export {
  useHover
}
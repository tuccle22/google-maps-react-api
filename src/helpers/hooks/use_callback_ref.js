import { useRef } from 'react'

/**
 * I can't remember what lead me to use this pattern,
 * but just using useCallback doesn't work
 */
function useCallbackRef(func) {
  const ref = useRef(null)
  if (ref.current === null) {
    ref.current = func()
  }
  return ref.current
}

export {
  useCallbackRef
}
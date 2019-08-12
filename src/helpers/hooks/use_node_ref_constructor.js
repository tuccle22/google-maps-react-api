import { useRef, useCallback, useState } from 'react'

function useNodeRefConstructor(clazz, args) {
  const [obj, setObj] = useState(null)
  const el = useRef(null)
  const ref = useCallback(node => {
    if (node) {
      el.current = node
      setObj(new clazz(node, args))
    }
  // this is a constructor
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return [ref, obj]
}

export {
  useNodeRefConstructor
}
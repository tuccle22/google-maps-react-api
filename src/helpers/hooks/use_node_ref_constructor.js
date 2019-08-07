import { useRef, useCallback, useState, useEffect } from 'react'

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

  useEffect(() => {
    return () => {
      if (el.current) {
        el.current.parentNode.removeChild(el.current)
      }
    }
  }, [])
  return [ref, obj]
}

export {
  useNodeRefConstructor
}
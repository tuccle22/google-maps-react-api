import { useCallback, useState } from 'react'
import { useRef } from 'react'

/**
 * Creates a class instance that needs
 * a dom reference to instantiate the class
 * Returns an array of two values:
 * 1. Function - takes a dom ref
 * 2. classInstance - null on initial render
 * @param {Class} clazz
 * @param {Object} arg
 * @returns {Array} [refCallback, classInstance]
 */
function useNodeRefConstructor(clazz, arg) {
  // this mimics a constructor so we don't want to
  // have these arguments recreate the callback
  const initClazz = useRef(clazz)
  const initArgs = useRef(arg)

  const [inst, setInst] = useState(null)
  const ref = useCallback(node => {
    if (node) setInst(new initClazz.current(node, initArgs.current))
  }, [])
  return [ref, inst]
}

export {
  useNodeRefConstructor
}
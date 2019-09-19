import { useCallback, useState } from 'react'

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
  const [inst, setInst] = useState(null)
  const ref = useCallback(node => {
    if (node) setInst(new clazz(node, arg))
  // this is a constructor
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return [ref, inst]
}

export {
  useNodeRefConstructor
}
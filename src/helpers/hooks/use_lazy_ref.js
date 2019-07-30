import { useRef } from 'react';

function useLazyRef(callback) {
  const ref = useRef(null)
  function getRef() {
    if (ref.current === null) {
      ref.current = callback();
    }
    return ref.current;
  }
  return getRef;
}

export { 
  useLazyRef
}
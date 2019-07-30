import { useEffect } from 'react'

function useSetClusterer(clusterer, val, setter) {
  useEffect(() => {
    if (val) clusterer[setter](val)
  }, [clusterer, val, setter])
}

export {
  useSetClusterer
}
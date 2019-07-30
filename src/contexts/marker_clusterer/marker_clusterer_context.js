import { createContext, useContext } from 'react'

/**
 * Google Map Context for sharing the map instance
 */
const Clusterer = createContext()
const { Provider } = Clusterer

// hoook for getting the map reference
function useClusterer() {
  return useContext(Clusterer)
}

export {
  useClusterer,
  Clusterer,
  Provider as ClustererProvider
}
import { createContext, useContext } from 'react';

/**
 * Google Map Context for sharing the map instance
 */
const MarkerContext = createContext()
const { Provider } = MarkerContext

// hoook for getting the map reference
function useMarker() {
  return useContext(MarkerContext);
}

export {
  useMarker,
  MarkerContext,
  Provider as MarkerProvider
}
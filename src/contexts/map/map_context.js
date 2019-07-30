import { createContext, useContext } from 'react';

/**
 * Google Map Context for sharing the map instance
 */
const MapContext = createContext()
const { Provider } = MapContext

// hook for getting the map reference
function useMap() {
  return useContext(MapContext);
}

export {
  useMap,
  MapContext,
  Provider as MapProvider
}
import { useMemo, createContext, useContext } from 'react';
import { getPolygonCenter } from '../../helpers/utils/map_utils';

/**
 * Polygon Context for sharing the map instance
 */
const PolygonContext = createContext()
const { Provider } = PolygonContext

// hoook for getting the map reference
function usePolygon() {
  console.log(PolygonContext)
  return useContext(PolygonContext);
}

function usePolygonCenter() {
  const polygon = usePolygon()
  const polygonCenter = useMemo(() => {
    if (polygon) {
      console.log(polygon)
      return getPolygonCenter(polygon)
    } else {
      return null
    }
  }, [polygon])

  return polygonCenter
}

export {
  usePolygon,
  usePolygonCenter,
  PolygonContext,
  Provider as PolygonProvider
}
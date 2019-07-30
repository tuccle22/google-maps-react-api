import React, { useState, useCallback } from 'react'
import GoogleMap from '../GoogleMap/GoogleMap'
import { useMapListener } from '../../helpers/hooks/map_hooks'
import { MapProvider } from '../../contexts/map/map_context'

/**
 * This component handles rendering the GoogleMap,
 * which is basically a set of listeners
 */
function MapLoader({
  containerProps,
  zoom,
  center,
  ...rest
}) {
  const [map, setMap] = useState(null)
  const [isLoaded, setLoaded] = useState(false)

  /**
   * MAP - sets map in the state
   */
  const mapRef = useCallback(node => {
    if (node !== null) {
      setMap(new window.google.maps.Map(node, {zoom, center}))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // use the 'idle' event to determine that the map is fully loaded
  useMapListener(map, useCallback(() =>  {
    if (!isLoaded) setLoaded(true)
  }, [isLoaded]), 
    'idle', 
  )

  return (
    <div ref={mapRef} {...containerProps}>
      { isLoaded && 
        <MapProvider value={map}>
          <GoogleMap map={map} center={center} zoom={zoom} {...rest}
          />
        </MapProvider>
      }
    </div>
  )
}

export default MapLoader
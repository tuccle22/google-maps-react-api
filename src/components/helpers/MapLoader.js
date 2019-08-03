import React, { useState, useCallback } from 'react'
import GoogleMap from '../maps/GoogleMap/GoogleMap'
/**
 * This component handles rendering the GoogleMap,
 * which is basically a set of listeners
 */
const defaultOptions = {};

function MapLoader({
  center,
  containerProps,
  options = defaultOptions,
  ...rest
}) {
  const [map, setMap] = useState(null)

  // sets reference to the map
  const mapRef = useCallback(node => {
    if (node !== null) {
      setMap(new window.google.maps.Map(node, {
        zoom: options.zoom,
        center
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={mapRef} {...containerProps}>
      { map ? 
        <GoogleMap map={map} 
          center={center} 
          options={options} 
          {...rest}
        />
      : null
      }
    </div>
  )
}

export default MapLoader
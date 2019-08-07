import React, { useRef } from 'react'
import GoogleMap from '../GoogleMap'
import { useNodeRefConstructor } from '../../../../helpers/hooks/use_node_ref_constructor';
/**
 * This component handles rendering the GoogleMap,
 * which is basically a set of listeners
 */
const defaultOptions = {};

function OnMapLoad({
  center,
  containerProps,
  options = defaultOptions,
  ...rest
}) {
  const initialZoom = useRef(options.zoom)
  const initialCenter = useRef(options.center)

  const [mapRef, map] = useNodeRefConstructor(
    window.google.maps.Map,
    { zoom: initialZoom.current,
      center: initialCenter.current
    }
  )
  return (
    <div ref={mapRef} {...containerProps}>
      { map ?
        <GoogleMap map={map}
          center={center}
          options={options}
          {...rest}
        />
      : null }
    </div>
  )
}



export default OnMapLoad
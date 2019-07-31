import React from 'react'
import { useScript } from '../../helpers/hooks/use_script'
import MapLoader from './MapLoader'

/**
 * This component loads the google maps script and renders
 * the map loader which uses objects from the script.
 */
function ScriptLoader({
  url,
  ...rest
}) {
  const isScriptLoaded = useScript(url, window.google && window.google.maps)
  return isScriptLoaded ? 
    <MapLoader {...rest} />
  : null
}

export default ScriptLoader
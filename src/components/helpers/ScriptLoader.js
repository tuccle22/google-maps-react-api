import React from 'react'
import { useScript } from '../../helpers/hooks/use_script'

/**
 * This component loads the google maps script and renders
 * the map loader which uses objects from the script.
 */
function ScriptLoader({
  url,
  loadingElement = null,
  isAlreadyLoaded,
  Element,
  ...rest
}) {
  const isScriptLoaded = useScript(url, isAlreadyLoaded)
  return isScriptLoaded ? 
    <Element loadingElement={loadingElement} {...rest} />
    : loadingElement
}
export default ScriptLoader
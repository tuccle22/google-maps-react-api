import React from 'react'
import { useScript } from '../../../../helpers/hooks/use_script';
import GoogleMap from '../GoogleMap';

function LoadMap({
  url,
  loadingElement = null,
  ...rest
}) {
  const isLoaded = useScript(url, !!(window.google && window.google.maps))
  return isLoaded ? <GoogleMap {...rest} /> : loadingElement
}

export default LoadMap
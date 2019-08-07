import React, { useMemo } from 'react'
import ScriptLoader from '../../../helpers/ScriptLoader';
import OnMapLoad from './OnMapLoad'

function LoadMap({
  url,
  ...rest
}) {
  const isAlreadyLoaded = useMemo(() => {
    return !!(window.google && window.google.maps)
  }, [])
  return (
    <ScriptLoader url={url}
      Element={OnMapLoad}
      isAlreadyLoaded={isAlreadyLoaded}
      {...rest}
    />
  )
}

export default LoadMap
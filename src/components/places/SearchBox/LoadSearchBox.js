import React, { useMemo } from 'react'
import ScriptLoader from '../../helpers/ScriptLoader';
import SearchBox from './SearchBox';

function LoadSearchBox({
  url,
  ...rest
}) {
  const isAlreadyLoaded = useMemo(() => {
    return !!(window.google && window.google.maps && window.google.maps.places)
  }, [])
  if (url) {
    return (
      <ScriptLoader {...rest} url={url}
        isAlreadyLoaded={isAlreadyLoaded}
        Element={SearchBox}
      />
    )
  } else if (isAlreadyLoaded) {
    return (
      <SearchBox {...rest} />
    )
  }
  return null
}

export default LoadSearchBox
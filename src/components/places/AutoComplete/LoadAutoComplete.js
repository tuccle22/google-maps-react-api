import React, { useMemo } from 'react'
import ScriptLoader from '../../helpers/ScriptLoader';
import AutoComplete from './AutoComplete';

function LoadAutoComplete({
  url,
  ...rest
}) {
  const isAlreadyLoaded = useMemo(() => {
    return !!(window.google && window.google.maps && window.google.maps.places)
  }, [])
  if (url) {
    return (
      <ScriptLoader {...rest} url={url}
        Element={AutoComplete}
        isAlreadyLoaded={isAlreadyLoaded}
      />
    )
  } else if (isAlreadyLoaded) {
    return (
      <AutoComplete {...rest} />
    )
  }
  return null
}

export default LoadAutoComplete
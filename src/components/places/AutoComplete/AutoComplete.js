import React, { Fragment as _ } from 'react'
import { useSetOptions, useMapListener } from '../../../helpers/hooks/map_hooks';
import { useNodeRefConstructor } from '../../../helpers/hooks/use_node_ref_constructor';

const AUTO_COMPLETE_EVENT = 'place_changed'

function AutoComplete({
  options,
  onPlaceChanged,
  ...rest
}) {
  const [ref, autoComplete] = useNodeRefConstructor(
    window.google.maps.places.Autocomplete
  )
  return (
    <_>
      <input ref={ref} {...rest} />
      { autoComplete ? 
        <OnAutoComplete
          options={options}
          autoComplete={autoComplete} 
          onPlaceChanged={onPlaceChanged} />
      : null }
    </_>
  )
}

function OnAutoComplete({autoComplete, options, onPlaceChanged}) {
  useSetOptions(autoComplete, options)
  useMapListener(autoComplete, onPlaceChanged, AUTO_COMPLETE_EVENT)
}

export default AutoComplete
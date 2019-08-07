import React, { Fragment as _ } from 'react'
import { SetOptions, AddMapListener } from '../../../helpers/hooks/map_hooks';
import { useNodeRefConstructor } from '../../../helpers/hooks/use_node_ref_constructor';

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
        <_>
          <SetOptions obj={autoComplete} opts={options} />
          <AddMapListener
            obj={autoComplete}
            func={onPlaceChanged}
            event='place_changed'
          />
        </_>
      : null }
    </_>
  )
}

export default AutoComplete
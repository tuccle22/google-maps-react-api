import React, { Fragment as _ } from 'react'
import { useNodeRefConstructor } from '../../../helpers/hooks/use_node_ref_constructor';
import { SetOptions, AddMapListener } from '../../../helpers/hooks/map_hooks';

function SearchBox({
  options,
  onPlaceChanged,
  ...rest
}) {
  const [ref, searchBox] = useNodeRefConstructor(
    window.google.maps.places.SearchBox
  )
  return (
    <_>
      <input ref={ref} {...rest} />
      { searchBox ?
        <_>
          <SetOptions obj={searchBox} opts={options} />
          <AddMapListener
            obj={searchBox}
            func={onPlaceChanged}
            event='place_changed'
          />
        </_>
      : null }
    </_>
  )
}

export default SearchBox
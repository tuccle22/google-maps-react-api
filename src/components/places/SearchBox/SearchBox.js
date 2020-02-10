import React, { Fragment as _ } from 'react'
import { useNodeRefConstructor } from '../../../helpers/hooks/use_node_ref_constructor';
import { useSetOptions, useMapListener } from '../../../helpers/hooks/map_hooks';

const SEARCH_BOX_EVENT = 'place_changed'

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
        <OnSearchBox 
          options={options}  
          searchBox={searchBox}
          onPlaceChanged={onPlaceChanged}
        />
      : null }
    </_>
  )
}

function OnSearchBox({searchBox, options, onPlaceChanged}) {
  useSetOptions(searchBox, options)
  useMapListener(searchBox, onPlaceChanged, SEARCH_BOX_EVENT)
}

export default SearchBox
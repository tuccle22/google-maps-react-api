import React, { Fragment as _ } from 'react'
import { SetOptions, AddMapListener, useSetOptions, useMapListener } from '../../../helpers/hooks/map_hooks';
import { useNodeRefConstructor } from '../../../helpers/hooks/use_node_ref_constructor';

function StreetViewPanorama({
  options,
  onCloseClick,
  onPanoramaChanged,
  onPositionChanged,
  onPovChanged,
  onResize,
  onStatusChanged,
  onVisibleChanged,
  onZoomChanged,
  ...rest
}) {

  const [ref, streetViewPanorama] = useNodeRefConstructor(
    window.google.maps.StreetViewPanorama
  );

  return (
    <div ref={ref} {...rest}>
      { streetViewPanorama ? 
        <_>
          <SetOptions obj={streetViewPanorama} opts={options} />
          <AddMapListener obj={streetViewPanorama} func={onCloseClick} event={'closeclick'} />
          <AddMapListener obj={onPanoramaChanged} func={onCloseClick} event={'pano_changed'} />
          <AddMapListener obj={onPositionChanged} func={onCloseClick} event={'position_changed'} />
          <AddMapListener obj={onPovChanged} func={onCloseClick} event={'pov_changed'} />
          <AddMapListener obj={onResize} func={onCloseClick} event={'resive'} />
          <AddMapListener obj={onStatusChanged} func={onCloseClick} event={'status_changed'} />
          <AddMapListener obj={onVisibleChanged} func={onCloseClick} event={'visible_changed'} />
          <AddMapListener obj={onZoomChanged} func={onCloseClick} event={'zoom_changed'} />
        </_>
      : null }
    </div>
  )
}

export default StreetViewPanorama
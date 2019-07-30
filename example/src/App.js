import React, { useState, useReducer, useCallback } from 'react'
import {
  GoogleMap,
  Marker, 
  Clusterer,
  Circle,
  InfoWindow,
  OverlayView,
  Polygon,
  DrawingManager,
  getLatLng
} from 'google-maps-react-api'
import { googleMapsApiKey } from './keys'
import { useInterval } from './helpers/utils'
import { useMarkerHover, useClusterHover, usePolygonHover, reducer, initState } from './state'
const GoogleMapsBase = 'https://maps.googleapis.com/maps/api/js'
const fullUrl = `${GoogleMapsBase}?key=${googleMapsApiKey}&libraries=geometry,drawing`

const markers = Array(1000).fill(0).map((_, i) => {
  const lat = Math.random() * 360 - 180
  const lng = Math.random() * 360 - 180
  return ({ key: i, center: { lat, lng } })
})

const triangleCoords = [
  { lat: 25.774, lng: -80.190 },
  { lat: 18.466, lng: -66.118 },
  { lat: 32.321, lng: -64.757 }
];

const bermudaTriangleOpts = {
  paths: triangleCoords,
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 3,
  fillColor: '#FF0000',
  fillOpacity: 0.35
}


function App() {

  const [state, dispatch] = useReducer(reducer, initState)

  const [onMarkerMouseOver, onMarkerMouseOut] = useMarkerHover(dispatch)
  const [onClusterMouseOver, onClusterMouseOut] = useClusterHover(dispatch)
  const [onPolygonMouseOver, onPolygonMouseOut] = usePolygonHover(dispatch)


  const onClusterClick = useCallback((e, cluster) => {
    dispatch({ type: 'HIDE_INFO_WINDOW' })
  }, [])

  const onMarkerClick = useCallback((e, marker) => {
    dispatch({
      type: 'GO_TO_CENTER',
      payload: getLatLng(marker.getPosition())
    })
  }, [])

  const {
    center,
    zoom,
    bounds,
    infoWindowProps,
  } = state

  return (
    <GoogleMap url={fullUrl}
      zoom={zoom}
      bounds={bounds}
      containerProps={{ style: { width: '100%', height: '100vh' } }}
      center={center}>
      <Clusterer gridSize={100}
        onClick={onClusterClick}
        onMouseOver={onClusterMouseOver}
        onMouseOut={onClusterMouseOut}>
        {markers.map(props =>
          <Marker onClick={onMarkerClick}
            onMouseOver={onMarkerMouseOver} onMouseOut={onMarkerMouseOut}
            {...props}>
            <Circle radius={10000} />
          </Marker>
        )}
      </Clusterer>
      <Polygon paths={triangleCoords}
        options={bermudaTriangleOpts}
        onMouseOver={onPolygonMouseOver}
        onMouseOut={onPolygonMouseOut}
      />

      {infoWindowProps ?
        <InfoWindow {...infoWindowProps}>
          <Counting />
        </InfoWindow >
        : null
      }

      <OverlayView center={{ lat: 45, lng: -45 }}>
        <Counting />
      </OverlayView>
      <DrawingManager />
    </GoogleMap>
  );
}

export default App;


function Counting() {
  const [count, increaseCount] = useState(1)
  useInterval(() => {
    increaseCount(count + 1)
  }, 1000)
  return <div>Hello World <b>{count}</b></div>
}
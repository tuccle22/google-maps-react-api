### InfoWindow
##### https://developers.google.com/maps/documentation/javascript/reference/info-window
InfoWindow Example

#### InfoWindow - center
```jsx
import { GoogleMap, InfoWindow } from 'google-maps-react-api';

function MapWithInfoWindow() {
  return (
    <GoogleMap {...googleMapProps}>
      <InfoWindow center={{lat: 45 lng: -45}}>
        Hello World!
      </InfoWindow>
    </GoogleMap>
  );
}
```

#### InfoWindow - `Marker` || `Polygon`
The `InfoWindow` can be positioned according to the `Marker` component. Note: It may be more performant to use a single InfoWindow passing in a `center` or an `anchor` prop if you only need to show one InfoWindow at a time, like when hovering on a marker.
```jsx
import { GoogleMap, InfoWindow, Marker } from 'google-maps-react-api';

function MapWithMarkerAndInfoWindow() {
  return (
    <GoogleMap {...googleMapProps}>
      <Marker {...markerProps}>
        <InfoWindow>
          Hello World!
        </InfoWindow>
      </Marker>
    </GoogleMap>
  );
}
```
#### InfoWindow Props

| Name                | Type           | Default Value | Required  |
| ------------------- | ---------------|---------------| --------- |
| anchor              | `Marker` instance |            | No        |
| center              | latLng Obj     |               | `!anchor` |
| children            | Node           |               | Yes       |
| options             | [Object](https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions)         |               | Yes       |     
| EVENTS              |                |               |           |
| onCloseClick    | Function       |               |           |
| onContentChanged    | Function       |               |           |
| onDomReady   | Function       |               |           |
| onPositionChanged  | Function       |               |           |
| onZIndexChanged  | Function       |               |           |
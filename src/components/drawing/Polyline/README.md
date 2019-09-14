### Polyline
##### https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline
Polygon Example

```jsx
import { GoogleMap, Polyline } from 'google-maps-react-api';

const flightPlanCoordinates = [
  { lat: 37.772, lng: -122.214 },
  { lat: 21.291, lng: -157.821 },
  { lat: -18.142, lng: 178.431 },
  { lat: -27.467, lng: 153.027 }
];
const polylineOpts = {
  path: flightPlanCoordinates,
  geodesic: true,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2
};

function MapWithPolyline() {
  return (
    <GoogleMap {...googleMapProps}>
      <Polyline options={bermudaTriangleOpts} />
    </GoogleMap>
  );
}
```
Polyline Props

| Name                | Type           | Default Value | Required  |
| ------------------- | ---------------|---------------| --------- |
| options             | [Object](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolylineOptions)         |               | Yes       |     
| EVENTS              |                |               |           |
| onClick             | Function       |               | No        |
| onDblClick          | Function       |               | No        |
| onDrag              | Function       |               | No        |
| onDragEnd           | Function       |               | No        |
| onDragStart         | Function       |               | No        |
| onMouseDown         | Function       |               | No        |
| onMouseOut          | Function       |               | No        |
| onMouseOver         | Function       |               | No        |
| onMouseUp           | Function       |               | No        |
### Polygon
##### https://developers.google.com/maps/documentation/javascript/reference/polygon#Polygon
Polygon Example

```jsx
import { GoogleMap, Polygon } from 'google-maps-react-api';

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
};

function MapWithPolygon() {
  return (
    <GoogleMap {...googleMapProps}>
      <Polygon options={bermudaTriangleOpts} />
    </GoogleMap>
  );
}
```
Polygon Props

| Name                | Type           | Default Value | Required  |
| ------------------- | ---------------|---------------| --------- |
| options             | [Object](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolygonOptions)         |               | Yes       |     
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
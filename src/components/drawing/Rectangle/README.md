### Rectangle
##### https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle
Polygon Example

```jsx
import { GoogleMap, Rectangle } from 'google-maps-react-api';

const rectangleOpts = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  bounds: {
    north: 33.685,
    south: 33.671,
    east: -116.234,
    west: -116.251
  }
};
function MapWithRectangle() {
  return (
    <GoogleMap {...googleMapProps}>
      <Rectangle options={rectangleOpts} />
    </GoogleMap>
  );
}
```
Rectangle Props

| Name                | Type           | Default Value | Required  |
| ------------------- | ---------------|---------------| --------- |
| options             | [Object](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolygonOptions)         |               | Yes       |     
| EVENTS              |                |               |           |
| onBoundsChanged             | Function       |               | No        |
| onClick             | Function       |               | No        |
| onDblClick          | Function       |               | No        |
| onDrag              | Function       |               | No        |
| onDragEnd           | Function       |               | No        |
| onDragStart         | Function       |               | No        |
| onMouseDown         | Function       |               | No        |
| onMouseMove          | Function       |               | No        |
| onMouseOut          | Function       |               | No        |
| onMouseOver         | Function       |               | No        |
| onMouseUp           | Function       |               | No        |
| onRightClick           | Function       |               | No        |
### Circle
##### https://developers.google.com/maps/documentation/javascript/reference/polygon#Circle
Circle Example

```jsx
import { GoogleMap, Circle } from 'google-maps-react-api';

const options = { radius: 500 };
const center = { lat: 45, lng: -45 };
function MapWithCircle() {
  return (
    <GoogleMap {...googleMapProps}>
      <Circle center={center}
        options={options}
      />
    </GoogleMap>
  );
}
````
#### Circle Props

| Name                | Type           | Default Value | Required  |
| ------------------- | ---------------|---------------| --------- |
| center              | latLng Obj     |               | Yes       |
| options             | [Object](https://developers.google.com/maps/documentation/javascript/reference/polygon#CircleOptions)         |               | radius property        |     
| EVENTS              |                |               |           |
| onCenterChanged     | Function       |               | No        |
| onClick             | Function       |               | No        |
| onDblClick          | Function       |               | No        |
| onDrag              | Function       |               | No        |
| onDragEnd           | Function       |               | No        |
| onDragStart         | Function       |               | No        |
| onMouseDown         | Function       |               | No        |
| onMouseMove         | Function       |               | No        |
| onMouseOut          | Function       |               | No        |
| onMouseOver         | Function       |               | No        |
| onMouseUp           | Function       |               | No        |
| onRadiusChanged     | Function       |               | No        |
| onRightClick        | Function       |               | No        |

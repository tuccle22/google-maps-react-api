### Marker
##### https://developers.google.com/maps/documentation/javascript/reference/marker

Marker Example

```jsx
import { GoogleMap, Marker } from 'google-maps-react-api';

function MapWithMarker() {
  return (
    <GoogleMap {...googleMapProps}>
      <Marker center={{lat: 45, lng: -45}} />
    </GoogleMap>
  );
}
```
#### Marker with Circle
```jsx
import { GoogleMap, Marker, Circle } from 'google-maps-react-api';

const options = { radius: 500 };
function MapWithMarkerAndCircle() {
  return (
    <GoogleMap {...googleMapProps}>
      <Marker {...markerProps}>
        <Circle options={options} />
      </Marker>
    </GoogleMap>
  );
}
```
Marker Props

| Name                | Type           | Default Value | Required  |
| ------------------- | ---------------|---------------| --------- |
| center              | latLng Obj     |               | Yes       |
| children            | `Circle` `InfoWindow` |               | No        |
| options             | [Object](https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions)         |               | Yes       |     
| noRedraw (when clustering)            | Number         |               | No        |
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

</details>
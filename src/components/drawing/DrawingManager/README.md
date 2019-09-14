### DrawingManager
##### https://developers.google.com/maps/documentation/javascript/reference/drawing#DrawingManager
DrawingManager Example
```jsx
import { GoogleMap, DrawingManager } from 'google-maps-react-api';

function MapWithDrawingManager() {
  return (
    <GoogleMap {...googleMapProps}>
      <DrawingManager />
    </GoogleMap>
  );
}
```
#### DrawingManager Props

| Name                | Type           | Default Value | Required  |
| ------------------- | ---------------|---------------| --------- |
| options             | [Object](https://developers.google.com/maps/documentation/javascript/reference/drawing#DrawingManagerOptions)         |               | No        |     
| EVENTS              |                |               |           |
| onCircleComplete    | Function       |               |           |
| onMarkerComplete    | Function       |               |           |
| onOverlayComplete   | Function       |               |           |
| onPolyLineComplete  | Function       |               |           |
| onPolyLineComplete  | Function       |               |           |
| onRectangleComplete | Function       |               |           |
</details>
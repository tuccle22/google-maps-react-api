### OverlayView
##### https://developers.google.com/maps/documentation/javascript/reference/overlay-view#OverlayView
OverlayView Example

```jsx
import { GoogleMap, OverlayView } from 'google-maps-react-api';

function MapWithOverlayView() {
  return (
    <GoogleMap {...googleMapProps}>
      <OverlayView center={{lat: 45, lng: -45}}>
        Hello World!
      </OverlayView>
    </GoogleMap>
  );
}
```

OverlayView Props

| Name                | Type           | Default Value | Required  |
| ------------------- | ---------------|---------------| --------- |
| center              | latLng Obj     |               | Yes |
| children            | Node (single)  |               | Yes       |
| className           | String         |               | No        |
| style               | Object (need to fix)         |               |           |
| pane               | String         | `'floatPane'`              |           |
Static Properties
| Property            | Value |
| ------------------- | ---------------|
| `floatPane`          | `'floatPane'`         |
| `mapPane`            | `'mapPane'`         |
| `markerLayer`        | `'markerLayer'`         |
| `overlayLayer`       | `'overlayLayer'`         |
| `overlayMouseTarget` | `'overlayMouseTarget'`         |
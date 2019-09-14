### GoogleMap
##### https://developers.google.com/maps/documentation/javascript/reference/map

```jsx
import { GoogleMap } from 'google-maps-react-api';

const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry,drawing`;
const containerStyle = {style: {width: '100%', height: '100vh'}};
const center = {lat: 45, lng: -45};
const options = {zoom: 3};

function SimpleMap() {
  return (
    <GoogleMap url={url}
      center={center}
      options={options}
      containerProps={containerStyle}
    />
  );
}
```
#### GoogleMap Props

| Name                | Type           | Default Value | Required   |
| ------------------- | -------------- | ------------- | ---------- |
| center              | latLng Obj     |               | Yes        |
| containerProps      | Object         |               | Yes        |
| children            | `google-maps-react-api` components |               | No         |
| options             | [Object](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions)         |               | zoom property         |
| loadingElement      | Node           |  `null`       | No         |
| url                 | String         |               | Yes        |
| EVENTS              |                |               |            |
| onBoundsChanged     | Function       |               | No         |
| onCenterChanged     | Function       |               | No         |
| onClick             | Function       |               | No         |
| onDblClick          | Function       |               | No         |
| onDrag              | Function       |               | No         |
| onDragEnd           | Function       |               | No         |
| onDragStart         | Function       |               | No         |
| onHeadingChanged    | Function       |               | No         |
| onIdle              | Function       |               | No         |
| onMapTypeIdChanged  | Function       |               | No         |
| onMouseMove         | Function       |               | No         |
| onMouseOut          | Function       |               | No         |
| onMouseOver         | Function       |               | No         |
| onProjectionChanged | Function       |               | No         |
| onRightClick        | Function       |               | No         |
| onTilesLoaded       | Function       |               | No         |
| onTiltChanged       | Function       |               | No         |
| onZoomChanged       | Function       |               | No         |
</details>

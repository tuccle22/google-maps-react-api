# google-maps-react-api

> A declarative react api for google maps

[![NPM](https://img.shields.io/npm/v/google-maps-react-api.svg)](https://www.npmjs.com/package/google-maps-react-api) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install (not published yet)

```bash
npm install --save google-maps-react-api
yarn add google-maps-react-api
```

<details><summary>Motivations behind this api</summary>

This api aims to solve a problem where `prop` "changes" don't produce the intended effect. Imagine the following scenario:

1. You create a `SimpleMap` component with a few buttons that also has a `GoogleMap` component with a `zoom` prop that takes a `number` and looks like the following:
```jsx
// this is not the real api
function SimpleMap({...otherProps}) {
  const [zoom, setZoom] = useState(3);
  return (
    <React.Fragment>
      <GoogleMap zoom={zoom} {...otherProps} />
      <button onClick={() => setZoom(5)}>Set Zoom to 5</button>
    </React.Fragment>
  );
}
```
2. The map is initially set to a `zoom` level of `3`. Click the button and the map zooms in to level `5`.
3. Now zoom the map using the scroll wheel to zoom in to level 10.
4. Click the button once more. The expectation is that the map would zoom back to level `5`, but how could the `GoogleMap` component handle this change? From the `GoogleMap` component's perspective, it has received the same `zoom` prop value twice, as it has no awareness of the scroll wheel zooming. 
```js
Object.is(5, 5) === true // Object.is is the algorithm react uses to compae
```
#### Solution
The answer to this problem is to pass an `object` as props, because:
```js
Object.is({}, {}) === false
```
With this in mind, consider if the `SimpleMap` component used a `GoogleMap` component that accepts an `options` prop of an `object` like this:
```jsx
// mapRef is not a real prop on the GoogleMap component in this library
function SimpleMap({...otherProps}) {
  const [options, setOptions] = useState({zoom: 3});
  return (
    <React.Fragment>
      <GoogleMap options={options} {...otherProps} />
      <button onClick={() => setZoom(5)}>Set Zoom to 5</button>
    </React.Fragment>
  );
}
```
This will handle the previously outlined steps, and our expectations, correctly. Fortunately, the google maps v3 api handles both `map.setZoom` as well as `map.setOptions` functions.

</details>

## Usage

<details><summary>API in General</summary>

#### center - `{ lat: number, lng: number }`
All components that are positioned on the map accepts this prop.

#### options - `{ ..opts }`
All `google.maps` objects that implement setOptions accepts this prop. Only pass in the options that you want to update, instead of all the properties that describe the option.

#### events
Along with any `event` passed back from the google maps v3 api, a reference to the underlying `google.maps` object is returned. This is the hook that handles the events:
```js
function useMapListener(mapObj, func, event) {
  useEffect(() => {
    if (mapObj && func) {
      const enhancedFunc = (...e) => func(...e, mapObj)
      const listener = mapObj.addListener(event, enhancedFunc)
      return () => window.google.maps.event.removeListener(listener)
    }
  }, [mapObj, func, event])
}
```
</details>

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
<details><summary>GoogleMap Props</summary>

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

### Marker
##### https://developers.google.com/maps/documentation/javascript/reference/marker

<details><summary>Marker Example</summary>

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
</details>
<details><summary>Marker Props</summary>

| Name                | Type           | Default Value | Required  |
| ------------------- | ---------------|---------------| --------- |
| center              | latLng Obj     |               | Yes       |
| children            | `Circle` `InfoWindow` |               | No        |
| options             | [Object](https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions)         |               | Yes       |     
| noRedraw            | Number         |               | No        |
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


### Polygon
##### https://developers.google.com/maps/documentation/javascript/reference/polygon#Polygon
<details><summary>Polygon Example</summary>

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
</details>
<details><summary>Polygon Props</summary>

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
</details>

### InfoWindow
##### https://developers.google.com/maps/documentation/javascript/reference/info-window
<details><summary>InfoWindow Example</summary>

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
The `InfoWindow` can be positioned according to either the `Marker` or `Polygon` component. Note: It may be more performant to use a single InfoWindow passing in a `center` or an `anchor` prop if you only need to show one InfoWindow at a time, such while hovering on a marker.
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
</details>
<details><summary>InfoWindow Props</summary>

| Name                | Type           | Default Value | Required  |
| ------------------- | ---------------|---------------| --------- |
| anchor              | `Marker` instance |            | No        |
| center              | latLng Obj     |               | `!anchor` |
| children            | Node           |               | Yes       |
| options             | [Object](https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions)         |               | Yes       |     
| EVENTS              |                |               |           |
</details>

### Circle
##### https://developers.google.com/maps/documentation/javascript/reference/polygon#Circle
<details><summary>Circle Example</summary>

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
```

#### Circle - `Marker`
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
</details>
<details><summary>Circle Props</summary>

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

</details>

### DrawingManager
##### https://developers.google.com/maps/documentation/javascript/reference/drawing#DrawingManager
<details><summary>DrawingManager Example</summary>

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
</details>
<details><summary>DrawingManager Props</summary>

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

### OverlayView
##### https://developers.google.com/maps/documentation/javascript/reference/overlay-view#OverlayView
<details><summary>OverlayView Example</summary>

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

#### OverlayView - `Polygon`
```jsx
import { GoogleMap, OverlayView } from 'google-maps-react-api';

function MapWithPolygonAndOverlayView() {
  return (
    <GoogleMap {...googleMapProps}>
      <Polygon {...polygonProps}>
        <OverlayView>
          Hello World!
        </OverlayView>
      </Polygon>
    </GoogleMap>
  );
}
```
</details>
<details><summary>OverlayView Props</summary>

| Name                | Type           | Default Value | Required  |
| ------------------- | ---------------|---------------| --------- |
| center              | latLng Obj     |               | `!Polygon` child |
| children            | Node (single)  |               | Yes       |
| className           | String         |               | No        |
| style               | Object         |               |           |
</details>

### Clusterer
##### https://github.com/googlemaps/v3-utility-library/tree/master/markerclustererplus
<details><summary>Clusterer Example</summary>

For performance reasons, when a `Circle` is a child of a `Marker` and that `Marker` is a child of a `Clusterer`, the `Circle` is removed from the map when its `Marker` is clustered.
```jsx
import { GoogleMap, Marker, Clusterer } from 'google-maps-react-api';

const markers = Array(1).fill(0).map((_, i) => {
  const lat = Math.random() * 360 - 180;
  const lng = Math.random() * 360 - 180;
  return ({ key: i, center: { lat, lng } });
});

function MapWithClusteringMarkers() {
  return (
    <GoogleMap {...googleMapProps}>
      <Clusterer>
        { markers.map(m =>
          <Marker {...m} />
        )}
      </Clusterer>
    </GoogleMap>
  )
}
```
</details>
<details><summary>Clusterer Props</summary>

| Name                | Type           | Default Value | Required  |
| ------------------- | ---------------|---------------| --------- |
| children            | `Marker[]`     |               | Yes       |
| averageCenter       | String         | `false`       | No        |
| batchSize           | Number         |               | No        |
| batchSizeIE         | Number         |               | No        |
| calculator          | Function       |               | No        |
| clusterClass        | String         |               | No        |
| enableRetinaIcons   | Boolean        | `false`       | No        |
| gridSize            | Number         | `60`          | No        |
| ignoreHidden        | Boolean        | `false`       | No        |
| imageExtension      | String         |               | No        |
| imagePath           | String         |               | No        |
| imageSizes          | Array          |               | No        |
| maxZoom             | Number         |               | No        |
| minimumClusterSize  | Number         | `2`           | No        |
| styles              | Array          |               | No        |
| title               | String         |               | No        |
| zoomOnClick         | Boolean        |               | No        |
</details>

## Local Development

This library was bootstrapped using [`create-react-library`](https://github.com/transitive-bullshit/create-react-library). For more information about local development, look to that library. Simply put, for local development do the following:
1. `git clone https://github.com/tuccle22/google-maps-react-api.git`
2. `cd google-maps-react-api`
3. `yarn start` - this builds the library
4. `cd example`
5. create a `keys.js` file in the `src` directory which exports a named constant of `googleMapsApiKey`.

...example/src/keys.js
```jsx
export const googleMapsApiKey = 'google-maps-api-key';
```
6. `yarn start` - this starts the web server of the example code

## License

MIT © [tuccle22](https://github.com/tuccle22)

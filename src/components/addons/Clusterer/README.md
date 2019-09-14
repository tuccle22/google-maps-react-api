### Clusterer
##### https://github.com/googlemaps/v3-utility-library/tree/master/markerclustererplus


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
#### Clusterer Props

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
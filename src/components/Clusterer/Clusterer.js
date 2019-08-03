import React, { useEffect, createContext, useContext } from 'react'
import MarkerClusterer from '@google/markerclustererplus'
import { useMap } from '../GoogleMap/GoogleMap'
import { useCallbackRef } from '../../helpers/hooks/use_callback_ref'
import { useMapListener } from '../../helpers/hooks/map_hooks'
import { useSetClusterer } from './helpers'
import { clustererEvents } from './ClustererEvents';
/**
 * Clusterer Context for sharing the clusterer instance
 */
const ClustererContext = createContext()
function useClusterer() {
  return useContext(ClustererContext)
}
/**
 * Full API Coverage, i think
 */
function Clusterer({
  children,
  // clusterer properties
  averageCenter,
  batchSizeIE,
  calculator,
  clusterClass,
  enableRetinaIcons,
  gridSize,
  ignoreHidden,
  imageExtension,
  imagePath,
  imageSizes,
  maxZoom,
  minimumClusterSize,
  styles,
  title,
  zoomOnClick,
  // events
  ...events
}) {
  const map = useMap()

  // create the clusterer
  const clusterer = useCallbackRef(() =>
    new MarkerClusterer(map, [])
  )

  // SET PROPERTIES
  useSetClusterer(clusterer, styles, 'setStyles',)
  useSetClusterer(clusterer, batchSizeIE, 'setBatchSizeIE')
  useSetClusterer(clusterer, averageCenter, 'setAverageCenter')
  useSetClusterer(clusterer, calculator, 'setCalculator')
  useSetClusterer(clusterer, clusterClass, 'setClusterClass')
  useSetClusterer(clusterer, enableRetinaIcons, 'setEnableRetinaIcons')
  useSetClusterer(clusterer, gridSize, 'setGridSize')
  useSetClusterer(clusterer, ignoreHidden, 'setIgnoreHidden')
  useSetClusterer(clusterer, imageExtension, 'setImageExtension')
  useSetClusterer(clusterer, imagePath, 'setImagePath')
  useSetClusterer(clusterer, imageSizes, 'setImageSizes')
  useSetClusterer(clusterer, maxZoom, 'setMaxZoom')
  useSetClusterer(clusterer, minimumClusterSize, 'setMinimumClusterSize')
  useSetClusterer(clusterer, styles, 'setStyles')
  useSetClusterer(clusterer, title, 'setTitle')
  useSetClusterer(clusterer, zoomOnClick, 'setZoomOnClick')

  // EVENT LISTENERS
  for (let i = 0; i < events.length; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMapListener(clusterer, ...events[clustererEvents[i]])
  }

  // handles unmounting
  useEffect(() => () => clusterer.setMap(null), [clusterer])
  return (
    <ClustererContext.Provider value={clusterer}>
      {children}
    </ClustererContext.Provider>
  )
}



export {
  useClusterer,
  Clusterer as default
}
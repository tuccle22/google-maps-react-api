import React, { useEffect } from 'react'
import { ClustererProvider } from '../../contexts/marker_clusterer/marker_clusterer_context'
import { useCallbackRef } from '../../helpers/hooks/use_callback_ref'
import { useMap } from '../../contexts/map/map_context'
import MarkerClusterer from '@google/markerclustererplus'
import { useMapListener } from '../../helpers/hooks/map_hooks'
import { useSetClusterer } from './helpers'

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
  // clusterer event listeners
  onClick,
  onClusteringBegin,
  onClusteringEnd,
  onMouseOut,
  onMouseOver
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
  useMapListener(clusterer, onClick, 'click')
  useMapListener(clusterer, onClusteringBegin, 'clusteringbegin')
  useMapListener(clusterer, onClusteringEnd, 'clusteringend')
  useMapListener(clusterer, onMouseOver, 'mouseover')
  useMapListener(clusterer, onMouseOut, 'mouseout')

  // handles unmounting
  useEffect(() => () => clusterer.setMap(null), [clusterer])

  return (
    <ClustererProvider value={clusterer}>
      {children}
    </ClustererProvider>
  )
}



export default Clusterer
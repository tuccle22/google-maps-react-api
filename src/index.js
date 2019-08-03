// maps
import GoogleMap from './components/helpers/ScriptLoader'
// drawing
import Circle from './components/drawing/Circle/Circle'
import DrawingManager from './components/drawing/DrawingManager/DrawingManager'
import InfoWindow from './components/drawing/InfoWindow/InfoWindow'
import Marker from './components/drawing/Marker/Marker'
import OverlayView from './components/drawing/OverlayView/OverlayView'
import Polygon from './components/drawing/Polygon/Polygon'
// addons
import Clusterer from './components/addons/Clusterer/Clusterer'

// TODO: remove these
import { getLatLng, getPolygonCenter } from './helpers/utils/map_utils'

export {
  // helpers
  getLatLng,
  getPolygonCenter,
  // maps
  GoogleMap,
  // drawing
  Circle,
  DrawingManager,
  InfoWindow,
  Marker,
  OverlayView,
  Polygon,
  // addons
  Clusterer
}
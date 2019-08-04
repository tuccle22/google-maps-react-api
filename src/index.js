// maps
import BicyclingLayer from './components/maps/BicyclingLayer/BicyclingLayer'
import GoogleMap from './components/helpers/ScriptLoader'
import TrafficLayer from './components/maps/TrafficLayer/TrafficLayer'
import TransitLayer from './components/maps/TransitLayer/TransitLayer'
// drawing
import Circle from './components/drawing/Circle/Circle'
import DrawingManager from './components/drawing/DrawingManager/DrawingManager'
import InfoWindow from './components/drawing/InfoWindow/InfoWindow'
import Marker from './components/drawing/Marker/Marker'
import OverlayView from './components/drawing/OverlayView/OverlayView'
import Polygon from './components/drawing/Polygon/Polygon'
import Polyline from './components/drawing/Polyline/Polyline'
import Rectangle from './components/drawing/Rectangle/Rectangle'
// addons
import Clusterer from './components/addons/Clusterer/Clusterer'

// TODO: remove these
import { getLatLng, getPolygonCenter } from './helpers/utils/map_utils'

export {
  // helpers
  getLatLng,
  getPolygonCenter,
  // maps
  BicyclingLayer,
  GoogleMap,
  TrafficLayer,
  TransitLayer,
  // drawing
  Circle,
  DrawingManager,
  InfoWindow,
  Marker,
  OverlayView,
  Polygon,
  Polyline,
  Rectangle,
  // addons
  Clusterer
}
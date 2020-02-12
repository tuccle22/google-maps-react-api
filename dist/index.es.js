import React, { useEffect, useCallback, useState, Fragment, createContext, useContext, useRef, Children, useMemo, memo } from 'react';
import MarkerClusterer from '@google/markerclustererplus';
import { createPortal } from 'react-dom';

function useSetOptions(mapObj, opts) {
  useEffect(function () {
    mapObj.setOptions(opts);
  }, [mapObj, opts]);
}

function SetOptions(_ref) {
  var obj = _ref.obj,
      opts = _ref.opts;

  useSetOptions(obj, opts);
  return null;
}

function SetOption(_ref2) {
  var obj = _ref2.obj,
      func = _ref2.func,
      args = _ref2.args;

  useEffect(function () {
    obj[func](args);
  }, [obj, func, args]);
  return null;
}

function useMapListener(mapObj, func, event) {
  useEffect(function () {
    // function that passes back all event and the mapObj itself
    var enhancedFunc = function enhancedFunc() {
      for (var _len = arguments.length, e = Array(_len), _key = 0; _key < _len; _key++) {
        e[_key] = arguments[_key];
      }

      return func.apply(undefined, e.concat([mapObj]));
    };
    var listener = mapObj.addListener(event, enhancedFunc);
    return function () {
      return window.google.maps.event.removeListener(listener);
    };
  }, [mapObj, func, event]);
}

function useMapListenerOnce(mapObj, func, event) {
  useEffect(function () {
    var enhancedFunc = function enhancedFunc() {
      for (var _len2 = arguments.length, e = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        e[_key2] = arguments[_key2];
      }

      return func.apply(undefined, e.concat([mapObj]));
    };
    mapObj.addListenerOnce(event, enhancedFunc);
    // according to documentation this listener removes itself,
    // but I wonder how it works if the listener never triggers
  }, [mapObj, func, event]);
}

function AddMapListener(_ref3) {
  var obj = _ref3.obj,
      func = _ref3.func,
      event = _ref3.event;

  useMapListener(obj, func, event);
  return null;
}

function useCreateMapListeners(mapObj, events, eventMapping) {
  return Object.keys(events).map(function (funcName) {
    function MapListener() {
      useMapListener(mapObj, events[funcName], eventMapping[funcName]);
    }
    return MapListener();
  });
}

var googleMapEvents = {
  onBoundsChanged: 'bounds_changed',
  onCenterChanged: 'center_changed',
  onClick: 'click',
  onDblClick: 'dblclick',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDragStart: 'dragstart',
  onHeadingChanged: 'heading_changed',
  onIdle: 'idle',
  onMapTypeIdChanged: 'maptypeid_changed',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onProjectionChanged: 'projection_changed',
  onRightClick: 'rightclick',
  onTilesLoaded: 'tilesloaded',
  onTiltChanged: 'tilt_changed',
  onZoomChanged: 'zoom_changed'
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/**
 * Creates a class instance that needs
 * a dom reference to instantiate the class
 * Returns an array of two values:
 * 1. Function - takes a dom ref
 * 2. classInstance - null on initial render
 * @param {Class} clazz
 * @param {Object} arg
 * @returns {Array} [refCallback, classInstance]
 */
function useNodeRefConstructor(clazz, arg) {
  var _useState = useState(null),
      _useState2 = slicedToArray(_useState, 2),
      inst = _useState2[0],
      setInst = _useState2[1];

  var ref = useCallback(function (node) {
    if (node) setInst(new clazz(node, arg));
    // this is a constructor
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inst];
}

/**
 * GoogleMap
 * https://developers.google.com/maps/documentation/javascript/reference/map
 */
function GoogleMap(_ref) {
  var bounds = _ref.bounds,
      center = _ref.center,
      children = _ref.children,
      options = _ref.options,
      containerProps = _ref.containerProps,
      events = objectWithoutProperties(_ref, ['bounds', 'center', 'children', 'options', 'containerProps']);

  var initialZoom = useRef(options.zoom);
  var initialCenter = useRef(options.center);

  var _useNodeRefConstructo = useNodeRefConstructor(window.google.maps.Map, { zoom: initialZoom.current,
    center: initialCenter.current
  }),
      _useNodeRefConstructo2 = slicedToArray(_useNodeRefConstructo, 2),
      mapRef = _useNodeRefConstructo2[0],
      map = _useNodeRefConstructo2[1];

  useCreateMapListeners(map, events, googleMapEvents);

  return React.createElement(
    Fragment,
    null,
    React.createElement('div', _extends({ ref: mapRef }, containerProps)),
    map ? React.createElement(
      Fragment,
      null,
      React.createElement(
        MapContext.Provider,
        { value: map },
        children
      ),
      React.createElement(SetOptions, { obj: map, opts: options }),
      React.createElement(SetOption, { obj: map, func: 'panTo', args: center }),
      bounds ? React.createElement(SetOption, { obj: map, func: 'fitBounds', args: bounds }) : null
    ) : null
  );
}
/**
 * Google Map Context for sharing the map instance
 */
var MapContext = createContext();
function useMap() {
  return useContext(MapContext);
}

function useAMapListener() {
  var map = useMap();
  if (!map) throw new Error('useMapEventListener is not used in a child component of GoogleMap');
  return map;
}

function useMapEventListener(event, func) {
  var map = useAMapListener();
  return useMapListener(map, func, event);
}
function useMapEventListenerOnce(event, func) {
  var map = useAMapListener();
  return useMapListenerOnce(map, func, event);
}

/**
 * I can't remember what lead me to use this pattern,
 * but just using useCallback doesn't work
 */
function useCallbackRef(func) {
  var ref = useRef(null);
  if (ref.current === null) {
    ref.current = func();
  }
  return ref.current;
}

function BicyclingLayer() {
  var map = useMap();
  var bicyclingLayer = useCallbackRef(function () {
    return new window.google.maps.BicyclingLayer();
  });
  useEffect(function () {
    bicyclingLayer.setMap(map);
    return function () {
      return bicyclingLayer.setMap(null);
    };
  }, [map, bicyclingLayer]);
  return null;
}

/**
 * useScript(someUrl, window.google && window.google.maps)
 * @param {string} url of the script
 * @param {boolean} a window object to determine whether 
 * the script needs to be loaded
 * @returns {boolean} returns a stateful value of whether
 * the status of the script loading
 */
function useScript(url, alreadyLoaded) {
  var _useState = useState(alreadyLoaded),
      _useState2 = slicedToArray(_useState, 2),
      isLoaded = _useState2[0],
      setIsLoaded = _useState2[1];

  useEffect(function () {
    // only mount script if passed in val doesn't exist
    if (!isLoaded) {
      var script = document.createElement('script');

      script.src = url;
      script.async = true;
      script.onload = function () {
        return setIsLoaded(true);
      };
      // add script to page
      document.head.appendChild(script);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return isLoaded;
}

function LoadMap(_ref) {
  var url = _ref.url,
      _ref$loadingElement = _ref.loadingElement,
      loadingElement = _ref$loadingElement === undefined ? null : _ref$loadingElement,
      rest = objectWithoutProperties(_ref, ['url', 'loadingElement']);

  var isLoaded = useScript(url, !!(window.google && window.google.maps));
  return isLoaded ? React.createElement(GoogleMap, rest) : loadingElement;
}

function TrafficLayer(_ref) {
  var options = _ref.options;

  var map = useMap();
  var trafficLayer = useCallbackRef(function () {
    return new window.google.maps.TrafficLayer();
  });
  useSetOptions(trafficLayer, options);
  useEffect(function () {
    trafficLayer.setMap(map);
    return function () {
      return trafficLayer.setMap(null);
    };
  }, [map, trafficLayer]);
  return null;
}

function TransitLayer() {
  var map = useMap();
  var transitLayer = useCallbackRef(function () {
    return new window.google.maps.TransitLayer();
  });
  useEffect(function () {
    transitLayer.setMap(map);
    return function () {
      return transitLayer.setMap(null);
    };
  }, [map, transitLayer]);
  return null;
}

function useSetClusterer(clusterer, val, setter) {
  useEffect(function () {
    if (val) clusterer[setter](val);
  }, [clusterer, val, setter]);
}

var clustererEvents = {
  onClick: 'click',
  onClusteringBegin: 'clusteringbegin',
  onClusteringEnd: 'clusteringend',
  onMouseOver: 'mouseover',
  onMouseOut: 'mouseout'
};

/**
 * Clusterer Context for sharing the clusterer instance
 */
var ClustererContext = createContext();
function useClusterer() {
  return useContext(ClustererContext);
}
/**
 * Clusterer
 * https://github.com/googlemaps/v3-utility-library/tree/master/markerclustererplus
 */
function Clusterer(_ref) {
  var children = _ref.children,
      averageCenter = _ref.averageCenter,
      batchSizeIE = _ref.batchSizeIE,
      calculator = _ref.calculator,
      clusterClass = _ref.clusterClass,
      enableRetinaIcons = _ref.enableRetinaIcons,
      gridSize = _ref.gridSize,
      ignoreHidden = _ref.ignoreHidden,
      imageExtension = _ref.imageExtension,
      imagePath = _ref.imagePath,
      imageSizes = _ref.imageSizes,
      maxZoom = _ref.maxZoom,
      minimumClusterSize = _ref.minimumClusterSize,
      styles = _ref.styles,
      title = _ref.title,
      zoomOnClick = _ref.zoomOnClick,
      events = objectWithoutProperties(_ref, ['children', 'averageCenter', 'batchSizeIE', 'calculator', 'clusterClass', 'enableRetinaIcons', 'gridSize', 'ignoreHidden', 'imageExtension', 'imagePath', 'imageSizes', 'maxZoom', 'minimumClusterSize', 'styles', 'title', 'zoomOnClick']);

  var map = useMap();

  // create the clusterer
  var clusterer = useCallbackRef(function () {
    return new MarkerClusterer(map, []);
  });

  // SET PROPERTIES
  useSetClusterer(clusterer, styles, 'setStyles');
  useSetClusterer(clusterer, batchSizeIE, 'setBatchSizeIE');
  useSetClusterer(clusterer, averageCenter, 'setAverageCenter');
  useSetClusterer(clusterer, calculator, 'setCalculator');
  useSetClusterer(clusterer, clusterClass, 'setClusterClass');
  useSetClusterer(clusterer, enableRetinaIcons, 'setEnableRetinaIcons');
  useSetClusterer(clusterer, gridSize, 'setGridSize');
  useSetClusterer(clusterer, ignoreHidden, 'setIgnoreHidden');
  useSetClusterer(clusterer, imageExtension, 'setImageExtension');
  useSetClusterer(clusterer, imagePath, 'setImagePath');
  useSetClusterer(clusterer, imageSizes, 'setImageSizes');
  useSetClusterer(clusterer, maxZoom, 'setMaxZoom');
  useSetClusterer(clusterer, minimumClusterSize, 'setMinimumClusterSize');
  useSetClusterer(clusterer, styles, 'setStyles');
  useSetClusterer(clusterer, title, 'setTitle');
  useSetClusterer(clusterer, zoomOnClick, 'setZoomOnClick');

  // handles unmounting
  useEffect(function () {
    return function () {
      return clusterer.setMap(null);
    };
  }, [clusterer]);
  useCreateMapListeners(clusterer, events, clustererEvents);
  return React.createElement(
    ClustererContext.Provider,
    { value: clusterer },
    children
  );
}

var markerEvents = {
  onAnimationChanged: 'animation_changed',
  onClick: 'click',
  onClickableChanged: 'clickable_changed',
  onCursorChanged: 'cursor_changed',
  onDblClick: 'dblclick',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDraggableChanged: 'draggable_changed',
  onDragStart: 'dragstart',
  onFlatChanged: 'flat_changed',
  onIconChanged: 'icon_changed',
  onMouseDown: 'mousedown',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onPositionChanged: 'position_changed',
  onRightClick: 'rightclick',
  onShapeChanged: 'shape_changed',
  onTitleChanged: 'title_changed',
  onVisibleChanged: 'visible_changed',
  onZIndexChanged: 'zindex_changed'
};

/**
 * Marker
 * https://developers.google.com/maps/documentation/javascript/reference/marker
 */
function Marker(_ref) {
  var center = _ref.center,
      children = _ref.children,
      options = _ref.options,
      noRedraw = _ref.noRedraw,
      events = objectWithoutProperties(_ref, ['center', 'children', 'options', 'noRedraw']);


  var map = useMap();
  var clusterer = useClusterer();

  // MARKER
  var marker = useCallbackRef(function () {
    return new window.google.maps.Marker();
  });

  // MARKER OPTIONS
  useSetOptions(marker, options);

  // CENTER
  useEffect(function () {
    marker.setPosition(center);
  }, [marker, center]);

  /**
  * MOUNTING / UNMOUNTING
  */
  useEffect(function () {
    if (clusterer) {
      clusterer.addMarker(marker, noRedraw);
      return function () {
        clusterer.removeMarker(marker, noRedraw);
        marker.setMap(null);
      };
    } else {
      marker.setMap(map);
      return function () {
        marker.setMap(null);
      };
    }
  }, [map, marker, clusterer, noRedraw]);
  useCreateMapListeners(marker, events, markerEvents);
  return React.createElement(
    MarkerContext.Provider,
    { value: marker },
    children
  );
}

/**
 * Marker Context for sharing the marker instance
 */
var MarkerContext = createContext();
function useMarker() {
  return useContext(MarkerContext);
}

var circleEvents = {
  onCenterChanged: 'bounds_changed',
  onClick: 'click',
  onDblClick: 'dblclick',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDragStart: 'dragstart',
  onMouseDown: 'mousedown',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onRadiusChagned: 'radius_changed',
  onRightClick: 'rightclick'
};

/**
 * Circle
 * https://developers.google.com/maps/documentation/javascript/reference/polygon#Circle
 */
function Circle(_ref) {
  var center = _ref.center,
      options = _ref.options,
      events = objectWithoutProperties(_ref, ['center', 'options']);

  var map = useMap();
  var marker = useMarker();

  // circle reference
  var circle = useCallbackRef(function () {
    return new window.google.maps.Circle();
  });

  // set circle options
  useSetOptions(circle, options);

  // set location, if marker context, anchor, else use center
  useEffect(function () {
    if (marker) {
      circle.bindTo('center', marker, 'position');
      circle.bindTo('map', marker, 'map');
    } else {
      circle.setCenter(center);
    }
  }, [circle, marker, center]);

  // handles mounting/unmounting
  useEffect(function () {
    if (marker) {
      // add to map if child of marker and marker is on map
      // this means circle isn't on map if marker is clustererd
      if (marker.getMap()) {
        circle.setMap(map);
      }
    } else {
      circle.setMap(map);
    }

    return function () {
      return circle.setMap(null);
    };
  }, [map, circle, marker]);

  useCreateMapListeners(circle, events, circleEvents);
  return null;
}

var drawingManagerEvents = {
  onCircleComplete: 'circlecomplete',
  onMarkerComplete: 'markercomplete',
  onOverlayComplete: 'overlaycomplete',
  onPolygonComplete: 'polygoncomplete',
  onPolyLineComplete: 'polylinecomplete',
  onRectangleComplete: 'rectanglecomplete'
};

/**
 * DrawingManager
 * https://developers.google.com/maps/documentation/javascript/reference/drawing#DrawingManager
 */
function DrawingManager(_ref) {
  var options = _ref.options,
      events = objectWithoutProperties(_ref, ['options']);


  var map = useMap();

  // drawingManager reference
  var drawingManager = useCallbackRef(function () {
    return new window.google.maps.drawing.DrawingManager();
  });

  // set drawing manager options
  useSetOptions(drawingManager, options);

  // handle drawing manager mounting/unmounting
  useEffect(function () {
    drawingManager.setMap(map);
    return function () {
      return drawingManager.setMap(null);
    };
  }, [map, drawingManager]);

  useCreateMapListeners(drawingManager, events, drawingManagerEvents);
  return null;
}

var infoWindowEvents = {
  onCloseClick: 'closeclick',
  onContentChanged: 'content_changed',
  onDomReady: 'domready',
  onPositionChanged: 'position_changed',
  onZIndexChanged: 'zindex_changed'
};

/**
 * InfoWindow
 * https://developers.google.com/maps/documentation/javascript/reference/info-window
 */
function InfoWindow(_ref) {
  var center = _ref.center,
      children = _ref.children,
      anchor = _ref.anchor,
      options = _ref.options,
      events = objectWithoutProperties(_ref, ['center', 'children', 'anchor', 'options']);


  var map = useMap();
  var marker = useMarker();

  var infoWindow = useCallbackRef(function () {
    return new window.google.maps.InfoWindow();
  });

  var div = useCallbackRef(function () {
    return document.createElement('div');
  });

  // handle info window options
  useSetOptions(infoWindow, options);

  // handle info window position, when no anchor
  useEffect(function () {
    if (center) {
      infoWindow.setPosition(center);
    }
  }, [infoWindow, center]);

  // handle info window content
  useEffect(function () {
    infoWindow.setContent(div);
  }, [infoWindow, div]);

  // handle info window mounting/unmounting
  useEffect(function () {
    // InfoWindow is a child of a Marker
    if (marker) {
      infoWindow.open(map, marker);
      // InfoWindow was passed a google map anchor obj
    } else if (anchor) {
      infoWindow.open(map, anchor);
      // InfoWindow is passed center; positioning is handled above
    } else {
      infoWindow.open(map);
    }
    return function () {
      return infoWindow.setMap(null);
    };
  }, [map, marker, anchor, infoWindow, children]);

  useCreateMapListeners(infoWindow, events, infoWindowEvents);
  // TODO not sure if I need to use Children.only here
  return createPortal(Children.only(children), div);
}

/**
 * Hook that creates a CustomerOverlay component
 * with the prototype of google maps OverlayView
 * returns an array of [instance, class]
 */
function useCustomOverlay() {
  var map = useMap();
  var CustomOverlay = useMemo(function () {
    function CustomOverlay(map) {
      var _this = this;

      this.setMap(map);
      this.remove = function () {
        return _this.setMap(null);
      };
    }
    CustomOverlay.prototype = new window.google.maps.OverlayView();
    return CustomOverlay;
  }, []);

  var customOverlay = useCallbackRef(function () {
    return new CustomOverlay(map);
  });

  return [customOverlay, CustomOverlay];
}

var PANES = {
  FLOAT_PANE: 'floatPane',
  MAP_PANE: 'mapPane',
  MARKER_LAYER: 'markerLayer',
  OVERLAY_LAYER: 'overlayLayer',
  OVERLAY_MOUSE_TARGET: 'overlayMouseTarget'
};

var FLOAT_PANE = PANES.FLOAT_PANE,
    MAP_PANE = PANES.MAP_PANE,
    MARKER_LAYER = PANES.MARKER_LAYER,
    OVERLAY_LAYER = PANES.OVERLAY_LAYER,
    OVERLAY_MOUSE_TARGET = PANES.OVERLAY_MOUSE_TARGET;
/**
 * OverlayView
 * https://developers.google.com/maps/documentation/javascript/reference/overlay-view#OverlayView
 */

function OverlayView(_ref) {
  var center = _ref.center,
      children = _ref.children,
      className = _ref.className,
      _ref$pane = _ref.pane,
      pane = _ref$pane === undefined ? FLOAT_PANE : _ref$pane,
      style = _ref.style;

  // [overlay instance, overlay function]
  var _useCustomOverlay = useCustomOverlay(),
      _useCustomOverlay2 = slicedToArray(_useCustomOverlay, 2),
      customOverlay = _useCustomOverlay2[0],
      CustomOverlay = _useCustomOverlay2[1];

  var div = useCallbackRef(function () {
    return document.createElement('div');
  });

  useMemo(function () {
    CustomOverlay.prototype.onAdd = function (e) {
      customOverlay.getPanes()[pane].appendChild(div);
    };
  }, [div, pane, customOverlay, CustomOverlay]);

  useMemo(function () {
    CustomOverlay.prototype.draw = function () {
      var projection = customOverlay.getProjection();

      var _projection$fromLatLn = projection.fromLatLngToDivPixel(new window.google.maps.LatLng(center)),
          x = _projection$fromLatLn.x,
          y = _projection$fromLatLn.y;

      if (style) {
        // haven't tested yet
        var strStyles = Object.entries(style).reduce(function (str, _ref2) {
          var _ref3 = slicedToArray(_ref2, 2),
              key = _ref3[0],
              val = _ref3[1];

          return '' + str + key + ':' + val + ';';
        }, '');
        div.style.setAttribute(strStyles);
      }
      div.className = className;
      div.style.position = 'absolute';
      div.style.left = x + 'px';
      div.style.top = y + 'px';
    };
  }, [div, customOverlay, CustomOverlay, center, className, style]);

  // handle unmounting
  useMemo(function () {
    CustomOverlay.prototype.onRemove = memo(function () {
      div.parentNode.removeChild(div);
    });
    return function () {
      return customOverlay.remove();
    };
  }, [div, customOverlay, CustomOverlay]);

  return createPortal(children, div);
}

OverlayView.floatPane = FLOAT_PANE;
OverlayView.mapPane = MAP_PANE;
OverlayView.markerLayer = MARKER_LAYER;
OverlayView.overlayLayer = OVERLAY_LAYER;
OverlayView.overlayMouseTarget = OVERLAY_MOUSE_TARGET;

var polygonEvents = {
  onClick: 'click',
  onDblClick: 'dblclick',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDragStart: 'dragstart',
  onMouseDown: 'mousedown',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onRightclick: 'rightclick'
};

/**
 * Polygon
 * https://developers.google.com/maps/documentation/javascript/reference/polygon#Polygon
 */
function Polygon(_ref) {
  var options = _ref.options,
      events = objectWithoutProperties(_ref, ['options']);


  var map = useMap();

  var polygon = useCallbackRef(function () {
    return new window.google.maps.Polygon();
  });

  // handle polygon options
  useSetOptions(polygon, options);

  // handle polygon mounting/unmounting
  useEffect(function () {
    polygon.setMap(map);
    return function () {
      return polygon.setMap(null);
    };
  }, [map, polygon]);

  useCreateMapListeners(polygon, events, polygonEvents);
  return null;
}

var polylineEvents = {
  onClick: 'click',
  onDblClick: 'dblclick',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDragStart: 'dragstart',
  onMouseDown: 'mousedown',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onRightclick: 'rightclick'
};

/**
 * Polyline
 * https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline
 */
function Polyline(_ref) {
  var options = _ref.options,
      events = objectWithoutProperties(_ref, ['options']);


  var map = useMap();

  var polyline = useCallbackRef(function () {
    return new window.google.maps.Polyline();
  });

  // handle polyline options
  useSetOptions(polyline, options);

  // handle polyline mounting/unmounting
  useEffect(function () {
    polyline.setMap(map);
    return function () {
      return polyline.setMap(null);
    };
  }, [map, polyline]);

  useCreateMapListeners(polyline, events, polylineEvents);
  return null;
}

var rectangleEvents = {
  onBoundsChanged: 'bounds_changed',
  onClick: 'click',
  onDblClick: 'dblclick',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDragStart: 'dragstart',
  onMouseDown: 'mousedown',
  onMouseMove: 'mousemove',
  onMouseOut: 'mouseout',
  onMouseOver: 'mouseover',
  onMouseUp: 'mouseup',
  onRightClick: 'rightclick'
};

/**
 * Rectangle
 * https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle
 */
function Rectangle(_ref) {
  var options = _ref.options,
      events = objectWithoutProperties(_ref, ['options']);


  var map = useMap();

  var rectangle = useCallbackRef(function () {
    return new window.google.maps.Rectangle();
  });

  // handle rectangle options
  useSetOptions(rectangle, options);

  // handle rectangle mounting/unmounting
  useEffect(function () {
    rectangle.setMap(map);
    return function () {
      return rectangle.setMap(null);
    };
  }, [map, rectangle]);

  useCreateMapListeners(rectangle, events, rectangleEvents);
  return null;
}

var directionsRendererEvents = {
  onDirectionsChanged: 'directions_changed'
};

function DirectionsRenderer(_ref) {
  var options = _ref.options,
      events = objectWithoutProperties(_ref, ['options']);


  var map = useMap();

  var directionsRenderer = useCallbackRef(function () {
    return new window.google.maps.DirectionsRenderer();
  });

  // set options
  useSetOptions(directionsRenderer, options);

  useEffect(function () {
    directionsRenderer.setMap(map);
    return function () {
      return directionsRenderer.setMap(null);
    };
  }, [map, directionsRenderer]);

  useCreateMapListeners(directionsRenderer, events, directionsRendererEvents);
  return null;
}

function useDirectionsRequest() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  useEffect(function () {
    var directionsService = new window.maps.DirectionsService();
    directionsService.route.apply(directionsService, args);
  }, [args]); // does this dependency work?
}

/**
 * This component loads the google maps script and renders
 * the map loader which uses objects from the script.
 */
function ScriptLoader(_ref) {
  var url = _ref.url,
      _ref$loadingElement = _ref.loadingElement,
      loadingElement = _ref$loadingElement === undefined ? null : _ref$loadingElement,
      isAlreadyLoaded = _ref.isAlreadyLoaded,
      Element = _ref.Element,
      rest = objectWithoutProperties(_ref, ['url', 'loadingElement', 'isAlreadyLoaded', 'Element']);

  var isScriptLoaded = useScript(url, isAlreadyLoaded);
  return isScriptLoaded ? React.createElement(Element, _extends({ loadingElement: loadingElement }, rest)) : loadingElement;
}

var AUTO_COMPLETE_EVENT = 'place_changed';

function AutoComplete(_ref) {
  var options = _ref.options,
      onPlaceChanged = _ref.onPlaceChanged,
      rest = objectWithoutProperties(_ref, ['options', 'onPlaceChanged']);

  var _useNodeRefConstructo = useNodeRefConstructor(window.google.maps.places.Autocomplete),
      _useNodeRefConstructo2 = slicedToArray(_useNodeRefConstructo, 2),
      ref = _useNodeRefConstructo2[0],
      autoComplete = _useNodeRefConstructo2[1];

  return React.createElement(
    Fragment,
    null,
    React.createElement('input', _extends({ ref: ref }, rest)),
    autoComplete ? React.createElement(OnAutoComplete, {
      options: options,
      autoComplete: autoComplete,
      onPlaceChanged: onPlaceChanged }) : null
  );
}

function OnAutoComplete(_ref2) {
  var autoComplete = _ref2.autoComplete,
      options = _ref2.options,
      onPlaceChanged = _ref2.onPlaceChanged;

  useSetOptions(autoComplete, options);
  useMapListener(autoComplete, onPlaceChanged, AUTO_COMPLETE_EVENT);
}

function LoadAutoComplete(_ref) {
  var url = _ref.url,
      rest = objectWithoutProperties(_ref, ['url']);

  var isAlreadyLoaded = useMemo(function () {
    return !!(window.google && window.google.maps && window.google.maps.places);
  }, []);
  if (url) {
    return React.createElement(ScriptLoader, _extends({}, rest, { url: url,
      Element: AutoComplete,
      isAlreadyLoaded: isAlreadyLoaded
    }));
  } else if (isAlreadyLoaded) {
    return React.createElement(AutoComplete, rest);
  }
  return null;
}

var SEARCH_BOX_EVENT = 'place_changed';

function SearchBox(_ref) {
  var options = _ref.options,
      onPlaceChanged = _ref.onPlaceChanged,
      rest = objectWithoutProperties(_ref, ['options', 'onPlaceChanged']);

  var _useNodeRefConstructo = useNodeRefConstructor(window.google.maps.places.SearchBox),
      _useNodeRefConstructo2 = slicedToArray(_useNodeRefConstructo, 2),
      ref = _useNodeRefConstructo2[0],
      searchBox = _useNodeRefConstructo2[1];

  return React.createElement(
    Fragment,
    null,
    React.createElement('input', _extends({ ref: ref }, rest)),
    searchBox ? React.createElement(OnSearchBox, {
      options: options,
      searchBox: searchBox,
      onPlaceChanged: onPlaceChanged
    }) : null
  );
}

function OnSearchBox(_ref2) {
  var searchBox = _ref2.searchBox,
      options = _ref2.options,
      onPlaceChanged = _ref2.onPlaceChanged;

  useSetOptions(searchBox, options);
  useMapListener(searchBox, onPlaceChanged, SEARCH_BOX_EVENT);
}

function LoadSearchBox(_ref) {
  var url = _ref.url,
      rest = objectWithoutProperties(_ref, ['url']);

  var isAlreadyLoaded = useMemo(function () {
    return !!(window.google && window.google.maps && window.google.maps.places);
  }, []);
  if (url) {
    return React.createElement(ScriptLoader, _extends({}, rest, { url: url,
      isAlreadyLoaded: isAlreadyLoaded,
      Element: SearchBox
    }));
  } else if (isAlreadyLoaded) {
    return React.createElement(SearchBox, rest);
  }
  return null;
}

function StreetViewPanorama(_ref) {
  var options = _ref.options,
      onCloseClick = _ref.onCloseClick,
      onPanoramaChanged = _ref.onPanoramaChanged,
      onPositionChanged = _ref.onPositionChanged,
      onPovChanged = _ref.onPovChanged,
      onResize = _ref.onResize,
      onStatusChanged = _ref.onStatusChanged,
      onVisibleChanged = _ref.onVisibleChanged,
      onZoomChanged = _ref.onZoomChanged,
      rest = objectWithoutProperties(_ref, ['options', 'onCloseClick', 'onPanoramaChanged', 'onPositionChanged', 'onPovChanged', 'onResize', 'onStatusChanged', 'onVisibleChanged', 'onZoomChanged']);

  var _useNodeRefConstructo = useNodeRefConstructor(window.google.maps.StreetViewPanorama),
      _useNodeRefConstructo2 = slicedToArray(_useNodeRefConstructo, 2),
      ref = _useNodeRefConstructo2[0],
      streetViewPanorama = _useNodeRefConstructo2[1];

  return React.createElement(
    'div',
    _extends({ ref: ref }, rest),
    streetViewPanorama ? React.createElement(
      Fragment,
      null,
      React.createElement(SetOptions, { obj: streetViewPanorama, opts: options }),
      React.createElement(AddMapListener, { obj: streetViewPanorama, func: onCloseClick, event: 'closeclick' }),
      React.createElement(AddMapListener, { obj: onPanoramaChanged, func: onCloseClick, event: 'pano_changed' }),
      React.createElement(AddMapListener, { obj: onPositionChanged, func: onCloseClick, event: 'position_changed' }),
      React.createElement(AddMapListener, { obj: onPovChanged, func: onCloseClick, event: 'pov_changed' }),
      React.createElement(AddMapListener, { obj: onResize, func: onCloseClick, event: 'resive' }),
      React.createElement(AddMapListener, { obj: onStatusChanged, func: onCloseClick, event: 'status_changed' }),
      React.createElement(AddMapListener, { obj: onVisibleChanged, func: onCloseClick, event: 'visible_changed' }),
      React.createElement(AddMapListener, { obj: onZoomChanged, func: onCloseClick, event: 'zoom_changed' })
    ) : null
  );
}

// shouldn't be in the library

function getLatLng(latLngObj) {
  var lat = latLngObj.lat();
  var lng = latLngObj.lng();
  return { lat: lat, lng: lng };
}

function getPolygonCenter(polygon) {
  var bounds = new window.google.maps.LatLngBounds();
  polygon.getPath().forEach(function (latLng) {
    return bounds.extend(latLng);
  });
  return getLatLng(bounds.getCenter());
}

export { BicyclingLayer, LoadMap as GoogleMap, TrafficLayer, TransitLayer, Circle, DrawingManager, InfoWindow, Marker, OverlayView, Polygon, Polyline, Rectangle, DirectionsRenderer, useDirectionsRequest, LoadAutoComplete as AutoComplete, LoadSearchBox as SearchBox, StreetViewPanorama, Clusterer, useMapEventListener, useMapEventListenerOnce, getLatLng, getPolygonCenter };
//# sourceMappingURL=index.es.js.map

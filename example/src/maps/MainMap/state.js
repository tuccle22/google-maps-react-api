import { useCallback } from 'react'
import { getLatLng, getPolygonCenter } from 'google-maps-react-api';
import { useHover } from './helper_hooks';

const initState = {
  options: { zoom: 3 },
  center: { lat: 45, lng: -45 }
}

function reducer(state, action) {
  switch (action.type) {
    case 'SHOW_INFO_WINDOW':
      return {
        ...state,
        infoWindowProps: action.payload,
      }
    case 'HIDE_INFO_WINDOW':
      return {
        ...state,
        infoWindowProps: null
      }
    case 'SHOW_POLYGON_OVERLAY':
      return {
        ...state,
        polygonCenter: {
          center: {
            ...getPolygonCenter(action.payload)
          }
        }
      }
    case 'HIDE_POLYGON_OVERLAY':
      return {
        ...state,
        polygonCenter: null
      }
    case 'GO_TO_BOUNDS':
      return {
        ...state,
        bounds: action.payload
      }
    case 'GO_TO_CENTER':
      return {
        ...state,
        center: action.payload
      }
    default:
      console.error('whoops')
  }
}

function usePolygonHover(dispatch) {
  const onOver = useCallback((e, polygon) => {
    dispatch({ type: 'SHOW_INFO_WINDOW', payload: {
      center: {
        ...getPolygonCenter(polygon)
      }
    }})
  }, [dispatch])

  const onOut = useCallback(() => {
    dispatch({ type: 'HIDE_INFO_WINDOW' })
  }, [dispatch])

  return useHover(onOver, onOut)
}

function useMarkerHover(dispatch) {
  const onOver = useCallback((e, marker) => {
    dispatch({ type: 'SHOW_INFO_WINDOW', payload: {
      anchor: marker
    }})
  }, [dispatch])

  const onOut = useCallback(() => {
    dispatch({ type: 'HIDE_INFO_WINDOW'})
  }, [dispatch])

  return useHover(onOver, onOut)
}

function useClusterHover(dispatch) {
  const onOver = useCallback((e, clusterer) => dispatch({
    type: 'SHOW_INFO_WINDOW', payload: {
      center: { ...getLatLng(e.center_) },
      options: { pixelOffset: new window.google.maps.Size(
        0, e.clusterIcon_.height_ / -2
      )}
    }
  }), [dispatch])

  const onOut = useCallback(() => {
    dispatch({ type: 'HIDE_INFO_WINDOW' })
  }, [dispatch])

  return useHover(onOver, onOut)
}

export {
  initState,
  reducer,
  useMarkerHover,
  useClusterHover,
  usePolygonHover
}
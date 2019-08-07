import { useEffect } from 'react'

function useDirectionsRequest(...args) {
  useEffect(() => {
    const directionsService = new window.maps.DirectionsService()
    directionsService.route(...args)
  }, [args]) // does this dependency work?
}

export default useDirectionsRequest
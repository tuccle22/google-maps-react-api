

function getLatLng(latLngObj) {
  const lat = latLngObj.lat()
  const lng = latLngObj.lng()
  return { lat, lng }
}

function getMarkerBounds(marker, radius) {
  const center = getLatLng(marker.getPosition())
  const bounds = new window.google.maps.Circle({
    center,
    radius
  }).getBounds()
  return bounds
}

function getPolygonCenter(polygon) {
  let bounds = new window.google.maps.LatLngBounds()
  polygon.getPath().forEach(latLng => bounds.extend(latLng))
  return getLatLng(bounds.getCenter())
}

export { 
  getLatLng,
  getMarkerBounds,
  getPolygonCenter
}
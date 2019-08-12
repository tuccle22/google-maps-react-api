import { googleMapsApiKey } from './keys'
const GoogleMapsBase = 'https://maps.googleapis.com/maps/api/js'
const googleMapsApiUrl = `${GoogleMapsBase}?key=${googleMapsApiKey}&libraries=geometry,drawing,places`

export {
  googleMapsApiUrl
}
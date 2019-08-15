import React, { useReducer } from 'react';
import { GoogleMap, OverlayView } from 'google-maps-react-api';
import { googleMapsApiUrl } from '../constants';

const center = { lat: 45, lng: -45 }
const initialOpts = { zoom: 8, mapTypeId: 'satellite' }
const defaultOptions = { ...initialOpts, update: initialOpts }

const optionsUpdater = (currentOpts, newOpts) => ({
  ...currentOpts,
  ...newOpts,
  update: newOpts
})
function InfoWindowExample() {

  const [opts, setOpts] = useReducer(optionsUpdater, defaultOptions)

  return (
    <GoogleMap url={googleMapsApiUrl}
      center={center}
      options={opts.update}
      containerProps={{className: 'map-example'}}
      >
      <OverlayView>
        <button onClick={() => {
          setOpts({zoom: 4})
        }}>zoom 4</button>
        <button onClick={() => {
          const mapTypeId = opts.mapTypeId === 'satellite' ? 'roadmap' : 'satellite'
          setOpts({mapTypeId})
        }}>
          toggle mode
        </button>
      </OverlayView>
    </GoogleMap>
  )

}

export default InfoWindowExample
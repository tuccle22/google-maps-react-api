import React from 'react';
import { GoogleMap } from '../../../dist';
import { googleMapsApiUrl } from '../constants';

const center = { lat: 45, lng: -45 }
const options = { zoom: 3 }

function InfoWindowExample() {

  return (
    <GoogleMap url={googleMapsApiUrl}
      center={center}
      options={options}
    >

    </GoogleMap>
  )

}

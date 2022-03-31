import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState } from 'react';
import Axios from 'axios';
import { GeoJSON } from 'react-leaflet';

import counties from "./GeoJson/counties.json"

import "./App.css"

function App() {

  return (
    <MapContainer center={[-76.9839, 39.0704]} zoom={13}>
      <GeoJSON style={{fillOpacity: 0}} data={counties.features}/>
    </MapContainer>
  );


}

export default App;

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState } from 'react';
import Axios from 'axios';
import { GeoJSON } from 'react-leaflet';

import counties from "./GeoJson/counties.json"
import states from "./GeoJson/states.json"

import "./App.css"

function App() {

  const [stateView, setStateView] = useState(true);

  const stateName = (state, layer) => {
    layer.on({
      click: (event) => {
        setStateView(false);
      }
    })
  };
  return (
    stateView ? (
      <MapContainer center={[38.484726, -98.38017]} zoom={5}>
        <GeoJSON style={{ fillOpacity: 0, weight: 2 }} data={states.features} onEachFeature={stateName} />
      </MapContainer>
    ) : (
      <MapContainer center={[38.484726, -98.38017]} zoom={8}>
        <GeoJSON style={{ fillOpacity: 0, weight: 2 }} data={counties.features} onEachFeature={stateName} />
      </MapContainer>
    )
  );

}
export default App;

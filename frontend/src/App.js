import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { GeoJSON } from 'react-leaflet';

import counties from "./GeoJson/counties.json"
import states from "./GeoJson/states.json"

import "./App.css"

function App() {

  const [view, setView] = useState("state");

  const hoverStyle = {color: "black", weight: 4};
  const defaultStyle = {color: "blue", fillOpacity: 0, weight: 2}

  const displayName = (county, layer) => {
    layer.bindPopup(county.properties.NAME)
    layer.on({
      mouseover: (event) => {
        event.target.setStyle(hoverStyle)
      },
      mouseout: (event) => {
        event.target.setStyle(defaultStyle)
      }
    })
  };

  return (
    <MapContainer center={[38.484726, -98.38017]} zoom={5}>
      <GeoJSON style={defaultStyle} data={counties.features} onEachFeature={displayName} />
    </MapContainer>
  );

}
export default App;

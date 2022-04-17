import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import getData from "./axois.js";
import counties from "./GeoJson/counties.json"
import states from "./GeoJson/states.json"

import "./App.css"



function App() {

  const [data, setData] = useState({});

  const hoverStyle = {color: "black", weight: 4};
  const defaultStyle = {color: "blue", fillOpacity: 0, weight: 2}

  useEffect(()=>{
    let nat_data = getData('http://localhost:3001/get_national_level/')
    setData(nat_data);
  },[])

  const displayName = (county, layer) => {
    layer.bindPopup(data)
    layer.on({
      mouseover: (event) => {
        event.target.setStyle(hoverStyle);
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

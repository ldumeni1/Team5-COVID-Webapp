import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import getData from "./axois.js";
import counties from "./GeoJson/counties.json"
import states from "./GeoJson/states.json"

import "./App.css"



function App() {

  const [cases, setCases] = useState(0);
  const [deaths, setDeaths] = useState(0);

  const hoverStyle = {color: "black", weight: 4};
  const defaultStyle = {color: "blue", fillOpacity: 0, weight: 2}

  const [selectedCounty, setSelectedCounty] = useState("Howard");
  useEffect(async()=>{
    const response = await getData('http://localhost:3001/get_county_level/3333-01-01/MD/' + selectedCounty)
    setCases(response.data[0].cl_cases);
    setDeaths(response.data[0].cl_deaths);
  },[selectedCounty])

  const [popup, setPopup] = useState(false)
  const [popupLocation, setPopupLocation] = useState([])
  const selectCounty = (county, layer) => {
    layer.on({
      mouseover: (event) => {
        event.target.setStyle(hoverStyle);
      },
      mouseout: (event) => {
        event.target.setStyle(defaultStyle)
      },
      click: (event) => {
        setSelectedCounty(county.properties.NAME)
        setPopupLocation([event.latlng.lat, event.latlng.lng])
        setPopup(true)
      }
    })
  };

  return (
    popup ? (
    <MapContainer center={popupLocation} zoom={8}>
      <Popup position={popupLocation}>
        <h2>{selectedCounty}</h2>
        <h4>Number of Cases: {cases}</h4>
        <h4>Number of Deaths: {deaths}</h4>
      </Popup>
      <GeoJSON style={defaultStyle} data={counties.features} onEachFeature={selectCounty} />
    </MapContainer>) : (
    <MapContainer center={[38.484726, -98.38017]} zoom={5}>
      <GeoJSON style={defaultStyle} data={counties.features} onEachFeature={selectCounty} />
    </MapContainer>)
  );

}
export default App;

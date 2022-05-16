import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import getData from "./axois.js";
import counties from "./GeoJson/counties.json"
import states from "./GeoJson/states.json"

import "./Map.css"



function Map(props) {

  const [cases, setCases] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [vaxes, setVaxes] = useState(0);
  
  const countyHoverStyle = { color: "black", weight: 4 };
  const countyDefaultStyle = { color: "black", fillOpacity: 0, weight: 1 };

  useEffect(async () => {
    try {
      const response = await getData('http://localhost:3001/get_county_level_all/' + props.selectedState + '/' + props.selectedCounty)
      setCases(response.data[response.data.length - 1].cl_cases);
      setDeaths(response.data[response.data.length - 1].cl_deaths);
      setVaxes(response.data[response.data.length - 1].cv_total);
    } catch (e) {
      console.log(e);
    }
  }, [props.selectedCounty, props.selectedState])

  const [popup, setPopup] = useState(false)
  const [popupLocation, setPopupLocation] = useState([])

  const selectCounty = (county, layer) => {
    layer.on({
      mouseover: (event) => {
        event.target.setStyle(countyHoverStyle);
      },
      mouseout: (event) => {
        event.target.setStyle(countyDefaultStyle)
      },
      click: (event) => {
        props.setSelectedCounty(county.properties.NAME)
        props.setSelectedState(county.properties.STATE)
        setPopupLocation([event.latlng.lat, event.latlng.lng])
        setPopup(true)
      }
    })
  };

  return (
    popup ? (
      <MapContainer center={popupLocation} zoom={8}>
        <Popup position={popupLocation}>
          <h2>{props.selectedCounty}</h2>
          {props.casesFilter ? (<h4>Number of Cases: {cases}</h4>) : (null)}
          {props.deathsFilter ? (<h4>Number of Deaths: {deaths}</h4>) : (null)}
          {props.vaxFilter ? (<h4>Number of Complete Vaccinations: {vaxes}</h4>) : (null)}
        </Popup>
        <GeoJSON data={states.features} style = {{ color: "blue",fillOpacity: 0}} />
        <GeoJSON style={countyDefaultStyle} data={counties.features} onEachFeature={selectCounty} />
      </MapContainer>) : (
      <MapContainer center={[38.484726, -98.38017]} zoom={4}>
        <GeoJSON data={states.features} style = {{ color: "blue", fillOpacity: 0}} />
        <GeoJSON style={countyDefaultStyle} data={counties.features} onEachFeature={selectCounty} />
      </MapContainer>)
  );

}
export default Map;

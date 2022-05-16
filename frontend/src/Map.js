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

  const [stateData, setStateData] = useState([]);

  const countyHoverStyle = { color: "black", weight: 4 };
  const countyDefaultStyle = { color: "black", fillOpacity: 0, weight: 1 };

  useEffect(async () => {
    try {
      const response = await getData('http://localhost:3001/get_county_level_all/' + props.selectedState + '/' + props.selectedCounty)
      setCases(response.data[0].cl_cases);
      setDeaths(response.data[0].cl_deaths);
      setVaxes(response.data[0].cv_total);
    } catch (e) {
      console.log(e);
    }
  }, [props.selectedCounty, props.selectedState])

  useEffect(async () => {
    try {
      const response = await getData('http://localhost:3001/get_most_recent_state_level')
      setStateData(response.data)
    } catch (e) {
      console.log(e);
    }
  }, [])


  const [popup, setPopup] = useState(false)
  const [popupLocation, setPopupLocation] = useState([])

  const selectState = (_state, layer) => {
    for (let state of stateData) {
      if (state.sl_state == _state.properties.NAME) {
        if (state.sl_cases < 499999)
          layer.options.fillOpacity = 0.2;
        else if (state.sl_cases > 500000 && state.sl_cases < 999999){
          console.log('here');
          layer.options.fillOpacity = 0.4;}
        else if (state.sl_cases > 1000000 && state.sl_cases < 1499999)
          layer.options.fillOpacity = 0.6;
        else if (state.sl_cases > 1500000 && state.sl_cases < 1999999)
          layer.options.fillOpacity = 0.8;
        else if (state.sl_cases > 2000000){
          console.log('here');
          layer.options.fillOpacity = 1;}
        else
          layer.options.fillOpacity = 0;
      }
      break;
  }
  layer.options.color = 'red';
};

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
      <GeoJSON data={states.features} onEachFeature={selectState} />
      <GeoJSON style={countyDefaultStyle} data={counties.features} onEachFeature={selectCounty} />
    </MapContainer>) : (
    <MapContainer center={[38.484726, -98.38017]} zoom={5}>
      <GeoJSON data={states.features} onEachFeature={selectState} />
      <GeoJSON style={countyDefaultStyle} data={counties.features} onEachFeature={selectCounty} />
    </MapContainer>)
);

}
export default Map;

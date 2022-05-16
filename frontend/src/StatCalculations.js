import { Box, FormControl, FormLabel, FormControlLabel, RadioGroup,
     Radio, Divider, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import getData from "./axois.js";


function StatCalculations(props) {

    const [dataSelected, setDataSelected] = useState(false);
    const [dataType, setDataType] = useState('');
    const [data, setData] = useState([]);
    const [vaxData, setVaxData] = useState([]);
    const [calcSelected, setCalcSelected] = useState(false);
    const [calc, setCalc] = useState('');

    const handleDataChange = (event) => {
        setDataSelected(true)
        setDataType(event.target.value)
    }

    const handleCalcChange = (event) => {
        setCalcSelected(true)
        setCalc(event.target.value)
    }

    useEffect(async()=>{
        let response = await getData('http://localhost:3001/get_counties_by_state/' + props.selectedState)
        setData(response.data);
        response = await getData('http://localhost:3001/get_counties_vax_by_state/MD')
        setVaxData(response.data);
      },[props.selectedState]
    )
    const [statCounty, setStatCounty] = useState('');
    const [calculatedStat, setCalculatedStat] = useState(0);
    useEffect(()=>{
        switch(calc){
            case 'Average':
                let total = 0;
                let count = 0;
                if(dataType == 'cv_total'){
                    for(let county of vaxData){
                        total += county[dataType];
                        count++;
                    }
                }else{
                    for(let county of data){
                        total += county[dataType];
                        count++;
                    } 
                }
                setStatCounty('')
                setCalculatedStat(total/count)
                break;
            case 'Max Value':
                let max = Number.MIN_SAFE_INTEGER
                if(dataType == 'cv_total'){
                    for(let county of vaxData){
                        if(county[dataType] > max){
                            max = county[dataType]
                            setStatCounty(county['cv_county'])
                        }
                    }
                }else{
                    for(let county of data){
                        if(county[dataType] > max){
                            max = county[dataType]
                            setStatCounty(county['cl_county'])
                        }
                    }  
                }
                setCalculatedStat(max)
                break;
            case 'Min Value':
                let min = Number.MAX_SAFE_INTEGER
                if(dataType == 'cv_total'){
                    for(let county of vaxData){
                        if(county[dataType] < min){
                            min = county[dataType]
                            setStatCounty(county['cv_county'])
                        }
                    }
                }else{
                    for(let county of data){
                        if(county[dataType] < min){
                            min = county[dataType]
                            setStatCounty(county['cl_county'])
                        }
                    } 
                }
                setCalculatedStat(min)
                break;
        }
    },[data, dataType, calc])

    return (
        <Box color={'black'} margin={2}>
            <FormControl>
                <FormLabel id='data-group'><b>Select Data</b></FormLabel>
                <RadioGroup
                    name='data-group'
                    onChange={handleDataChange}
                >
                    <FormControlLabel value="cl_cases" control={<Radio />} label="Cases" />
                    <FormControlLabel value="cl_deaths" control={<Radio />} label="Deaths" />
                    <FormControlLabel value="cv_total" control={<Radio />} label="Vaccination" />
                </RadioGroup>
                <FormLabel id='calculations'><b>Select Calculation</b></FormLabel>
                <RadioGroup
                    name='calculations'
                    onChange={handleCalcChange}
                >
                    <FormControlLabel value="Average" control={<Radio />} label="Average" />
                    <FormControlLabel value="Max Value" control={<Radio />} label="Max Value" />
                    <FormControlLabel value="Min Value" control={<Radio />} label="Min Value" />
                </RadioGroup>
            </FormControl>
            <Divider />
            {(dataSelected && calcSelected) ? (statCounty ? (<Typography><b>{calc}:</b> {calculatedStat} ({statCounty})</Typography>) : (<Typography><b>{calc}:</b> {calculatedStat}</Typography>)) : 
            (props.selectedState ? (<Typography><i>Select A Group Of Data For {props.selectedState} And A Calculation</i></Typography>):(<Typography><i>Select A County On The Map To Calculate Stats For Its State</i></Typography>))}
        </Box>
    );
} export default StatCalculations
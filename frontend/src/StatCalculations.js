import { Box, FormControl, FormLabel, FormControlLabel, RadioGroup,
     Radio, Divider, Typography } from '@mui/material'
import { useState } from 'react'

function StatCalculations() {

    const [dataSelected, setDataSelected] = useState(false);
    const [data, setData] = useState([]);
    const [calcSelected, setCalcSelected] = useState(false);
    const [calc, setCalc] = useState('');

    const handleDataChange = (event) => {
        setDataSelected(true)
        setData(event.target.value)
    }

    const handleCalcChange = (event) => {
        setCalcSelected(true)
        setCalc(event.target.value)
    }

    return (
        <Box color={'black'} margin={2}>
            <FormControl>
                <FormLabel id='data-group'><b>Select Data</b></FormLabel>
                <RadioGroup
                    name='data-group'
                    onChange={handleDataChange}
                >
                    <FormControlLabel value="Cases" control={<Radio />} label="Cases" />
                    <FormControlLabel value="Deaths" control={<Radio />} label="Deaths" />
                    <FormControlLabel value="Hospitalizations" control={<Radio />} label="Hospitalizations" />
                </RadioGroup>
                <FormLabel id='calculations'><b>Select Calculation</b></FormLabel>
                <RadioGroup
                    name='calculations'
                    onChange={handleCalcChange}
                >
                    <FormControlLabel value="Average" control={<Radio />} label="Average" />
                    <FormControlLabel value="Median" control={<Radio />} label="Median" />
                    <FormControlLabel value="Max Value" control={<Radio />} label="Max Value" />
                    <FormControlLabel value="Min Value" control={<Radio />} label="Min Value" />
                </RadioGroup>
            </FormControl>
            <Divider />
            {(dataSelected && calcSelected) ? (<Typography>{calc} of {data}: *<i>some number</i>*</Typography>) : (null)}
        </Box>
    );
} export default StatCalculations
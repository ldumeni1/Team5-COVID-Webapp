import { Box, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@mui/material'


function StatCalculations() {

    return (
        <Box margin={2}>
            <FormControl>
                <FormLabel id='data-group'><b>Select Data</b></FormLabel>
                <RadioGroup
                    name='data-group'
                //value={value}
                //onChange={handleChange}
                >
                    <FormControlLabel value="Cases" control={<Radio />} label="Cases" />
                    <FormControlLabel value="Deaths" control={<Radio />} label="Deaths" />
                    <FormControlLabel value="Hospitalizations" control={<Radio />} label="Hospitalizations" />
                </RadioGroup>
                <FormLabel id='calculations'><b>Select Calculation</b></FormLabel>
                <RadioGroup
                    name='calculations'
                //value={value}
                //onChange={handleChange}
                >
                    <FormControlLabel value="Average" control={<Radio />} label="Average" />
                    <FormControlLabel value="Median" control={<Radio />} label="Median" />
                    <FormControlLabel value="Max Value" control={<Radio />} label="Max Value" />
                    <FormControlLabel value="Min Value" control={<Radio />} label="Min Value" />
                </RadioGroup>
            </FormControl>
        </Box>
    );
} export default StatCalculations
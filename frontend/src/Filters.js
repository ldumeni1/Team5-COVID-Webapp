import {Box, FormControlLabel, FormGroup, Checkbox, FormLabel} from '@mui/material'

function Filters() {


    return (
        <Box color={'black'} margin={2}>
            <FormLabel><b>Select Filters</b></FormLabel>
            <FormGroup>
                <FormControlLabel control={< Checkbox defaultChecked />} label="Cases" />
                <FormControlLabel control={< Checkbox defaultChecked />} label="Deaths" />
                <FormControlLabel control={< Checkbox defaultChecked />} label="Vaccinations" />
            </FormGroup>
        </Box>
    );
}
export default Filters
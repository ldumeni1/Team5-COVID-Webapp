import {Box, FormControlLabel, FormGroup, Checkbox, FormLabel} from '@mui/material'

function Filters(props) {

    const casesChange = (event) => (
        props.setCasesFilter(event.target.checked)
    )

    const deathsChange = (event) => (
        props.setDeathsFilter(event.target.checked)
    )

    const vaxChange = (event) => (
        props.setVaxFilter(event.target.checked)
    )

    return (
        <Box color={'black'} margin={2}>
            <FormLabel><b>Select Filters</b></FormLabel>
            <FormGroup>
                <FormControlLabel control={< Checkbox defaultChecked onChange={casesChange} />} label="Cases" />
                <FormControlLabel control={< Checkbox defaultChecked onChange={deathsChange} />} label="Deaths" />
                <FormControlLabel control={< Checkbox defaultChecked onChange={vaxChange} />} label="Vaccinations" />
            </FormGroup>
        </Box>
    );
}
export default Filters
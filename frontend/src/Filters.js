import {
    Box,FormControlLabel,FormGroup,Checkbox, FormControl
} from '@mui/material'
import { useState } from 'react'

function Filters() {


    return ( 
        < Box color = { 'black' } margin = { 2 } >  
        
        <  FormGroup >
        < FormControlLabel control = { < Checkbox defaultChecked /> } label = "Cases" />
        <FormControlLabel  control = { < Checkbox defaultChecked/> } label = "Deaths" />
        < FormControlLabel control = { < Checkbox defaultChecked /> } label = "Vaccinations" />

        </FormGroup>
       
        </Box>
    );
}
export default Filters
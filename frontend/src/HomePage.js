import { AppBar, Grid, Typography, Container, Paper, Box } from '@mui/material'
import { useEffect, useState } from 'react';
import getData from "./axois.js";
import Image from 'mui-image';
import StatCalculations from './StatCalculations'
import Filters from './Filters'
import Map from './Map.js'
import virus from './1020px-SARS-CoV-2.png'

function HomePage() {

    const [selectedCounty, setSelectedCounty] = useState('Baltimore');
    const [selectedState, setSelectedState] = useState('Maryland');

    const [casesFilter, setCasesFilter] = useState(true);
    const [deathsFilter, setDeathsFilter] = useState(true);
    const [vaxFilter, setVaxFilter] = useState(true);

    const [natCases, setNatCases] = useState(0);
    const [natDeaths, setNatDeaths] = useState(0);
    const [stateCases, setStateCases] = useState(0);
    const [stateDeaths, setStateDeaths] = useState(0);
    useEffect(async () => {
        try {
            let response = await getData('http://localhost:3001/get_national_level')
            setNatCases(response.data[response.data.length - 1].nl_cases);
            setNatDeaths(response.data[response.data.length - 1].nl_deaths);
            response = await getData('http://localhost:3001/get_most_recent_state_level')
            for(let state of response.data){
                if (state.sl_state == selectedState){
                    setStateCases(state.sl_cases);
                    setStateDeaths(state.sl_deaths);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }, [selectedState])

    return (
        <div style={{ backgroundColor: 'grey' }}>
            <AppBar position='relative' color='primary'>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <Image src={virus} />
                    </Grid>
                    <Grid item xs={11}>
                        <Typography variant='h1' marginTop={1}>Team 5 - COVID Webapp</Typography>
                    </Grid>
                </Grid>
            </AppBar>
            <Container maxWidth={false}>
                <Grid container spacing={5} paddingY={5}>
                    <Grid item xs={3}>
                        <Paper style={{ backgroundColor: 'whitesmoke' }} elevation={10}>
                            <Filters 
                                setCasesFilter={setCasesFilter}
                                setDeathsFilter={setDeathsFilter}
                                setVaxFilter={setVaxFilter}
                            />
                        </Paper>
                        <Paper style={{ backgroundColor: 'whitesmoke' }} elevation={10}>
                            <StatCalculations
                                selectedCounty={selectedCounty}
                                setSelectedCounty={setSelectedCounty}
                                selectedState={selectedState}
                                setSelectedState={setSelectedState} />
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <Paper elevation={24}>
                        <Paper style={{ backgroundColor: 'whitesmoke' }} elevation={10}>
                            <Typography align='center'>U.S Cases: <b>{natCases}</b> U.S Deaths: <b>{natDeaths}</b></Typography>
                        </Paper>
                        {selectedState ? (<Paper style={{ backgroundColor: 'whitesmoke' }} elevation={10}>
                            <Typography align='center'>{selectedState} Cases: <b>{stateCases}</b> {selectedState} Deaths: <b>{stateDeaths}</b></Typography>
                        </Paper>) : (null)}
                            <Map
                            casesFilter={casesFilter}
                            deathsFilter={deathsFilter}
                            vaxFilter={vaxFilter}
                            selectedCounty={selectedCounty}
                            setSelectedCounty={setSelectedCounty}
                            selectedState={selectedState}
                            setSelectedState={setSelectedState}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
} export default HomePage
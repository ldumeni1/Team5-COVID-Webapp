import { AppBar, Grid, Typography, Container, Paper, Box } from '@mui/material'
import { useEffect, useState } from 'react';
import getData from "./axois.js";
import Image from 'mui-image';
import StatCalculations from './StatCalculations'
import Filters from './Filters'
import Map from './Map.js'
import virus from './1020px-SARS-CoV-2.png'

function HomePage() {

    const [selectedCounty, setSelectedCounty] = useState("Howard");
    const [selectedState, setSelectedState] = useState("Maryland");

<<<<<<< HEAD
    const [natCases, setNatCases] = useState(0);
    const [natDeaths, setNatDeaths] = useState(0);
    useEffect(async () => {
        try {
            const response = await getData('http://localhost:3001/get_national_level')
            setNatCases(response.data[0].nl_cases);
            setNatDeaths(response.data[0].nl_deaths);
        } catch (e) {
            console.log(e);
        }
    }, [])
=======
    const [casesFilter, setCasesFilter] = useState(true);
    const [deathsFilter, setDeathsFilter] = useState(true);
    const [vaxFilter, setVaxFilter] = useState(true);


>>>>>>> 2a386b8fe54b0b6578637f1bf53d70ce9faad5df

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
                            <Typography>U.S Cases: <b>{natCases}</b> U.S Deaths: <b>{natDeaths}</b></Typography>
                        </Paper>
                            <Map
<<<<<<< HEAD
                                selectedCounty={selectedCounty}
                                setSelectedCounty={setSelectedCounty}
                                selectedState={selectedState}
                                setSelectedState={setSelectedState} />
=======
                            casesFilter={casesFilter}
                            deathsFilter={deathsFilter}
                            vaxFilter={vaxFilter}
                            selectedCounty={selectedCounty}
                            setSelectedCounty={setSelectedCounty}
                            selectedState={selectedState}
                            setSelectedState={setSelectedState}/>
>>>>>>> 2a386b8fe54b0b6578637f1bf53d70ce9faad5df
                            {/* <Box width='72vw' height='70vh' backgroundColor='blue'><b>This will be the map</b></Box> */}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
} export default HomePage
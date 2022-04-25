import {AppBar, Grid, Typography, Container, Paper} from '@mui/material'
import Image from 'mui-image';
import Map from './Map.js'
import virus from './1020px-SARS-CoV-2.png'



function HomePage(){

    return(
        <div>
            <AppBar position='relative'>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <Image src={virus}/>
                    </Grid>
                    <Grid item xs={11}>
                        <Typography variant='h1' marginTop={1}>Team 5 - COVID Webapp</Typography>
                    </Grid>
                </Grid>
            </AppBar>
            <Container maxWidth={false}>
               <Grid container spacing={5} paddingY={5}>
                <Grid item xs={3}>
                    <Paper>
                        <Typography variant='h2'>Map</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                <Paper>
                    <Map/>
                </Paper>
                </Grid>
            </Grid> 
            </Container>
        </div>
    );
} export default HomePage
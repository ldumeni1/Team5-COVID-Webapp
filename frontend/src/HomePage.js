import { AppBar, Grid, Typography, Container, Paper, Box} from '@mui/material'
import Image from 'mui-image';
import StatCalculations from './StatCalculations'
import Filters from './Filters'
//import Map from './Map.js'
import virus from './1020px-SARS-CoV-2.png'

function HomePage() {

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
                        <Filters />
                        </Paper>
                        <Paper style={{ backgroundColor: 'whitesmoke' }} elevation={10}>
                            <StatCalculations />
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <Paper elevation={24}>
                            <Box width='72vw' height='70vh' backgroundColor='blue'><b>This will be the map</b></Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
} export default HomePage
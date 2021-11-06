// material
import { Box, Grid, Container, Typography,
Stack,Fab } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppTasks,
  MINT,
  APY,
  SHARE,
  AppNewsUpdate,
  TOKEN,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';
import { MHidden } from '../components/@material-extend';
import scene from '../asset/scene.jpg';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import { Link } from 'react-router-dom'

import { useState, useEffect } from 'react';




function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export  function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export default function DashboardApp(prop) {
  const wallet=prop.wallet;
  const { height, width } = useWindowDimensions();


  return (
    <Page title="DurianFi">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Stack direction="row" alignItems="center" spacing={{ xs: 0.5 }}>
            <Typography variant="h6">Hi, Welcome back <span style={{color:'#0a4a1b'}}>{wallet.shortAddress}</span></Typography>

          </Stack>
        </Box>
        <Grid container spacing={3}>
          <Grid  item xs={12} sm={6} md={3}>
            <TOKEN key={wallet+1}  wallet={prop.wallet}/>
          </Grid>
          <Grid  item xs={12} sm={6} md={3}>
            <MINT key={wallet+1}  wallet={prop.wallet}/>
          </Grid>
          <Grid  item xs={12} sm={6} md={3}>
            <SHARE key={wallet+1}  wallet={prop.wallet}/>
          </Grid>
          <Grid  item xs={12} sm={6} md={3}>
            <APY key={wallet+1}  wallet={prop.wallet}/>
          </Grid>
        </Grid>
        <br/>
        <br/>
        <h1>123</h1>
        <br/>
        <p>You can broaden the appeal of your SharePoint Framework client-side web part by localizing it for different languages spoken by SharePoint users all over the world. In this article, you'll localize a web part to the Dutch (Netherlands) locale, and verify that the localized values are displayed correctly.</p>

        <br/>
        <br/>
        <img src={scene} style={{borderRadius:15}}/>

        <br/>
        <br/>
        <h1>123</h1>
        <br/>
        <p>You can broaden the appeal of your SharePoint Framework client-side web part by localizing it for different languages spoken by SharePoint users all over the world. In this article, you'll localize a web part to the Dutch (Netherlands) locale, and verify that the localized values are displayed correctly.</p>
        <br/>


        <br/>
        <br/>
        <h1>123</h1>
        <br/>
        <p>You can broaden the appeal of your SharePoint Framework client-side web part by localizing it for different languages spoken by SharePoint users all over the world. In this article, you'll localize a web part to the Dutch (Netherlands) locale, and verify that the localized values are displayed correctly.</p>
        <br/>


        <br/>
        <br/>
        <h1>123</h1>
        <br/>
        <p>You can broaden the appeal of your SharePoint Framework client-side web part by localizing it for different languages spoken by SharePoint users all over the world. In this article, you'll localize a web part to the Dutch (Netherlands) locale, and verify that the localized values are displayed correctly.</p>
        <br/>


        {width<543?
          <Link to={'/swapandstake'}>
            <Fab sx={{
              position: 'fixed',
              bottom: 26,
              right: 26,
              color: 'white',
              bgcolor: '#1a822d',
              '&:hover': {
                  bgcolor: '#06962d',
                }
              }}  to="/signup" aria-label="edit">
              <SwapHorizOutlinedIcon />
            </Fab>
          </Link>:''
        }

      </Container>
    </Page>
  );
}

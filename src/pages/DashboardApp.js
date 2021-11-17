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
import Alert from '@mui/material/Alert';

import { useState, useEffect } from 'react';

import durian from '../asset/durian.png'
import home3 from '../asset/home3.png'
import home1 from '../asset/home1.png'
import home2 from '../asset/home2.png'



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
        <br/>
        <Grid container
        >
          <Grid
          style={{
            backgroundColor:'#5d057d',
            borderRadius:21,
            padding:40, margin:'auto'
          }} item xs={12} sm={12} md={6}>
            <h1 style={{color:'#fff',}}>About DurianFi</h1>
            <br/>
            <p style={{color:'#fff',}}>
            Stake UNI-V2 (MATIC/DurianFi) liquidity to earn DurianFi.
            You can unstake your share anytime to retrieve back your UNI-V2 liquidity token and
            remove liquidity from the pool.
            </p>
            <br/>
            <p>


            </p>
          </Grid>
          <Grid
          item xs={12} sm={12} md={5}>
            <img src={home1} style={{borderRadius:15,margin:'auto'}}/>
          </Grid>
        </Grid>
        <br/>
        <br/>
        <br/>
        <Grid container direction={width<876?"column-reverse":"row"}
        style={{

          borderRadius:21,
          padding:40,
        }} >
          <Grid  item xs={12} sm={12} md={5}>
            <img src={home2} style={{borderRadius:15,margin:'auto'}}/>
          </Grid>
          <Grid
          style={{
            backgroundColor:'#084285',
            borderRadius:21,
            padding:40, margin:'auto'
          }}  item xs={12} sm={12} md={6}>
            <h1 style={{color:'#fff',}}>Harvest</h1>
            <br/>
            <p style={{color:'#fff',}}>
            Earn DurianFi when you cast harvest action (costing some gas) based on your staked duration and total share.
            The system will automatically harvest for you when you stake, unstake or when using stake/swap.
            </p>
            <br/>
            <p>


            </p>
          </Grid>
        </Grid>
        <br/>
        <br/>
        <br/>
        <Grid container
        style={{

          borderRadius:21,
          padding:40,
        }}>
          <Grid style={{
            backgroundColor:'#d44908',
            borderRadius:21,
            padding:40, margin:'auto'
          }}  item xs={12} sm={12} md={6}>
            <h1 style={{color:'#fff',}}>Quick Start</h1>
            <br/>
            <p style={{color:'#fff',}}>
            Head over to "Swap and Stake" section and start using this shortcut feature.
            It will allow you to swap MATIC into DurianFi, add liquidity to QuickSwap and
            stake your UNI-V2 for you.
            </p>

          </Grid>
          <Grid  item xs={12} sm={12} md={5}>
            <br/>
            <img src={home3} style={{borderRadius:15,margin:'auto'}}/>
          </Grid>
        </Grid>

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

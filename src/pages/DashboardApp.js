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

import durian from '../asset/durian.png'
import sns from '../asset/sns.PNG'




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
        <br/>
        <br/>
        <br/>
        <Grid container
        justifyContent="center"
        alignItems="center" spacing={12}>
          <Grid  item xs={12} sm={12} md={6}>
            <h1 style={{color:'#1a822d',}}>About DurianFi</h1>
            <br/>
            <br/>
            <p>
            Stake Cake-LP (BNB/DurianFi) liquidity to earn DurianFi.
            You can unstake your share anytime to retrieve back your CAKE-LP liquidity token and
            remove liquidity from the pool.
            </p>
            <br/>
            <p>

            </p>
          </Grid>
          <Grid  item xs={12} sm={12} md={6}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5fOJD2cB4rQQyyNIvVMJZ5jl7rwFDry2Rcw&usqp=CAU' style={{borderRadius:15,margin:'auto'}}/>
          </Grid>
        </Grid>
        <br/>
        <br/>
        <br/>
        <Grid container direction={width<543?"column-reverse":"row"} spacing={3}>
          <Grid  item xs={12} sm={12} md={6}>
            <img src='https://us.123rf.com/450wm/patrimonio/patrimonio1806/patrimonio180600045/104167017-mascot-icon-illustration-of-an-organic-farmer-wearing-a-hat-holding-a-plant-by-the-palm-of-his-hand-.jpg?ver=6' style={{borderRadius:15}}/>
          </Grid>
          <Grid  item xs={12} sm={12} md={6}>
          <br/>
          <br/>
            <h1 style={{color:'#1a822d',}}>Harvest</h1>
            <br/>
            <br/>
            <p>
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
        <Grid container spacing={3}>
          <Grid  item xs={12} sm={12} md={6}>
          <br/>
            <h1 style={{color:'#1a822d',}}>Quick Start</h1>
            <br/>
            <br/>
            <p>
            Head over to "Swap and Stake" section and start using this shortcut feature.
            It will allow you to swap BNB into DurianFi, add liquidity to pancakeswap and
            stake your CAKE-LP for you.
            </p>

          </Grid>
          <Grid  item xs={12} sm={12} md={6}>
            <img src={sns} style={{borderRadius:15}}/>
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

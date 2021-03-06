import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography,Grid,Button } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { LoginForm } from '../components/authentication/login';
import AuthSocial from '../components/authentication/AuthSocial';

import durian from '../asset/durian.jpg'
import CircularProgress from '@mui/material/CircularProgress';
import metamask from '../asset/metamask.png'

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));



// ----------------------------------------------------------------------

export default function Login(prop) {
  const wallet=prop.wallet

  return (
    <RootStyle title="Login">
      <Container >
          <ContentStyle>
                <Grid container flexDirection='column' justifyContent="center" alignItems="center"
                  style={{
                   borderRadius:21,
                   padding:40, margin:'auto'
                 }}>
                    <img src={metamask} alt="" style={{width:200}}/>
                    <Typography style={{color:'#fff',}} variant="h4" gutterBottom>
                      Sign in with Metamask
                    </Typography>
                    <Typography style={{color:'#fff',}} sx={{  }}>Don’t have Metamask? &nbsp;
                      <Link underline="none" variant="subtitle2" target="_blank" href="https://metamask.io">
                        Get started
                      </Link>
                    </Typography>
                    <br/>
                    <br/>
                    <br/>
                    <Button
                     elevation={0}
                     disabled={prop.loginloading||(window.ethereum?false:true)}
                     onClick={()=>wallet.address?prop.changeNetwork('MATIC'):prop.init()}
                     color='success'
                     variant="contained"
                     sx={{height:45,background:'#1d7a1a'}}
                     style={{width:321}}
                     >

                       {prop.loginloading?<CircularProgress size={23} style={{color:'white'}}/>:
                             <small style={{color:'white'}}>
                              {wallet.address?'Switch to MATIC'
                                :'Connect'}
                             </small>
                       }
                    </Button>

                </Grid>
          </ContentStyle>
      </Container>

    </RootStyle>
  );
}

import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
// components
import { MHidden } from '../../components/@material-extend';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import { useState } from 'react';
import { Container,  Grid,CircularProgress,TextField,Alert,Snackbar,Button } from '@mui/material';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AddIcon from '@mui/icons-material/Add';




import duriannobg from '../../asset/duriannobg.png'
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  
  backgroundColor: 'transparent',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};
export default function DashboardNavbar(prop) {
  const wallet=prop.wallet
  const [loading, setLoading] = useState(false);
  const [claimloading, setclaimloading] = useState(false);
  let disabled=true;
  let claimdisabled=true;



  if(wallet.address){
    disabled=wallet.view.canharvest?false:true
    claimdisabled=wallet.view.canclaim && wallet.view.airdropbalanceOf>1000*1e18?false:true

  }
  function handleClick() {
    setLoading(true);

    wallet.contract.methods.harvest().send({from: wallet.address,}, function(error, transactionHash){

    }).catch(e=>{
      console.log(e)
    }).then(()=>{
      setLoading(false);
      prop.init();
    });
  }
  function claim() {
    setclaimloading(true);

    wallet.contractairdrop.methods.claim().send({from: wallet.address,}, function(error, transactionHash){

    }).catch(e=>{
      console.log(e)
    }).then(()=>{
      setclaimloading(false);
      prop.init();
    });
  }
  return (
    <RootStyle>
      <ToolbarStyle>
        <MHidden width="lgUp">
          <IconButton onClick={prop.onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <Button
           elevation={0}
           color='success'
           onClick={claim}
           disabled={claimdisabled||claimloading}
           variant="contained"
           sx={{width :'100%',height:25,background:'#1d7a1a'}}

           >
             {claimloading?<CircularProgress color="inherit"  size={12 } sx={{width:15}}/>:<><AddIcon  style={{color:'white',width:15}} /><p style={{color:'white'}}>Claim</p></>}

          </Button>
          <Button
           elevation={0}
           color='success'
           onClick={handleClick}
           disabled={disabled||loading}
           variant="contained"
           sx={{width :'100%',height:25,background:'#1d7a1a'}}

           >
             {loading?<CircularProgress color="inherit"  size={12 } sx={{width:15}}/>:<><FlashOnIcon  style={{color:'white',width:15}} /><p style={{color:'white'}}>Harvest</p></>}

          </Button>

          <Button
           elevation={0}
           onClick={()=>{
             const wasAdded =  window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                  type: 'ERC20', // Initially only supports ERC20, but eventually more!
                  options: {
                    address: prop.wallet.contractadr.contract, // The address that the token is at.
                    symbol: 'DurianFi', // A ticker symbol or shorthand, up to 5 chars.
                    decimals: 18, // The number of decimals in the token
                    image: 'https://avatars.githubusercontent.com/u/93725547?s=400&u=6b7c8919d3b9f3f3ad0e01965ba325eebf488b82&v=4'
                  },
                },
              });
           }}
           >
              <img src={duriannobg} style={{width:30}} />
          </Button>

        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}

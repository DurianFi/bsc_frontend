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

import { useEffect, useState, useRef } from "react";
import FlashOnIcon from '@mui/icons-material/FlashOn';

// ---------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function Loginbutton(prop) {
  const wallet=prop.wallet
  const[loginloading,setloginloading]=useState(false)

  async function changeNetwork(network=''){
   const CHAIN_INFO = {
     'BNB':{
       chainId: '0x38',
       chainName: 'Binance Smart Chain',
       nativeCurrency: {
           name: 'Binance Coin',
           symbol: 'BNB',
           decimals: 18
       },
       rpcUrls: ['https://bsc-dataseed.binance.org/'],
       blockExplorerUrls: ['https://bscscan.com/']
     },
     'FTM':{
       chainId: '0xfa',
       chainName: 'Fantom Opera',
       nativeCurrency: {
           name: 'FTM',
           symbol: 'FTM',
           decimals: 18
       },
       rpcUrls: ['https://rpc.ftm.tools/'],
       blockExplorerUrls: ['https://ftmscan.com/']
     },
     'MATIC':{
       chainId: '0x89',
       chainName: 'Matic Mainnet',
       nativeCurrency: {
           name: 'MATIC',
           symbol: 'MATIC',
           decimals: 18
       },
       rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
       blockExplorerUrls: ['https://polygonscan.com/']
     },
     'AVAX':{
       chainId: '0xa86a',
       chainName: 'Avalanche Network',
       nativeCurrency: {
           name: 'AVAX',
           symbol: 'AVAX',
           decimals: 18
       },
       rpcUrls: ['https://api.avax.network/ext/bc/C/rpc/'],
       blockExplorerUrls: ['https://cchain.explorer.avax.network/']
     },

   }

  setloginloading(true)
   const tx = await window.ethereum.request({method: 'wallet_addEthereumChain', params:[CHAIN_INFO[network]]}).catch()
   if (tx) {
       console.log(tx)
   }
  setloginloading(false)
  }

  return (
    <Button
      startIcon={<FlashOnIcon  style={{color:'white',width:15}} />}
     disabled={loginloading||(window.ethereum?false:true)}
     onClick={()=>wallet.address?changeNetwork('MATIC'):prop.init()}
     color='success'
     variant="contained"
     sx={{width:166,height:45,background:'#1d7a1a'}}
     >

       {loginloading?<CircularProgress size={23} style={{color:'white'}}/>:
             <small style={{color:'white'}}>
              {wallet.address?'Switch to MATIC'
                :'Connect'}
             </small>
       }
    </Button>
  );
}

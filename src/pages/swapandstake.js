import { useFormik } from 'formik';
import { useState } from 'react';
// material
import { Container, Stack, Grid,CircularProgress,TextField,Alert,Snackbar, } from '@mui/material';
// components
import Page from '../components/Page';
import styled from "@emotion/styled";

import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Loginbutton from '../components/Loginbutton';
import {needlogin} from '../App.js'



// ----------------------------------------------------------------------

export default function Swapandstake(prop) {
  const wallet=prop.wallet;
  const [disabled, setdisabled] = useState(false);
  const [input,setinput] = useState('');
  // console.log(wallet.weiBalance)
  const [loading, setLoading] = useState(false);
  const [snacksuccess, setsnacksuccess] = useState(false);
  const [snackerr, setsnackerr] = useState(false);

  const [txid,settxid] = useState('');

  const inputval=input

  const snacksuccesshandler = (event, reason) => {
    setsnacksuccess(false);
  };

  function handleClick() {
    setLoading(true);
    let amt=input?wallet.web3.utils.toWei(input):0;
    // if(parseFloat(input)==0||input==''){
    //   setinput('0');
    // }

    wallet.contract.methods.swapStake().send({from: wallet.address,value:amt}, function(error, transactionHash){

      if(transactionHash){
        setsnacksuccess(true);
        settxid(transactionHash);
      }
    }).then(()=>{
      setLoading(false);
      setinput('');
      prop.init();
    }).catch(e=>{
      console.log(e)
      setLoading(false);
      setinput('');
      prop.init();
    });
  }
  const handlesetinput = (e) => {
    const re = new RegExp('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')
    if (e.target.value === '' || re.test(e.target.value))
      setinput(e.target.value+'');
  };

  var eth
  var total
  var gas=0.001;
  // let getGasPrice ;
  if(needlogin(wallet)==false){
    if(wallet.etherBalance>gas)
      Promise.all([
        wallet.contract.methods.swapStake().estimateGas('0xb8cdf9ad',{from: wallet.address, value: ''+wallet.weiBalance}),
        wallet.web3.eth.getGasPrice()
      ]).then(r=>{
        // console.log(r);
        gas=r[0]*r[1]*2/1e18
      });

    eth=wallet.view.matic
    total=input?(parseFloat(eth)*parseFloat(input)).toFixed(2):0
  }
  function max(){
    let ret = (parseFloat(wallet.etherBalance)-parseFloat(gas));
    // await wallet.contract.methods.swapStake().
    return ret>0?ret.toString():'0';
  }
// console.log(1)
  const StyledInputElement = styled('input')`
  width: 200px;
  font-size: 1.1rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 600;
  line-height: 1.4375em;
  background: rgb(243, 246, 249);
  border: none;
  border-radius: 0;
  margin-left:16px;
  /* color: #20262d; */
  transition: width 300ms ease;

  &:hover {
  }

  &:focus {
    outline: none;
    transition: width 200ms ease-out;
  }
`;
  return (
    <Page title="DurianFi">
      <Container>
        <br/>
        <br/>
        <Snackbar
         anchorOrigin={{ open: false,
            vertical: 'top',
            horizontal: 'right'
         }}
         open={snacksuccess}  autoHideDuration={4000} onClose={snacksuccesshandler}>
          <Alert onClose={snacksuccesshandler} severity="success" sx={{ width: '100%' }}>
            Transaction Sent: {txid.slice(0,16)}
          </Alert>
        </Snackbar>

          <Grid container
          direction="row"
          justifyContent="center"
          alignItems="center" sx={{ flexGrow: 1 }} >
            <Card variant="outlined" sx={{ padding:1,minWidth: 300,maxWidth:432,flexGrow: 1 }}>
              <p style={{fontSize:12,color:'gray'}}>Swap and Stake</p>
              <br/>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <p style={{fontSize:10,color:'gray',marginRight:3}}>Balance: {parseFloat(wallet.etherBalance).toFixed(4)}</p>
              </Grid>
              <Card variant="outlined" sx={{background: 'rgb(243, 246, 249)',padding:1}}>
                <Card variant="outlined" sx={{background: 'white',padding:1,maxWidth:105}}>

                  <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start">
                    <img src='https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912' style={{width:23,borderRadius: 150}}/>
                    <h4>&nbsp;MATIC</h4>
                  </Grid>

                </Card>
                <br/>

                <Stack direction="row" alignItems="center" spacing={{  }}>
                  <input
                    placeholder="0.0"
                    id="swapstake"
                    value={input}
                    onChange={handlesetinput}
                    autoFocus={true}
                    // variant="standard"
                    style={{
                      border: 'none',
                    }}
                  />
                  <Box sx={{flexGrow:1}}/>
                  <Button onClick={()=>setinput(max())}>Max</Button>
                </Stack>

                <br/>
              </Card>
              <br/>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <p style={{fontSize:10,color:'gray'}}>{total?'$ '+total:''}</p>
              </Grid>
             <Button
              elevation={0}
              color='success'
              onClick={handleClick}
              disabled={loading||!input||input==0}
              variant="contained"
              sx={{width:'100%',height:45,background:'#1d7a1a'}}
              >
                {loading?<CircularProgress color="inherit"  size={23 } sx={{width:15}}/>:<small style={{color:'white'}}>Swap and Stake</small>}

             </Button>
            </Card>
          </Grid>

      </Container>
    </Page>
  );
}

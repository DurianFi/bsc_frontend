import { useFormik } from 'formik';
import { useState } from 'react';
// material
import { Container, Stack, Grid,CircularProgress,TextField, } from '@mui/material';
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
// ----------------------------------------------------------------------

export default function Swapandstake(prop) {
  const wallet=prop.wallet;
  const [disabled, setdisabled] = useState(false);
  const [input,setinput] = useState('');
  // console.log(wallet.weiBalance)
  const [loading, setLoading] = useState(false);
  function handleClick() {
    setLoading(true);
    let amt=input?wallet.web3.utils.toWei(input):0;
    // if(parseFloat(input)==0||input==''){
    //   setinput('0');
    // }

    wallet.contract.methods.swapStake().send({from: wallet.address,value:amt}, function(error, transactionHash){
      setLoading(false);
      setinput(0.0);
      prop.init();
    });
  }
  const handlesetinput = (e) => {
    setinput(e.target.value+'');
  };


  var gas=0;
  // let getGasPrice ;
  if(wallet.address)
    Promise.all([
      wallet.contract.methods.swapStake().estimateGas('0xb8cdf9ad',{from: wallet.address, value: wallet.weiBalance}),
      wallet.web3.eth.getGasPrice()
    ]).then(r=>{
      // console.log(r);
      gas=r[0]*r[1]*2/1e18
    });

  function max(){
    let ret = (parseFloat(wallet.etherBalance)-parseFloat(gas));
    // await wallet.contract.methods.swapStake().
    return ret>0?ret.toString():'0';
  }
// console.log(1)
  const StyledInputElement = styled('input')`
  width: 200px;
  font-size: 1rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.4375em;
  background: rgb(243, 246, 249);
  border: none;
  border-radius: 0;
  padding:  10px;
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
    <Page title="Dashboard: Products | Minimal-UI">
      <Container>
        <br/>
        <br/>
        <Box>
          <Grid container
          direction="row"
          justifyContent="center"
          alignItems="center"  >
            <Card variant="outlined" sx={{ padding:1,minWidth: 300,maxWidth:555 }}>
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
                <Card variant="outlined" sx={{background: 'white',padding:1,maxWidth:85}}>

                  <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start">
                    <img src='https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xB8c77482e45F1F44dE1745F52C74426C631bDD52/logo.png' style={{width:23,borderRadius: 150}}/>
                    <h4>&nbsp;BNB</h4>
                  </Grid>

                </Card>
                <br/>
                <StyledInputElement
                  placeholder="0.0"
                  value={input}
                  onChange={handlesetinput}
                  autoFocus
                  type="number"
                />
                <Button onClick={()=>setinput(max())}>Max</Button>
                <br/>
              </Card>
              <br/>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <p style={{fontSize:10,color:'gray'}}>$ 1500.00</p>
              </Grid>
             <Button
              color="secondary"
              onClick={handleClick}
              disabled={loading}
              loadingPosition="start"
              variant="contained"
              sx={{width:'100%',height:45,backgroundColor:'#1d7a1a'}}
              >
                {loading?<CircularProgress color="inherit"  sx={{height:15}}/>:<small>Swap and Stake</small>}

             </Button>
            </Card>
          </Grid>
        </Box>

      </Container>
    </Page>
  );
}

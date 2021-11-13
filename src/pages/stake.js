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

import durian from '../asset/durian.png'


// ----------------------------------------------------------------------

export default function Swapandstake(prop) {
  const wallet=prop.wallet;
  const [disabled, setdisabled] = useState(false);
  const [disabled2, setdisabled2] = useState(false);
  const [input,setinput] = useState('');
  // console.log(wallet.weiBalance)
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [snacksuccess, setsnacksuccess] = useState(false);
  const [txid,settxid] = useState('');

  var eth=0;
  var total=0;
  var univ2=0;
  var staked=0;
  var allowance=0;
  var approve=true;
  var canstake=false;
  var canunstake=false;

  const snacksuccesshandler = (event, reason) => {
    setsnacksuccess(false);
  };

    function handlestake() {
      setLoading(true);


      if(approve){
        wallet.contractpair.methods.approve(wallet.contractadr.contract,univ2).send({from: wallet.address }, function(error, transactionHash){

          if(transactionHash){
            setsnacksuccess(true);
            settxid(transactionHash);
          }
        }).then(()=>{
          setLoading(false);
          prop.init();
        }).catch(e=>{
          console.log(e)
          setLoading(false);
          prop.init();
        });
      }else{
        wallet.contract.methods.stake().send({from: wallet.address}, function(error, transactionHash){

          if(transactionHash){
            setsnacksuccess(true);
            settxid(transactionHash);
          }
        }).then(()=>{
          setLoading(false);
          prop.init();
        }).catch(e=>{
          console.log(e)
          setLoading(false);
          prop.init();
        });
      }
    }
  function handleunstake() {
    setLoading2(true);
    let amt=input?wallet.web3.utils.toWei(input):0;
    // if(parseFloat(input)==0||input==''){
    //   setinput('0');
    // }

    wallet.contract.methods.unstake().send({from: wallet.address}, function(error, transactionHash){

      if(transactionHash){
        setsnacksuccess(true);
        settxid(transactionHash);
      }
    }).then(()=>{
      setLoading2(false);
      prop.init();
    }).catch(e=>{
      console.log(e)
      setLoading2(false);
      prop.init();
    });
  }
  if(wallet.address){

    eth=wallet.view.bnb
    univ2=wallet.view.pairbalanceOf
    staked=wallet.view.getmystake
    allowance=wallet.view.pairallowance

    canstake=wallet.view.canstake
    canunstake=wallet.view.canunstake
    approve=univ2>allowance?true:false
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
              <p style={{fontSize:12,color:'gray'}}>Stake</p>
              <br/>
              <Card variant="outlined" sx={{background: 'white',padding:1,width:203}}>
                <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start">
                  <img src='https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912' style={{zIndex:1111,width:23,borderRadius: 150}}/>
                  <img src={durian} style={{width:26,borderRadius: 150,marginLeft:-7}}/>
                  <h4>&nbsp;&nbsp;MATIC/DurianFi</h4>
                </Grid>
              </Card>
              <br/>
              <br/>
              <Stack direction="column" alignItems="center" spacing={{ xs: 0 }}>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <p style={{fontSize:10,color:'gray',marginRight:3}}>UNI-V2: {parseFloat(univ2/1e18).toFixed(4)}</p>
              </Grid>
              <Button
               elevation={0}
               color='success'
               onClick={handlestake}
               disabled={!canstake||loading}
               variant="contained"
               sx={{width:'100%',height:45,background:'#1d7a1a'}}
               >
                 {loading?<CircularProgress color="inherit"  size={23 } sx={{width:15}}/>
                         :approve?<small style={{color:'white'}}>Approve</small>
                                 :<small style={{color:'white'}}>Stake</small>}
              </Button>
              <br/>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
              >
                <p style={{fontSize:10,color:'gray',marginRight:3}}>Stake: {parseFloat(staked/1e18).toFixed(4)}</p>
              </Grid>
              <Button
               elevation={0}
               color='success'
               onClick={handleunstake}
               disabled={!canunstake||loading2}
               variant="contained"
               sx={{width:'100%',height:45,background:'#1d7a1a'}}
               >
                 {loading2?<CircularProgress color="inherit"  size={23 } sx={{width:15}}/>:<small style={{color:'white'}}>Unstake</small>}
              </Button>
              </Stack>
            </Card>
          </Grid>

      </Container>
    </Page>
  );
}

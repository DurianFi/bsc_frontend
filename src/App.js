// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import  './app.css';
// components
import Login from './pages/Login';
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import Web3 from 'web3';
import { useEffect, useState, useRef } from "react";
import Jazzicon from "@metamask/jazzicon";
import styled from "@emotion/styled";
import axios from 'axios';

import abi from './abi/contract.json';
import abirouter from './abi/uniswaprouter.json';
import abipair from './abi/uniswappair.json';
import abiairdrop from './abi/airdrop.json';





// ----------------------------------------------------------------------

export default function App() {

  const[wallet,setwallet]=useState({
    loading:true,
    web3:null,
    address:null,
    shortAddress:null,
    networkId:0,
    weiBalance:0,
    etherBalance:0,
    symbol:null,
    contract:null,
    contractrouter:null,
    contractpair:null,
    view:null,
    jazzicon:null
  })

  function handlesetwallet(input){
    setwallet({...input});
  }
  async function init(){
    // if(loginloading) return false
    // console.log(loginloading)

    let data=await connect();
    // setloginloading(false)

    if(data){
      setwallet({...data});
      return true
    }

    return false

  }

  async function connect() {


     if(!window.ethereum) return false

     const web3 = new Web3(window.ethereum)

     // setloginloading(true)
 console.log('awaiting connection...')
     let err=false
     await window.ethereum.enable().catch(e=>err=e);
     if(err) return false

     let _address =await web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress);
     let _networkId = await web3.eth.net.getId();
     let _wei = '';
     let _eth = '';


    await web3.eth.getBalance(_address,(err,res)=>{
        _wei=res?res:'0'
        _eth=res?web3.utils.fromWei(_wei,'ether'):'0';
     }).catch(e=>err=e);
     if(err) return false

     if(!validnetwork(_networkId))
       return{
         loading:false,
         web3:web3,
         address:_address,
         shortAddress:_address.slice(0, 6)+'...'+_address.slice(_address.length - 4,_address.length),
         networkId:_networkId,
         weiBalance:_wei,
         etherBalance:_eth,
         symbol:'MATIC',
       }


     const contract=new web3.eth.Contract(abi,contractadr().contract,{from:_address});
     const contractrouter=new web3.eth.Contract(abirouter,contractadr().router,{from:_address});
     const contractpair=new web3.eth.Contract(abipair,contractadr().pair,{from:_address});
     const contractairdrop=new web3.eth.Contract(abiairdrop,contractadr().airdrop,{from:_address});

     let view={};

     await Promise.all([
       contract.methods.pairadr().call().then(res=>view.pairadr=res).catch((err)=>console.log(err)),
       contract.methods.apy().call().then(res=>view.apy=res).catch((err)=>console.log(err)),
       contract.methods.apy1().call().then(res=>view.apy1=res).catch((err)=>console.log(err)),
       contract.methods.canharvest().call().then(res=>view.canharvest=res).catch((err)=>console.log(err)),
       contract.methods.canstake().call().then(res=>view.canstake=res).catch((err)=>console.log(err)),
       contract.methods.canunstake().call().then(res=>view.canunstake=res).catch((err)=>console.log(err)),
       contract.methods.getmystake().call().then(res=>view.getmystake=res).catch((err)=>console.log(err)),
       contract.methods.gettotalstake().call().then(res=>view.gettotalstake=res).catch((err)=>console.log(err)),
       contract.methods.getreserves().call().then(res=>view.getreserves=res).catch((err)=>console.log(err)),
       contract.methods.mintamount().call().then(res=>view.mintamount=res).catch((err)=>console.log(err)),
       contract.methods.stakeshare().call().then(res=>view.stakeshare=res).catch((err)=>console.log(err)),
       contract.methods.univ2supply().call().then(res=>view.univ2supply=res).catch((err)=>console.log(err)),
       contract.methods.totalSupply().call().then(res=>view.totalSupply=res).catch((err)=>console.log(err)),

       contract.methods.balanceOf(_address).call().then(res=>view.balanceOf=res).catch((err)=>console.log(err)),

       contractpair.methods.allowance(_address,contractadr().contract).call().then(res=>view.pairallowance=res).catch((err)=>console.log(err)),
       contractpair.methods.balanceOf(_address).call().then(res=>view.pairbalanceOf=res).catch((err)=>console.log(err)),

       contract.methods.balanceOf(contractadr().airdrop).call().then(res=>view.airdropbalanceOf=res).catch((err)=>console.log(err)),
       contractairdrop.methods.canclaim().call().then(res=>view.canclaim=res).catch((err)=>console.log(err)),

       axios.get('https://poloniex.com/public?command=returnTicker').then(res=>view.pricepair=res.data)
     ]).catch(e=>err=e);
     if(err) return false


     let matic=view.pricepair.USDT_MATIC.last;
     let price=matic?matic*view.getreserves[0]/view.getreserves[1]:0
     let marketcap=price*view.totalSupply/1e18

     view.matic=matic
     view.price=price
     view.marketcap=marketcap
     view.totalvalue=price?(price*view.balanceOf/1e18).toFixed(4):0
     view.totalvalueharvest=price?(price*view.mintamount/1e18).toFixed(4):0
     view.totalvaluestake=matic?(matic*view.stakeshare*2*view.getreserves[0]/1e18/10000).toFixed(4):0

     const StyledIdenticon = styled.div`
       height: 1rem;
       width: 1rem;
       border-radius: 1.125rem;
       display:inline-block;
       margin-left:0.5rem;
     `;
     const _provider={
       loading:false,
       web3:web3,
       address:_address,
       shortAddress:_address.slice(0, 6)+'...'+_address.slice(_address.length - 4,_address.length),
       networkId:_networkId,
       weiBalance:_wei,
       etherBalance:_eth,
       symbol:'MATIC',
       contract:contract,
       contractrouter:contractrouter,
       contractpair:contractpair,
       contractairdrop:contractairdrop,
       view:view,
       contractadr:contractadr(),
       jazzicon:<StyledIdenticon ref={(nodeElement) => {
                                   if (nodeElement) {
                                     nodeElement.innerHTML = ''
                                     nodeElement.appendChild(Jazzicon(16, parseInt(_address.slice(2, 10), 16)))
                                   }
                                 }}
                               ></StyledIdenticon>
     };
     console.log(_provider);
     // console.log(_provider.view.pairadr);

     // setprovider(_provider);
     return _provider;
 }
  function contractadr(){
   return{
     contract:'0x8035647FEdc2636e543c098e83A5D3490caC180b',
     router:'0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
     pair:'0x11B88a581622FA7a7709a725e2508d2e1461257F',
     airdrop:'0xFe6CCE8ccEEa7D1a29597070876DC6197eF00cA3',
   }
 }


  useEffect(()=>{
    if(window.ethereum){
      window.ethereum.on("accountsChanged", async () => {
        init()
      });
      window.ethereum.on("chainChanged", async () => {
        init()
      });

     // window.ethereum
    }
    init()

    setInterval(async function(){

      init()
    }, 5000);
  },[])

  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router  key={wallet} wallet={wallet} init={init}/>
    </ThemeConfig>
  );
}

export function validnetwork(a){
 return (a==137)?true:false
}

export function needlogin(wallet){
  return window.ethereum&&wallet.address&&validnetwork(wallet.networkId)?false:true;
}

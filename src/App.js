// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
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
// ----------------------------------------------------------------------

export default function App() {
  const[loginloading,setloginloading]=useState(false)
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
    if(loginloading) return false
    console.log(loginloading)

    setloginloading(true)
    let data=await connect();
    setloginloading(false)

    if(data){
      setwallet({...data});
      return true
    }

    return false

  }

  async function connect() {


     if(!window.ethereum) return false

     const web3 = new Web3(window.ethereum)

     setloginloading(true)
 console.log('awaiting connection...')
     let err=false
     await window.ethereum.enable().catch(e=>err=e);
     if(err) return false

     let _address =await web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress);
     let _networkId = await web3.eth.net.getId();
     let _wei = '';
     let _eth = '';


      web3.eth.getBalance(_address,(err,res)=>{
        _wei=res  ;
        _eth=web3.utils.fromWei(res,'ether');
     })

     if(!validnetwork(_networkId))
       return{
         loading:false,
         web3:web3,
         address:_address,
         shortAddress:_address.slice(0, 6)+'...'+_address.slice(_address.length - 4,_address.length),
         networkId:_networkId,
         weiBalance:_wei,
         etherBalance:_eth,
         symbol:'BNB',
       }


     const contract=new web3.eth.Contract(abi,contractadr().contract,{from:_address});
     const contractrouter=new web3.eth.Contract(abirouter,contractadr().router,{from:_address});
     const contractpair=new web3.eth.Contract(abipair,contractadr().pair,{from:_address});

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

       axios.get('https://poloniex.com/public?command=returnTicker').then(res=>view.pricepair=res.data)
     ]);

     let bnb=view.pricepair.USDT_BNB.last;
     let price=bnb*view.getreserves[0]/view.getreserves[1]
     let marketcap=price*view.totalSupply/1e18

     view.bnb=bnb
     view.price=price
     view.marketcap=marketcap

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
       symbol:'BNB',
       contract:contract,
       contractrouter:contractrouter,
       contractpair:contractpair,
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
     contract:'0xF8789137EfDEA4359B148f59505C8a61Ce141BD7',
     router:'0x10ED43C718714eb63d5aA57B78B54704E256024E',
     pair:'0x42B6b7a39fe736E8798d2DAB423ac3aCbf3149EE',
   }
 }
  function validnetwork(a){
   return (a==56||a==97)?true:false
 }

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
       blockExplorerUrls: ['https://explorer.matic.network/']
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

  useEffect(()=>{
    if(window.ethereum){
      window.ethereum.on("accountsChanged", async () => {
        init()
      });
      window.ethereum.on("chainChanged", async () => {
        init()
      });
    }
    init()

    // setInterval(async function(){
    //   if(wallet.address&&validnetwork(wallet.networkId)){
    //     // _;
    //   }
    //   init()
    // }, 6000);
  },[])

  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      {window.ethereum&&wallet.address&&validnetwork(wallet.networkId)?
        <Router key={wallet} wallet={wallet} init={init}/>
        :<Login key={wallet} loginloading={loginloading} changeNetwork={changeNetwork} wallet={wallet} init={init}/>}
    </ThemeConfig>
  );
}

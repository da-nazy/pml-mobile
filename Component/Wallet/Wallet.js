import React,{useEffect,useContext} from 'react';
import {UserContext} from '../DataProvider/UserContext';
import {WebView} from 'react-native-webview';

export default function Wallet(){
    const usercontext=useContext(UserContext);
    const{userWallet,setUserWallet}=usercontext;
  
  
    
    return(
     <WebView source={{uri:'https://ewallet.pmt.com.ng'}}/>
    )
}
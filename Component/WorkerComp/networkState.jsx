import React ,{useEffect,useState} from 'react';
import { useNetInfo, NetInfoState } from "@react-native-community/netinfo";
export default function useNetworkState() {
  const networkState=useNetInfo();
  const[status,setStatus]=useState(null);
   useEffect(()=>{
     if(networkState.isConnected){
        setStatus(true);
     }else{
        setStatus(false);
     }
   },[networkState.isConnected]);

   return (status);
}

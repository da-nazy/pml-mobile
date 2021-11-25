import React, { useState,useEffect,useContext,useCallback,useRef} from 'react';
import {View,StyleSheet,Text,ScrollView,RefreshControl, Dimensions} from 'react-native';
import { IconComp } from '../WorkerComp/ExternalFunction';
import { AppColor } from '../WorkerComp/AppColor';
import ParcelComp from './ParcelComp';
import LoaderComp from '../WorkerComp/LoaderComp';
import {UserContext }from '../DataProvider/UserContext';
import {api,apiRequest} from '../WorkerComp/Api';
import Custombtm from '../WorkerComp/Custombtm';
import Pickupoperation from './Pickupopeation';
export default function Ship(){
    const usercontext=useContext(UserContext);
    const{user,authUser}=usercontext;
    const [userParcel,setUserParcel]=useState(null);
          
     const pickRef= useRef(null);

    const[appDetails,setAppDetails]=useState({
        load:false,
        refresh:false,
        currentPickup:null,

    })
  
    /**
     * TODO: sort by date and pickupstatus , swipe refresh
     * 
     */
    const openPickOperation=(e)=>{
        setAppDetails({appDetails,currentPickup:e},pickRef.current.open());
           
    }

    useEffect(()=>{
       if(!userParcel){
        getUserPickup()
       }
    },[userParcel])
      
    const wait=(timeOut)=>{
        return new Promise(resolve=>setTimeout(resolve,timeOut));
    }
     
    const onRefresh=useCallback(()=>{
     setAppDetails({...appDetails,refresh:true});
     getUserPickup();
     wait(200).then(()=>setAppDetails({...appDetails,refresh:false}))
    },[])

    const statusChange=()=>{
        pickRef.current.close();
        setUserParcel(null);
    }
  const userParcelPayload=(e)=>{
      console.log(e.data.payload);
       if(e.data.payload.length>0){
         setUserParcel(e.data.payload);
       }
  }
  const succFunc=(e)=>{
      console.log(e)
  }
  const failFunc=(e)=>{
      console.log(e)
  }

   const getUserPickup=()=>{
      var pickupObject={
            method:"get",
            url:`${api.localUrl}${api.userParcels}${user.id}&paymentStatus=SUCCESSFUL&populate=items.category,assignment`,
            headers:{
             Authorization:' Bearer ' + authUser.token,
             'Cache-Control': 'no-cache',
           }
    }
      console.log(pickupObject);
      apiRequest(pickupObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>userParcelPayload(e));

}
    return(
        <ScrollView style={{backgroundColor:'#fff',height:Dimensions.get('screen').height}}
        refreshControl={<RefreshControl refreshing={appDetails.refresh} onRefresh={()=>onRefresh()}/>}
         
        >
        <View style={{flexDirection:'row',justifyContent:'center',padding:15,borderBottomWidth:1,borderBottomColor:`${AppColor.third}`}}>{IconComp("ship",style.iconStyle,25,AppColor.third)}<Text style={{fontWeight:'bold',textAlign:'center',fontSize:15,marginLeft:5}}>Shipments</Text></View>
        
       {userParcel&&userParcel.map((e,i)=>{
           return  <ParcelComp key={i} catIcon="boxes" parcel={e} pickOp={()=>openPickOperation(e)}/>
       })}
       {appDetails.load&&<LoaderComp size={25} color={AppColor.third}/>}

       <Custombtm displayComp={()=><Pickupoperation pickup={appDetails.currentPickup} statusChange={()=>statusChange()}/>}  cod={true} copm={true} btmRef={pickRef} height={780}/>
   
        </ScrollView>
    )
}

const style=StyleSheet.create({
    iconStyle:{

    }
})
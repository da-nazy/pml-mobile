import React,{useContext,useCallback,useEffect,useRef} from 'react';
import { View,Text,ScrollView,StyleSheet,Dimensions,RefreshControl, Alert,Modal} from 'react-native';
import CustomFab from '../WorkerComp/CustomFab';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppColor } from '../WorkerComp/AppColor';
import ParcelComp from './ParcelComp';
import {UserContext} from '../DataProvider/UserContext';
import { api,apiRequest} from '../WorkerComp/Api';
import { useState } from 'react/cjs/react.development';
import LoaderComp from '../WorkerComp/LoaderComp';
import ViewParcel from './ViewParcel';
import Custombtm from '../WorkerComp/Custombtm';
export default function Parcel({navigation}){
  const usercontext=useContext(UserContext);
  const {userPickupDetails,setuserPickupDetails,authUser,user}=usercontext;
  const [userParcel,setUserParcel]=useState(null);
  const btmRef=useRef(null);

  const[appDetails,setAppDetails]=useState({
    refresh:false,
    load:false,
    singleParcel:'',
  })

  const succFunc=(e)=>{
    console.log(e);
  }
  const failFunc=(e)=>{
    console.log(e);
  }
  const userparcelPayload=(e)=>{
    console.log(e);
    setUserParcel(e.data.payload);
  }

 

  const {navigate}=navigation;

  const wait=(timeout)=>{
    return new Promise(resolve=>setTimeout(resolve,timeout));
  }
   
  const onRefresh=useCallback(()=>{

    setAppDetails({...appDetails,refresh:true});
    getUserParcel();
    console.log("Okay")
    wait(200).then(()=>setAppDetails({...appDetails,refresh:false}));
  });
  

  useEffect(()=>{
    if(!userParcel){
      getUserParcel();
    }
  },[userParcel])

  const getUserParcel=()=>{
    console.log("log");
     var parcelObject={
       method:'',
       url:`${api.localUrl}${api.userParcels}${user.id}&paymentStatus=PENDING`,
       headers:{
        Authorization:' Bearer ' + authUser.token,
       }
     }
     console.log(parcelObject);
     apiRequest(parcelObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>userparcelPayload(e));

  }
   
 
  const viewParcel=(e)=>{
   setAppDetails({...appDetails,singleParcel:e},btmRef.current.open())
  }

    return (
    <View style={{backgroundColor:'#fff',paddingBottom:45}} >
       <View style={{flexDirection:'row',justifyContent:'center',padding:15,borderBottomWidth:1,borderBottomColor:`${AppColor.third}`}}><Icon name="box" size={15} color={AppColor.third} /><Text style={{fontWeight:'bold',textAlign:'center',fontSize:15,marginLeft:5}}>Parcel</Text></View>
         <ScrollView
         refreshControl={
         <RefreshControl refreshing={appDetails.refresh}
         onRefresh={()=>onRefresh()}
         />}
        

          style={{height:Dimensions.get('screen').height/1.3}}>
      
        {userParcel&&userParcel.map((e,i)=>{
          return(
            <ParcelComp  key={i} name={e.name} catIcon="box" func={()=>viewParcel(e)}/>)
        })}
     </ScrollView>
     <CustomFab iconName="plus" fabFunc={()=>setuserPickupDetails({...userPickupDetails,operation:'parcel'},navigate('location'))}/>
   {appDetails.load&&<LoaderComp size={25} color={AppColor.third}/>}
     <Custombtm displayComp={()=><ViewParcel parcel={appDetails.singleParcel}/>} cod={true} copm={true} btmRef={btmRef} height={550}/>
    </View>
    )
}

const style=StyleSheet.create({
    
})
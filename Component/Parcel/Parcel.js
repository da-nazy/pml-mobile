import React,{useContext,useCallback} from 'react';
import { View,Text,ScrollView,StyleSheet,Dimensions,RefreshControl} from 'react-native';
import CustomFab from '../WorkerComp/CustomFab';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppColor } from '../WorkerComp/AppColor';
import ParcelComp from './ParcelComp';
import {UserContext} from '../DataProvider/UserContext';
import { api } from '../WorkerComp/Api';
import { useState } from 'react/cjs/react.development';
import LoaderComp from '../WorkerComp/LoaderComp';
export default function Parcel({navigation}){
  const usercontext=useContext(UserContext);
  const {userPickupDetails,setuserPickupDetails,authUser,user}=usercontext;
  const [userParcel,setUserParcel]=useState(null);
   
  const[appDetails,setAppDetails]=useState({
    refresh:false,
    load:false,
  })
  const succFunc=(e)=>{
    console.log(e);
  }
  const failFunc=(e)=>{
    console.log(e);
  }
  const userparcelPayload=(e)=>{
    console.log(e);
  }
  const {navigate}=navigation;

  const wait=(timeout)=>{
    return new Promise(resoolve=>setTimeout(resolve,timeout));
  }

  const onRefresh=useCallback=(()=>{
    console.log("OnRefreshing");
    getUserParcel();
    wait(200).then(()=>console.log("ended"));
  },[]);

  const getUserParcel=()=>{
     var parcelObject={
       method:'',
       url:`${api.localUrl}${api.userParcels}${user.id}`,
       headers:{
        Authorization:' Bearer ' + authUser.token,
       }
     }
     apiRequest(parcelObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>userparcelPayload(e));

  }

    return (
    <View style={{backgroundColor:'#fff',paddingBottom:45}} >
       <View style={{flexDirection:'row',justifyContent:'center',padding:15,borderBottomWidth:1,borderBottomColor:`${AppColor.third}`}}><Icon name="box" size={15} color={AppColor.third} /><Text style={{fontWeight:'bold',textAlign:'center',fontSize:15,marginLeft:5}}>Parcel</Text></View>
         <ScrollView
         refreshControl={<RefreshControl refreshing={appDetails.refresh}
         onRefresh={onRefresh}
         />}
          style={{height:Dimensions.get('screen').height/1.3}}>
        <ParcelComp name="A bag of Rice" catIcon="box" func={()=>console.log("okay")}/>
     </ScrollView>
     <CustomFab iconName="plus" fabFunc={()=>setuserPickupDetails({...userPickupDetails,operation:'parcel'},navigate('location'))}/>
   {appDetails.load&&<LoaderComp size={25} color={AppColor.third}/>}
    
    </View>
    )
}

const style=StyleSheet.create({
    
})
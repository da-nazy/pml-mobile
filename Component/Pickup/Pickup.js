import React, { useContext ,useEffect,useState,useCallback} from 'react';
import { View,Text,Dimensions,StyleSheet,ScrollView, RefreshControl} from 'react-native';
import CustomFab from '../WorkerComp/CustomFab';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppColor } from '../WorkerComp/AppColor';
import PickupComp from './PickupComp';
import { api,apiRequest } from '../WorkerComp/Api';
import LoaderComp from '../WorkerComp/LoaderComp';
import { UserContext } from '../DataProvider/UserContext';

export default function Pickup({navigation}){
    const usercontext=useContext(UserContext);
    const{authUser,user}=usercontext;
    const {navigate}=navigation;
    const [userPickup,setUserPickup]=useState(null);
      const [appDetails,setAppDetails]=useState({
          load:false,
          refresh:false,
      });

   const wait=(timeOut)=>{
    return new Promise(resolve=>setTimeout(resolve,timeOut));
   }
   const onRefresh=useCallback(()=>{
       console.log("onRefreshing");
       wait(200).then(()=>console.log("ended"));
   },[]);

      const succFunc=(e)=>{
       console.log(e);
      }

      const failFunc=()=>{
          console.log(e)
      }
     
      const userPickupPayload=(e)=>{
        console.log(e.data.payload);
        setUserPickup(e.data.payload);
        if(e.data.payload.lenght!==0){
            console.log("")
        }
      }

      useEffect(()=>{
        if(!userPickup){
            getUserPickup();
        }   
      }
      // eslint-disable-next-line
      ,[userPickup])
     

    const getUserPickup=()=>{
        var userPickupObject={
            method:"get",
            url:`${api.localUrl}${api.userPickup}${user.id}`,
            headers:{
             Authorization:' Bearer ' + authUser.token,
           }
          }
          console.log(userPickupObject);
         apiRequest(userPickupObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>userPickupPayload(e));
   
    }

    return(
        <View style={{backgroundColor:'#fff',paddingBottom:40}}>
        <View style={{flexDirection:'row',justifyContent:'center',padding:15,borderBottomWidth:1,borderBottomColor:`${AppColor.third}`}}><Icon name="boxes" size={15} color={AppColor.third} /><Text style={{fontWeight:'bold',textAlign:'center',fontSize:15,marginLeft:5}}>Pickups</Text></View>
        <ScrollView
         refreshControl={<RefreshControl refreshing={appDetails.refresh}/>}
         onRefresh={onRefresh}
        style={{height:Dimensions.get('screen').height/1.29}}>
         {userPickup?(<PickupComp catIcon="boxes"  name="Food Stuffs" parcel="Empty" pickStatus="Unassigned"  func={()=>{console.log("Check")}}/>
    ):console.log("No pickup found!")}
        </ScrollView>
        {appDetails.load&&(<LoaderComp size={25} color={AppColor.third}/>)}
        <CustomFab iconName="plus" fabFunc={()=>navigate("Select Category")}/> 

       </View>
    )
}

const style=StyleSheet.create({

})
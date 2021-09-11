import React, { useContext ,useEffect,useState,useCallback,useRef} from 'react';
import { View,Text,Dimensions,StyleSheet,ScrollView, RefreshControl} from 'react-native';
import CustomFab from '../WorkerComp/CustomFab';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppColor } from '../WorkerComp/AppColor';
import PickupComp from './PickupComp';
import { api,apiRequest } from '../WorkerComp/Api';
import LoaderComp from '../WorkerComp/LoaderComp';
import { UserContext } from '../DataProvider/UserContext';
import Custombtm from '../WorkerComp/Custombtm';
import ViewPickup from './ViewPickup';
export default function Pickup({navigation}){
    const btmRef=useRef(null);
    const usercontext=useContext(UserContext);
    const{authUser,user}=usercontext;
    const {navigate}=navigation;
    const [userPickup,setUserPickup]=useState(null);

      const [appDetails,setAppDetails]=useState({
          load:false,
          refresh:false,
          pickup:null,
      });

   const wait=(timeOut)=>{
    return new Promise(resolve=>setTimeout(resolve,timeOut));
   }
   const onRefresh=useCallback(()=>{
      setAppDetails({...appDetails,refresh:true});
      getUserPickup();
       wait(200).then(()=>setAppDetails({...appDetails,refresh:true}));
   },[]);

      const succFunc=(e)=>{
       console.log(e);
      }

      const failFunc=(e)=>{
          console.log(e)
      }
     
      const showPickup=(e)=>{
        setAppDetails({...appDetails,pickup:e},btmRef.current.open());
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
     
    const onPickupChange=()=>{
      btmRef.current.close();
      setUserPickup(null);
    }
    const getUserPickup=()=>{
        var userPickupObject={
            method:"get",
            url:`${api.localUrl}${api.userPickup}${user.id}&paymentStatus=PENDING&pmlPickup=null&populate=stateFrom,stateTo`,
            headers:{
             Authorization:' Bearer ' + authUser.token,
             'Cache-Control': 'no-cache',
           }
          }
          console.log(userPickupObject);
         apiRequest(userPickupObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>userPickupPayload(e));
   
    }

    return(
        <View style={{backgroundColor:'#fff',paddingBottom:40}}>
        <View style={{flexDirection:'row',justifyContent:'center',padding:15,borderBottomWidth:1,borderBottomColor:`${AppColor.third}`}}><Icon name="boxes" size={15} color={AppColor.third} /><Text style={{fontWeight:'bold',textAlign:'center',fontSize:15,marginLeft:5}}>Pickups</Text></View>
        <ScrollView
         refreshControl={<RefreshControl refreshing={appDetails.refresh} onRefresh={()=>onRefresh()}/>}
         
        style={{height:Dimensions.get('screen').height/1.29}}>
         {userPickup?userPickup.map((e,i)=>{
     return   <PickupComp key={i} catIcon="boxes"  name={e.description} parcel={e.pmlParcels.lenght?e.pmlParcels.lenght.toString():'Empty'} pickStatus={e.status}  func={()=>{showPickup(e)}}/>
 
         })
          :console.log("No pickup found!")}
        </ScrollView>
        {appDetails.load&&(<LoaderComp size={25} color={AppColor.third}/>)}
        <CustomFab iconName="plus" fabFunc={()=>navigate("Select Category")}/> 
      <Custombtm displayComp={()=><ViewPickup pickup={appDetails.pickup}/>} onPickupChange={()=>onPickupChange()} cod={true} copm={true} btmRef={btmRef} height={500}/>
       </View>
    )
}

const style=StyleSheet.create({

})
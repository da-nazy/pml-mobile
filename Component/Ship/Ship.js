import React, { useState,useEffect,useContext,useCallback} from 'react';
import {View,StyleSheet,Text,ScrollView,RefreshControl, Dimensions} from 'react-native';
import { IconComp } from '../WorkerComp/ExternalFunction';
import { AppColor } from '../WorkerComp/AppColor';
import PickupComp from '../Ship/PickupComp';
import LoaderComp from '../WorkerComp/LoaderComp';
import {UserContext }from '../DataProvider/UserContext';
import {api,apiRequest} from '../WorkerComp/Api';
export default function Ship(){
    const usercontext=useContext(UserContext);
    const{user,authUser}=usercontext;
    const [userPickup,setUserPickup]=useState(null);
    const[appDetails,setAppDetails]=useState({
        load:false,
        refresh:false,

    })
  
    /**
     * TODO: sort by date and pickupstatus , swipe refresh
     * 
     */
    useEffect(()=>{
        getUserPickup()
    },[])
      
    const wait=(timeOut)=>{
        return new Promise(resolve=>setTimeout(resolve,timeOut));
    }
     
    const onRefresh=useCallback(()=>{
     setAppDetails({...appDetails,refresh:true});
     getUserPickup();
     wait(200).then(()=>setAppDetails({...appDetails,refresh:false}))
    },[])

    var pickup=[{
        name:'Aza',
        pickupStatus:'pending',
        pmlParcel:[
           {
        name:"test",
        date:"2023",
        status:"Pending",
        isPackaged:true,
        id:1,
           },
          {
            name:"testy",
            date:"2023",
            status:"Pending",
            isPackaged:false,
            id:2
           }
        ],
        createdAt:"10-10-1990",
        price:'#2000',
    },
    {
        name:'Aza',
        pickupStatus:'pending',
        pmlParcel:[
           {
        name:"test",
        date:"2023",
        status:"Pending",
        isPackaged:true,
        id:1,
           },
          {
            name:"testy",
            date:"2023",
            status:"Pending",
            isPackaged:false,
            id:2
           }
        ],
        createdAt:"10-10-1990",
        price:'#2000',
    }
]
  const userPickupPayload=(e)=>{
      console.log(e.data.payload);
       if(e.data.payload.length>0){
         setUserPickup(e.data.payload);
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
            url:`${api.localUrl}${api.userPickup}${user.id}&paymentStatus=SUCCESSFUL&populate=pmlParcels`,
            headers:{
             Authorization:' Bearer ' + authUser.token,
             'Cache-Control': 'no-cache',
           }
    }
      console.log(pickupObject);
      apiRequest(pickupObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>userPickupPayload(e));

}
    return(
        <ScrollView style={{backgroundColor:'#fff',borderWidth:1,height:Dimensions.get('screen').height}}
        refreshControl={<RefreshControl refreshing={appDetails.refresh} onRefresh={()=>onRefresh()}/>}
         
        >
        <View style={{flexDirection:'row',justifyContent:'center',padding:15,borderBottomWidth:1,borderBottomColor:`${AppColor.third}`}}>{IconComp("ship",style.iconStyle,25,AppColor.third)}<Text style={{fontWeight:'bold',textAlign:'center',fontSize:15,marginLeft:5}}>Shipments</Text></View>
        
       {userPickup&&userPickup.map((e,i)=>{
           return  <PickupComp key={i} catIcon="boxes" pickup={e}/>
       })}
       {appDetails.load&&<LoaderComp size={25} color={AppColor.third}/>}

        </ScrollView>
    )
}

const style=StyleSheet.create({
    iconStyle:{

    }
})
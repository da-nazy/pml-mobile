import React, { useState ,useContext,useEffect,useRef} from 'react';
import {View,StyleSheet,Text,ScrollView} from 'react-native';
import {api,apiRequest} from '../WorkerComp/Api';
import { UserContext } from '../DataProvider/UserContext';
import LoaderComp from '../WorkerComp/LoaderComp';
import { AppColor } from '../WorkerComp/AppColor';
import Icon from "react-native-vector-icons/FontAwesome5";
import ParcelComp from '../Ship/ParcelComp';
export default function History(){

    const usercontext=useContext(UserContext);
    const{user,authUser}=usercontext;
    const [history,setHistory]=useState(null);
    const [appDetails,setAppDetails]=useState({
        load:false
    })

    useEffect(()=>{
        getCompletedPickup();
        return()=>setHistory(null);
    },[])
 
    const noHistory=()=>{
        return(
            <View>
                <Text style={{textAlign:'center',fontWeight:'600'}}>No History found</Text>
            </View>
        )
    }
const succFunc=(e)=>{
  console.log(e);
   }
   const failFunc=(e)=>{
       console.log(e)
   }

   const parcelPayload=(e)=>{
       console.log(e.data.payload);
       setHistory(e.data.payload)
   }
 
    const getCompletedPickup=()=>{
        var pickupObject={
              method:"get",
              url:`${api.localUrl}${api.userParcels}${user.id}&paymentStatus=SUCCESSFUL&populate=items.category,assignment&deliveryStatus=CONFIRMED`,
              headers:{
               Authorization:' Bearer ' + authUser.token,
               'Cache-Control': 'no-cache',
             }
      }
        apiRequest(pickupObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>parcelPayload(e));
  
  }
    return(
        <View>
       <View style={style.contHd}><Icon name="clipboard-check" size={25}  color={AppColor.third} /><Text style={style.contTxtHd}>History</Text></View>
       <ScrollView>
       {history?history.map((e,i)=>{
          return(
            <ParcelComp key={i} catIcon="boxes" parcel={e} pickOp={()=>null} display={true}/>
            )
        }):noHistory()}
       </ScrollView>
      
       {appDetails.load&&<LoaderComp size={25} color={AppColor.third}/>}
        </View>
    )
}

const style=StyleSheet.create({
    contHd:{
        flexDirection:'row',
        justifyContent:'center',
        padding:15,
        borderBottomWidth:1,
        borderBottomColor:`${AppColor.third}`
    },
    contTxtHd:{
        fontWeight:'bold',
        textAlign:'center',
        fontSize:15,marginLeft:5
    }
    
})
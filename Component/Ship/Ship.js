import React, { useState,useEffect,useContext,useCallback,useRef} from 'react';
import {View,StyleSheet,Text,ScrollView,RefreshControl, Dimensions, Alert} from 'react-native';
import { IconComp } from '../WorkerComp/ExternalFunction';
import Header from '../WorkerComp/Header';
import { AppColor } from '../WorkerComp/AppColor';
import ParcelComp from './ParcelComp';
import LoaderComp from '../WorkerComp/LoaderComp';
import {UserContext }from '../DataProvider/UserContext';
import {api,apiRequest} from '../WorkerComp/Api';
import Custombtm from '../WorkerComp/Custombtm';
import Pickupoperation from './Pickupopeation';
import CTCOperation from './CTCOperation';
import Pagination from '../WorkerComp/pagination';
export default function Ship({navigation}){
    const usercontext=useContext(UserContext);
    const{user,authUser}=usercontext;
    const [userParcel,setUserParcel]=useState(null);     
  const [page,setPage]=useState('0');
  const [totalPageItems,setTotalPageItems]=useState('');
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
       if(e.data.payload.length>0){
         setUserParcel(e.data.payload);
         setTotalPageItems(e.data.metadata.total);
       }
     
  }
  const succFunc=(e)=>{
   
  }
  const failFunc=(e)=>{
     console.log(e.message)
  }

   const getUserPickup=()=>{
      var pickupObject={
            method:"get",
            url:`${api.localUrl}${api.userParcels}${user.id}&paymentStatus=SUCCESSFUL&populate=items.category,assignment&deliveryStatus!=CONFIRMED&skip=${page}&limit=10`,
            headers:{
             Authorization:' Bearer ' + authUser.token,
             'Cache-Control': 'no-cache',
           }
    }
    apiRequest(pickupObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>userParcelPayload(e));

}

     const pickupType=()=>{

      if(appDetails.currentPickup){
          if(appDetails.currentPickup.assignment){
              switch(appDetails.currentPickup.assignment.type){
                  case 'CC':
                     
                      return<Pickupoperation pickup={appDetails.currentPickup} statusChange={()=>statusChange()}/>
                    
                    default:
                        return(
                            <CTCOperation pickup={appDetails.currentPickup} statusChange={()=>statusChange()}/>
                        )
                        break;
              }
          }else{
              // Assignment hasn't been made
              return(<View><Text style={{textAlign:'center',fontWeight:'bold'}}>Parcel hasn't been assigned yet!</Text></View>)
          }
      }
     }

    return(
       <View style={{...style.parCont}}>
         <Header iconFunc={()=>navigation.toggleDrawer()} iconName='ship' size={25} text={'Shipment'} />
         <ScrollView
        refreshControl={<RefreshControl refreshing={appDetails.refresh} 
        onRefresh={()=>onRefresh()}/>}
         
        >
       
       {userParcel?userParcel.map((e,i)=>{
           return  <ParcelComp key={i} catIcon="boxes" parcel={e} pickOp={()=>openPickOperation(e)}/>
       }):<Text style={{...style.npc}}>No Shipment Records Found!</Text>}
       {appDetails.load&&<LoaderComp size={25} color={AppColor.third}/>}
       {totalPageItems&&<Pagination currentPage={page} setCurrentPage={(e)=>setPage(e)} limit={10} total={totalPageItems} />}
    
       <Custombtm displayComp={()=>pickupType()}  cod={true} copm={true} btmRef={pickRef} height={780}/>
   
        </ScrollView>
       </View>
    )
}

const style=StyleSheet.create({
    iconStyle:{

    },
    parCont:{
        backgroundColor:'#fff',
        paddingBottom:45,
        height:'100%'
      },
    npc:{
        fontWeight:'bold',
        textAlign:'center',
        marginTop:10,
      }
})
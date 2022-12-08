import React,{useContext,useCallback,useEffect,useRef,useState} from 'react';
import { View,Text,ScrollView,StyleSheet,Dimensions,RefreshControl, Alert,Modal} from 'react-native';
import CustomFab from '../WorkerComp/CustomFab';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppColor } from '../WorkerComp/AppColor';
import ParcelComp from './ParcelComp';
import {UserContext} from '../DataProvider/UserContext';
import { api,apiRequest} from '../WorkerComp/Api';
import LoaderComp from '../WorkerComp/LoaderComp';
import ViewParcel from './ViewParcel';
import Custombtm from '../WorkerComp/Custombtm';
import Header from '../WorkerComp/Header';
import Pagination from '../WorkerComp/pagination';
export default function Parcel({navigation}){
  const usercontext=useContext(UserContext);
  const {userPickupDetails,setuserPickupDetails,authUser,user,setUserWallet}=usercontext;
  const [userParcel,setUserParcel]=useState(null);
  const btmRef=useRef(null);
  const [page,setPage]=useState('0');
  const [totalPageItems,setTotalPageItems]=useState('');
  const[appDetails,setAppDetails]=useState({
    refresh:false,
    load:false,
    singleParcel:'',
    ref:null,
  })

  const succFunc=(e)=>{
 //   (e);
  }
  const failFunc=(e)=>{
   // (e);
  }
    

  const userparcelPayload=(e)=>{
    if(e.data.payload.length>0){
      setUserParcel(e.data.payload);
        setTotalPageItems(e.data.metadata.total);
    }

  }

 
  


  const {navigate}=navigation;

  const wait=(timeout)=>{
    return new Promise(resolve=>setTimeout(resolve,timeout));
  }

   const onParcelChange=()=>{
     setUserWallet(null);
     btmRef.current.close();
     setUserParcel(null);
    }

  const onRefresh=useCallback(()=>{

    setAppDetails({...appDetails,refresh:true});
    getUserParcel();
    wait(200).then(()=>setAppDetails({...appDetails,refresh:false}));
  });
  
  
  useEffect(()=>{
    if(!userParcel){
      getUserParcel();
    }
  },[userParcel])

  useEffect(()=>{
    getUserParcel()
  },[page])

  const getUserParcel=()=>{
  
     var parcelObject={
       method:'get',
       url:`${api.localUrl}${api.userParcels}${user.id}&paymentStatus=PENDING&pmlPickup=null&populate=stateFrom,stateTo&skip=${page}&limit=10`,
       headers:{
        Authorization:' Bearer ' + authUser.token,
        'Cache-Control': 'no-cache',
       }
     }
     apiRequest(parcelObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>userparcelPayload(e));

  }
   
 
  const viewParcel=(e)=>{
   setAppDetails({...appDetails,singleParcel:e},btmRef.current.open())
  }

    return (
    <View style={{...style.parCont}} >
      <Header iconFunc={()=>navigation.toggleDrawer()} iconName='box' size={25} text={'Parcel'} />
         <ScrollView
         refreshControl={
         <RefreshControl refreshing={appDetails.refresh}
         onRefresh={()=>onRefresh()}
         />}
          style={{height:Dimensions.get('screen').height/1.3}}>
        {userParcel?userParcel.map((e,i)=>{
          return(
            <ParcelComp  key={i} name={e.name} catIcon="box" func={()=>viewParcel(e)}/>)
        }):<Text style={{...style.npc}}>No Parcel Records Found!</Text>}
       {totalPageItems&&<Pagination currentPage={page} setCurrentPage={(e)=>setPage(e)} limit={10} total={totalPageItems} />}
       </ScrollView>
     
     <CustomFab iconName="plus"
      fabFunc={()=>setuserPickupDetails({...userPickupDetails,operation:'parcel'},
      navigate('Select Category'))}/>
     {appDetails.load&&<LoaderComp size={25} color={AppColor.third}/>}
     <Custombtm displayComp={()=><ViewParcel
      parcel={appDetails.singleParcel} 
     onParcelChange={()=>onParcelChange()} />} cod={true} copm={true} btmRef={btmRef} height={550}/>
    
    </View>
    )
}

const style=StyleSheet.create({
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
import React,{useState,useRef,useContext}  from 'react';
import MapView,{Callout, Marker,Circle} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions,StatusBar, TouchableOpacity } from 'react-native';
import { Locations } from './Locations';
import { AppColor } from '../WorkerComp/AppColor';
import LoaderComp from '../WorkerComp/LoaderComp';
import {api,apiRequest} from '../WorkerComp/Api';
 import { UserContext } from '../DataProvider/UserContext';
export default function PickLocation() {
     const usercontext=useContext(UserContext);
     const {userLoc,setUserLoc,senderLoc,setSenderLoc,userPickupDetails,setuserPickupDetails}=usercontext;
   
  const [locName,setLocName]=useState({
    name:'Searching......',
    load:false,
  })

  const succFunc=(e)=>{
    console.log(e);
  }

  const errorFunc=(e)=>{
    console.log(e);
  } 

  const payLoad=(e)=>{
    if(e.data.results[0].formatted_address){
      setLocName({...locName,name:e.data.results[0].formatted_address})
      if(userPickupDetails.locType==1){
        setUserLoc({...userLoc,address:e.data.results[0].formatted_address});
        }else if(userPickupDetails.locType==2){
        setSenderLoc({...senderLoc,address:e.data.results[0].formatted_address});
        }else{
          console.log("okay")
        }
       }
  }  
  
  const  showDetails=()=>{
    console.log(userLoc);
    console.log(senderLoc);
    console.log(userPickupDetails);
  }

  const [pin,setPin]=useState({
    latitude: 0,
    longitude: 0,

})

  const getLocationDetails=()=>{
    setLocName({...locName,name:'Searching....'})
    var requestObject={
      method:'get',
      url:`${api.googleReversGeoCodeUrl}${pin.latitude},${pin.longitude}&key=${api.googleApiKey}`,
      data:{}
    }

     apiRequest(requestObject,(e)=>setLocName({...locName,load:e}),(e)=>succFunc(e),(e)=>errorFunc(e),(e)=>payLoad(e));
 
  }
        
     const searchResult=()=>{
         return(
             <View style={{width:'100%',height:150,top:-74,backgroundColor:'#fff',flexDirection:'column'}}>
                 <Text style={{paddingTop:10,paddingBottom:5,paddingLeft:10,paddingRight:10,marginTop:8,fontWeight:'bold',color:'#bbbbbb'}}>
                     Confirm Location 
                 </Text>
                 <Text style={{fontWeight:'bold',color:'#000',marginRight:10,marginLeft:10,margin:5}}>
                  {locName.name}
                 </Text>
                 <TouchableOpacity style={styles.cfBtn} onPress={()=>showDetails()}>
                     <Text style={{textAlign:'center',fontSize:18,color:'#fff',fontWeight:'bold'}}>Confirm</Text>
                 </TouchableOpacity>
             </View>
         )
     }

    Locations((e,c)=>setCoord(e,c));

    const setCoord=(e,c)=>{
        if(!pin.longitude>0){
        setPin({...pin,latitude:e,longitude:c});
        if(userPickupDetails.locType==1){
        setUserLoc({...userLoc,lat:e,lng:c});
        }else if(userPickupDetails.locType==2){
          setSenderLoc({...senderLoc,lat:e,lng:c});
        }else{
          console.log("okay")
        }
        console.log(userPickupDetails);
        }
    }   

    
  return (
    <View style={styles.container}>
        <StatusBar animated={true} backgroundColor={AppColor.third} />
      
      {pin.longitude>0?
      <MapView style={styles.map}  
       zoomEnabled={true}
       onMapReady={()=>getLocationDetails()}
       initialRegion={{
      latitude: pin.latitude,
      longitude: pin.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }} 
         provider="google"
    >
      <Marker coordinate={pin}
     pinColor="plum"
     draggable={true}
     onDragStart={(e)=>{
        console.log("Drag Start",e.nativeEvent.coordinate)
     }}
     onDragEnd={(e)=>{
         console.log(e.nativeEvent.coordinate);
         getLocationDetails()
         if(userPickupDetails.locType==1){
          setUserLoc({...userLoc,lat:e.nativeEvent.coordinate.latitude,lng:e.nativeEvent.coordinate.longitude});
          }else if(userPickupDetails.locType==2){
          setSenderLoc({...senderLoc,lat:e.nativeEvent.coordinate.latitude,lng:e.nativeEvent.coordinate.longitude});
          }else{
            console.log("okay")
          }
      setPin({ latitude:e.nativeEvent.coordinate.latitude,
        longitude:e.nativeEvent.coordinate.longitude
       })    }}
      >
        <Callout>
          <Text>Hold {'&'} Drag</Text>
        </Callout>
      </Marker>
      <Circle center={pin} radius={50}/>
    </MapView>:null}
    {pin.longitude==0?<LoaderComp size={45} color={AppColor.third} />:searchResult()}
  
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  cfBtn:{
    height:40,
    width:'95%',
    marginLeft:10,
    marginRight:10,
    borderRadius:5,
    justifyContent:'center',
    alignSelf:'center',
    backgroundColor:`${AppColor.third}`,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 5,
  }
})
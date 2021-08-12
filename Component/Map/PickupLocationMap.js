import React,{useState,useEffect,useRef} from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions, TouchableOpacity,Alert,JSON} from 'react-native';
import InputComp from '../WorkerComp/InputComp';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppColor } from '../WorkerComp/AppColor';
import { Locations } from './Locations';
import LoaderComp from '../WorkerComp/LoaderComp';
import { apiRequest,api } from '../WorkerComp/Api';
import { UserContext } from '../DataProvider/UserContext';
import { useContext } from 'react/cjs/react.development';

export default function PickupLocationMap({navigation}){
    const {navigate}=navigation;
    const usercontext=useContext(UserContext);
  const {userLoc,setUserLoc,senderLoc,setSenderLoc,userPickupDetails,setuserPickupDetails}=usercontext;

   
    const pickOperation=(e)=>{
       setuserPickupDetails({...userPickupDetails,locType:e});
       navigate('SearchAddress');
   }

  const succFunc=(e)=>{
    console.log(e); 
  }

  const errorFunc=(e)=>{
    Alert.alert("Error",e);
  }

  const payload=(e)=>{
    console.log(e.data.results[0].formatted_address);
    if(e.data.results[0].formatted_address){
   setPickupAddress({...pickupAddress,address:e.data.results[0].formatted_address})
      if(userPickupDetails.locType==1){
      setUserLoc({...userLoc,address:e.data.results[0].formatted_address})
      }else if(userPickupDetails.locType==2){
      setSenderLoc({...senderLoc,address:e.data.results[0].formatted_address})
      console.log(e.data.results[0].formatted_address);
      console.log("second");
      
      }else{
        console.log("Error loctype undefined");
      }
  }
  }

  const[appOperation,setAppOperation]=useState({
    load:false,
    currentLoc:false,
    });
   
    


     
   Locations((e,c)=>setcoord(e,c));
  
    const setcoord=(e,c)=>{
      if(!coordinates.longitude>0){
        setCoordinates({...coordinates,latitude:e,longitude:c}); 
      
        if(userPickupDetails.locType==1){
          setUserLoc({...userLoc,lat:e,lng:c});
        }else if(userPickupDetails.locType==2){
          setSenderLoc({...senderLoc,lat:e,lng:c});
        }else{
          console.log("Error loctype undefined");
        }
      }
       //   setAppOperation({...appOperation,currentLoc:true});
      // reverseGeoCode(e,c);
    }

  const reverseGeoCode=(lat,lng)=>{
    // request Object
    var requestObject={
      method:'get',
      url:`${api.googleReversGeoCodeUrl}${lat},${lng}&key=${api.googleApiKey}`,
      data:{}
    }

  console.log(requestObject);
  apiRequest(requestObject,(e)=>setAppOperation({...appOperation,load:e}),(e)=>succFunc(e),(e)=>errorFunc(e),(e)=>payload(e));
   setAppOperation({...appOperation,currentLoc:true});
}

  const mapRef=useRef(null);
  
 // Calling the Location to get LatLng for user.
 
    const [pickupAddress,setPickupAddress]=useState({
        latitude:null,
        longitude:null,
        address:'Searching...',
    })
    const [coordinates,setCoordinates]=useState(
      {
        latitude:0,
        longitude: 0,
        id:1,
      }
     
    );
    useEffect(()=>{
     reverseGeoCode(coordinates.latitude,coordinates.longitude);
    },[coordinates])
  return (
    <View style={styles.container}>
        <View style={styles.pick}>
            <View style={{height:90,alignSelf:'center',width:'5%'}}><Icon name="circle" size={15} color={AppColor.third}/><View style={{flex:1 ,borderStyle:'dotted',borderLeftWidth: 1, borderLeftRadius: 1,marginLeft:6,}}></View><Icon name="circle" size={15} color="#000"/></View>
            <View style={{width:'90%'}}>
            <TouchableOpacity  onPress={()=>pickOperation(1)} ><InputComp  value={pickupAddress.address} style={styles.btn}  mode="outlined" editable={false}  label="Pick-up  Address " placeholder="Searching..." setText={(e)=>console.log(e)}/></TouchableOpacity>
            <TouchableOpacity  onPress={()=>pickOperation(2)} ><InputComp style={styles.btn} pointerEvents="none" mode="outlined"  editable={false} label="Drop-off Address " placeholder="Searching..." setText={(e)=>console.log(e)}/></TouchableOpacity>
         </View>
        </View>
     {coordinates.latitude>0?
     <MapView 
      style={styles.map}  
       initialRegion={{
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: 0.0622,
        longitudeDelta: 0.0121,
      }} 
         provider="google"
         showsUserLocation={true}
         showsMyLocationButton={true}
         followsUserLocation={true}
  
        ref={mapRef}
        animateCamera={true}
    >   

    </MapView>:null}
    {appOperation.load&&(<LoaderComp size={15} color={AppColor.third}/>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'flex-start',
    marginTop:30,
    top:5,
  },
  pick:{
    flexDirection:'row',
    position:'absolute',
    margin:10,
    zIndex:1,
    width:Dimensions.get('screen').width/1.13,borderRadius:5,
    backgroundColor:'#fff',
    justifyContent:'space-evenly',
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 5,
},
shadowOpacity: 0.34,
shadowRadius: 6.27,
elevation: 10,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
   btn:{
     margin:5,
     height:50,
     fontSize:13,
   textAlign:'left',
   
   }
})
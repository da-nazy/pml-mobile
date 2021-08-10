import React,{useState,useEffect,useRef} from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions, TouchableOpacity,Alert,JSON} from 'react-native';
import InputComp from '../WorkerComp/InputComp';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppColor } from '../WorkerComp/AppColor';
import { Locations } from './Locations';
export default function PickLocationMap() {
    
  const mapRef=useRef(null);

 // Calling the Location to get LatLng for user.
 const lat=(e)=>{
    console.log(e);
    
 }  
 const lng=(e)=>{
console.log(e);
 return e;
 }
useEffect(()=>{
if(lat&&lng){
 setCoordinates([{...coordinates,id:1,latitude:lat(),longitude:lng()}])
 console.log(coordinates[0]);

 mapRef.animateToCoordinate({
  latitude: lat(),
  longitude: lng()
}, 1000)
}


},[lat(),lng()])

 Locations((e)=>lat(e),(e)=>lng(e));

    const [pickupAddress,setPickupAddress]=useState({
        latitude:null,
        longitude:null,
        address:'Searching...',
    })
    const [coordinates,setCoordinates]=useState([
      {
        latitude: 6.459964,
        longitude: 7.548949,
        id:1,
      },
      {
        latitude: 48.8323785,
        longitude: 2.3361663,
        id:2,
      },
    ]);
  return (
    <View style={styles.container}>
        <View style={styles.pick}>
            <View style={{height:90,alignSelf:'center',width:'5%'}}><Icon name="circle" size={15} color={AppColor.third}/><View style={{flex:1 ,borderStyle:'dotted',borderLeftWidth: 1, borderLeftRadius: 1,marginLeft:6,}}></View><Icon name="circle" size={15} color="#000"/></View>
            <View style={{width:'80%'}}>
            <TouchableOpacity  onPress={()=>console.log("okay")} ><InputComp  value={pickupAddress.address} style={styles.btn} pointerEvents="none" mode="outlined" editable={false} label="Pick-up  Address " placeholder="Searching..." setText={(e)=>console.log(e)}/></TouchableOpacity>
            <TouchableOpacity  onPress={()=>console.log("okay")} ><InputComp style={styles.btn} pointerEvents="none" mode="outlined" editable={false} label="Drop-off Address " placeholder="Searching..." setText={(e)=>console.log(e)}/></TouchableOpacity>
         </View>
        </View>
      <MapView style={styles.map}  
       initialRegion={{
        latitude: coordinates[0].latitude?coordinates[0].latitude:0,
        longitude: coordinates[0].longitude?coordinates[0].longitude:0,
        latitudeDelta: 0.0622,
        longitudeDelta: 0.0121,}} 
         provider="google"
         showsUserLocation={true}
         followsUserLocation={true}
         ref={(mapView)=>{mapView=mapRef}}
    >
       
    </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'flex-start',
    marginTop:50,
    top:5,
  },
  pick:{
    borderWidth:1,
    flexDirection:'row',
    position:'absolute',
    margin:10,
    zIndex:1,
    width:Dimensions.get('screen').width/2.5,borderRadius:5,
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
     height:50
   }
})
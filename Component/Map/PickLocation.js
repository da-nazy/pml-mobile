import React,{useState,useRef,useContext,useEffect}  from 'react';
import MapView,{Callout, Marker,Circle} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions,StatusBar, TouchableOpacity } from 'react-native';
import { locations } from './locations';
import { AppColor } from '../WorkerComp/AppColor';
import LoaderComp from '../WorkerComp/LoaderComp';
import {api,apiRequest,pinColor} from '../WorkerComp/Api';
 import { UserContext } from '../DataProvider/UserContext';
export default function PickLocation({navigation}) {
  const {navigate}=navigation;
     const usercontext=useContext(UserContext);
     const {userLoc,setUserLoc,senderLoc,setSenderLoc,userPickupDetails,setuserPickupDetails}=usercontext;
     const [terminals,setTerminals]=useState(null);
  const [locName,setLocName]=useState({
    name:'Searching......',
    load:false,
    lat:null,
    lng:null,
  })

  const terminalPayLoad=(e)=>{
 
    var terminal=[];
    
    e.data.payload.map((e,i)=>{
      if(e.subsidiary==='PML'){
        terminal.push({location:e.location})
      }
    })
    console.log(terminal);
    setTerminals(terminal,console.log(terminals,"testd"));
  }

  const succFunc=(e)=>{
  console.log(e)
  }
 

  const errorFunc=(e)=>{
    console.log(e);
  } 

    const getTerminals=()=>{
      var requestObject={
        method:'get',
        url:`${api.localUrl}${api.pmlTerminal}`,
        data:{}
      }
  
       apiRequest(requestObject,(e)=>console.log(e),(e)=>succFunc(e),(e)=>errorFunc(e),(e)=>terminalPayLoad(e));
   
    }
     useEffect(()=>{
       if(!terminals){
        getTerminals();
       }
     },[ ])
  const payLoad=(e)=>{
   // console.log(e);
   // console.log(e.data.results[0].address_components[2].long_name);
  
    if(e.data.results[0].formatted_address||typeof e.data.results[0].formatted_address!=='undefined'){
      if(userPickupDetails.locType==1){
        setLocName({...locName,name:e.data.results[0].formatted_address});
       // setUserLoc({...userLoc,address:e.data.results[0].formatted_address});
       console.log(e.data.results[0].formatted_address);
        }else if(userPickupDetails.locType==2){
        setLocName({...locName,name:e.data.results[0].formatted_address});
        console.log(e.data.results[0].formatted_address);
       // setSenderLoc({...senderLoc,address:e.data.results[0].formatted_address});
        }else{
          console.log("okay")
        }
       }
  }  
  

    const updatePickup=(e,c)=>{
      if(userPickupDetails.locType==1){
        // setUserLoc({...userLoc,lat:e.nativeEvent.coordinate.latitude,lng:e.nativeEvent.coordinate.longitude})
           getLocationDetails(e,c);
         console.log(userLoc);
         }else if(userPickupDetails.locType==2){
           // setSenderLoc({...senderLoc,lat:e.nativeEvent.coordinate.latitude,lng:e.nativeEvent.coordinate.longitude}
           getLocationDetails(e,c);
         console.log(senderLoc);
         }
    }
  const  gotoMap=()=>{
    console.log(userPickupDetails.locType);
    console.log(locName,pin);
    if(userPickupDetails.locType==1){
    setUserLoc({...userLoc,lat:pin.latitude,lng:pin.longitude,address:locName.name},navigate('location'));
    }else if(userPickupDetails.locType==2){
     setSenderLoc({...senderLoc,lat:pin.latitude,lng:pin.longitude,address:locName.name},navigate('location'));
    }else{
      console.log("Something's wrong");
    }
  }

  const [pin,setPin]=useState({
    latitude: 0,
    longitude: 0,

})

  const getLocationDetails=(e,c)=>{
     var requestObject={
      method:'get',
      url:`${api.googleReversGeoCodeUrl}${e},${c}&key=${api.googleApiKey}`,
      data:{}
    }

     apiRequest(requestObject,(e)=>console.log(e),(e)=>succFunc(e),(e)=>errorFunc(e),(e)=>payLoad(e));
 
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
                 <TouchableOpacity style={styles.cfBtn} onPress={()=>gotoMap()}><Text style={{textAlign:'center',fontSize:18,color:'#fff',fontWeight:'bold'}}>Confirm</Text>
                 </TouchableOpacity>
             </View>
         )
     }

  
      locations((e,c)=>setCoord(e,c));
  

    const setCoord=(e,c)=>{
   //   console.log("Okay");
        if(!pin.longitude>0){
      // setPin({...pin,latitude:e,longitude:c},getLocationDetails(e,c));
        if(userPickupDetails.locType==1){
        //  getLocationDetails(e,c)
        setPin({...pin,latitude:e,longitude:c});
      //  setUserLoc({...userLoc,lat:e,lng:c});
      //  console.log("Loc1")
        }else if(userPickupDetails.locType==2){
        //  getLocationDetails(e,c)
        setPin({...pin,latitude:e,longitude:c});
        //  console.log("Loc2")
        }else{
        //  console.log("okay")
        }
     //   console.log(userPickupDetails);
        }
    }   

    
  return (
    <View style={styles.container}><StatusBar animated={true} backgroundColor={AppColor.third}/>
      {pin.longitude>0?
      <MapView style={styles.map}  
       zoomEnabled={true}
       onMapReady={()=>console.log("Okay")}
       initialRegion={{
      latitude: pin.latitude,
      longitude: pin.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }} 
         provider="google"
    >

      <Marker coordinate={pin}
     pinColor={pinColor.color17}
     draggable={true}
     onDragStart={(e)=>{
        console.log(userLoc,senderLoc)
     }}
     onDragEnd={(e)=>{
      setPin({ latitude:e.nativeEvent.coordinate.latitude,
        longitude:e.nativeEvent.coordinate.longitude
       },updatePickup(e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude)) 
         
          
        }}
      >
        <Callout>
          <Text>Hold {'&'} Drag</Text>
        </Callout>
      </Marker>
      <Circle center={pin} radius={50}/>
      
       {terminals&&terminals.map((e,i)=>{
  return   <Marker key={i}
          pinColor={pinColor.color15}
          coordinate={{ latitude:e.location.coordinates[1], longitude:e.location.coordinates[0]}}
        >
          <Callout>
            <Text>{e.location.address}</Text>
          </Callout>
        </Marker>
       })}
       
    </MapView>:null}
    {pin.longitude==0?(<LoaderComp size={45} color={AppColor.third} />):searchResult()}
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
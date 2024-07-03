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
    setTerminals(terminal);
  }

  const succFunc=(e)=>{
  //(e)
  console.log(e)
  }
 

  const errorFunc=(e)=>{
  console.log(e)
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

  
    if(e.data.results[0].formatted_address||typeof e.data.results[0].formatted_address!=='undefined'){
      if(userPickupDetails.locType==1){
        setLocName({...locName,name:e.data.results[0].formatted_address});
      
        }else if(userPickupDetails.locType==2){
        setLocName({...locName,name:e.data.results[0].formatted_address});
    
        }else{
        //  ("okay")
        }
       }
  }  
  

    const updatePickup=(e,c)=>{
      if(userPickupDetails.locType==1){
        // setUserLoc({...userLoc,lat:e.nativeEvent.coordinate.latitude,lng:e.nativeEvent.coordinate.longitude})
           getLocationDetails(e,c);
        // (userLoc);
         }else if(userPickupDetails.locType==2){
             getLocationDetails(e,c);
 
         }
    }
  const  gotoMap=()=>{
  
    if(userPickupDetails.locType==1){
    setUserLoc({...userLoc,lat:pin.latitude,lng:pin.longitude,address:locName.name},navigate('location'));
    }else if(userPickupDetails.locType==2){
     setSenderLoc({...senderLoc,lat:pin.latitude,lng:pin.longitude,address:locName.name},navigate('location'));
    }else{
     // ("Something's wrong");
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

     apiRequest(requestObject,(a)=>(console.log(a)),(a)=>succFunc(a),(a)=>errorFunc(a),(a)=>payLoad(a));
    console.log(requestObject);
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
   //   ("Okay");
   console.log(e,c,'testing danny');
        if(!pin.longitude>0){
    
        if(userPickupDetails.locType==1){

        setPin({...pin,latitude:e,longitude:c});
     
        }else if(userPickupDetails.locType==2){
      
        setPin({...pin,latitude:e,longitude:c});
      
        }else{
        //  ("okay")
        }
     //   (userPickupDetails);
        }
    }   

    
  return (
    <View style={styles.container}><StatusBar animated={true} backgroundColor={AppColor.third}/>
      {pin.longitude?
      <MapView style={styles.map}  
       zoomEnabled={true}
       key={api.googleApiKey}
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
        console.log(e);
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
  searchResultCont:{
    
  },
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
import React,{useEffect,useContext,useState} from 'react';
//import react in our code.
import * as Location from 'expo-location';
import { UserContext } from '../DataProvider/UserContext';
import { LogBox } from 'react-native';
export const locations=(setCoordinate)=>{
  const usercontext=useContext(UserContext);
  const{userLoc,setUserLoc}=usercontext;
  LogBox.ignoreAllLogs(true);
  console.disableYellowBox = true;
    /**
     *currentLongitude: 'unknown', //Initial Longitude
       currentLatitude: 'unknown'
     */
   // const [currentLongitude,setCurrentLongitude]=useState("");
   // const [currentLatitude,setCurrentLatitude]=useState("");
      const test=(e)=>{
     console.log("okay"+e);
      }
      var watchID;

      const setLoc=(lat,lng)=>{
        console.log(lat,lng)
      if(lat!==0&&lng!==0){
        setCoordinate(Number.parseFloat(lat),Number.parseFloat(lng));
      }else{
        console.log("error");
      }
      }
      
       const getLocation=()=>{
        Location.installWebGeolocationPolyfill();
        navigator.geolocation.getCurrentPosition(
          //Will give you the current location
          position => {
            const currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            //console.log(currentLongitude,currentLatitude);
           setLoc(currentLatitude,currentLongitude);
            //Setting state Latitude to re re-render the Longitude Text
          },
          error => {
            if (error.message == "Location provider is unavailable. Make sure that location services are enabled."){
              // call the function again function
              getLocation()
              }
            }
          ,
          
          { accuracy:1, timeout: 20000, maximumAge: 1000 }
        );

        watchID = navigator.geolocation.watchPosition(position => {
          //Will give you the location on location change
          //console.log(position);

          const currentLongitude = JSON.stringify(position.coords.longitude);
          //getting the Longitude from the location json
          const currentLatitude = JSON.stringify(position.coords.latitude);
          
          console.log(currentLatitude);
         setLoc(currentLatitude,currentLongitude);
          //Setting state Latitude to re re-render the Longitude Text
        },(error)=>{
          if (error.message == "Location provider is unavailable. Make sure that location services are enabled."){
            // call the function again function
            getLocation()
            }
           //console.log(error.message);
        })
       }
    useEffect(()=>{
     

    try{
      getLocation();
    let loc = Location.getCurrentPositionAsync({accuracy:1});
    loc.then(()=>{
    // console.log(loc,"danny");
    // console.log(loc._W.coords)
     setLoc(loc._W.coords.latitude,loc._W.coords.longitude)
    })
   
   }catch(error){
    console.log(error.message);
   }
    })
         useEffect(()=>{
            navigator.geolocation.clearWatch(watchID);
         })   
    
}
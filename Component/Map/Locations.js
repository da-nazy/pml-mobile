import React,{useEffect,useContext,useState} from 'react';
//import react in our code.
import * as Location from 'expo-location';
import { UserContext } from '../DataProvider/UserContext';
export const Locations=(setLat,setLong)=>{
  const usercontext=useContext(UserContext);
  const{userLoc,setUserLoc}=usercontext;

    /**
     *currentLongitude: 'unknown', //Initial Longitude
       currentLatitude: 'unknown'
     */
   // const [currentLongitude,setCurrentLongitude]=useState("");
   // const [currentLatitude,setCurrentLatitude]=useState("");
      const test=(e)=>{
     console.log("okay"+e);
      }
      const setLoc=(lat,lng)=>{
       setLat(lat);
       setLong(lng);
      }

    useEffect(()=>{
        Location.installWebGeolocationPolyfill();
        navigator.geolocation.getCurrentPosition(
          //Will give you the current location
          position => {
            const currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            //getting the Latitude from the location json
            //setCurrentLongitude({ currentLongitude: currentLongitude });
            //setLatitude(currentLatitude);
           // console.log(currentLatitude);
            //Setting state Longitude to re re-render the Longitude Text
           // setCurrentLatitude({ currentLatitude: currentLatitude });
           //setLongitude(currentLongitude);
         //  console.log(currentLongitude);
           setLoc(currentLatitude,currentLongitude);
            //Setting state Latitude to re re-render the Longitude Text
          },
          error =>(error.message),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
         watchID = navigator.geolocation.watchPosition(position => {
          //Will give you the location on location change
          console.log(position);
          const currentLongitude = JSON.stringify(position.coords.longitude);
          //getting the Longitude from the location json
          const currentLatitude = JSON.stringify(position.coords.latitude);
          //getting the Latitude from the location json
         // setCurrentLongitude({ currentLongitude: currentLongitude });
          //setLongitude(currentLongitude);
        // console.log(currentLongitude);
         
       
          //Setting state Longitude to re re-render the Longitude Text
         // setCurrentLatitude({ currentLatitude: currentLatitude });
         //setLatitude(currentLatitude);
        // console.log(currentLatitude);
         setLoc(currentLatitude,currentLongitude);
          //Setting state Latitude to re re-render the Longitude Text
        });
    })

         useEffect(()=>{
            navigator.geolocation.clearWatch(watchID);
         })   
    
}
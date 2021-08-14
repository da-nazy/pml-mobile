import React, { useState,useContext } from "react";
import { View, Text, TouchableOpacity,StatusBar} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { AppColor } from "../WorkerComp/AppColor";
import { UserContext } from "../DataProvider/UserContext";
export default function SearchAdress({navigation,route}) {
  const {navigate}=navigation;
 const usercontext=useContext(UserContext);
 const {userLoc,setUserLoc,senderLoc,setSenderLoc,userPickupDetails,setuserPickupDetails}=usercontext;
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  return (
    <View>
      <StatusBar animated={true} backgroundColor={AppColor.third} />
      <View style={{flexDirection:'column',marginTop:20,margin:5}}>
        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
          <Icon name="exclamation-circle" size={25} color={AppColor.third} style={{width:'20%',textAlign:'center',alignSelf:'center'}} />
          <Text style={{width:'75%',fontSize:15,textAlign:'left',padding:5}}>
            You can enter the address of a landmark closest to your location, if
            your location is not returned by the search. You can also select
            from previous address used.
          </Text>
        
        </View>
        <TouchableOpacity style={{flexDirection:'row',justifyContent:'flex-end'}}> 
          <Text style={{fontSize:15,fontWeight:'bold',margin:10,color:`${AppColor.secondary}`}}>Dismiss</Text>
            </TouchableOpacity>
      </View>
      <TouchableOpacity style={{flexDirection:'row',margin:5}} onPress={()=>navigate('PickLocation')}><Icon name="map-marker-alt" size={15} color={AppColor.third} />
        <Text>  Select Location From Map</Text>
      </TouchableOpacity>

        <GooglePlacesAutocomplete
          styles={{
            container: {
              position: "absolute",
              width: "100%",
              top: 200,
              height: "50%",
              paddingRight:5,
              paddingLeft:5,
            },
            listView: { backgroundColor: "white", zIndex: 500, marginTop: 5,padding:5},
          }}
          placeholder="Search"
          fetchDetails={true}
          enablePoweredByContainer={false}
          GooglePlacesSearchQuery={{
            rankby: "distance",
          }}
          onPress={(data, details = null) => {
            console.log("Clicked")
            /**
             * if(userPickupDetails.locType==2){
             // for sender 
             if(userLoc.lat){
               navigate('location',{
                 showDirection:true,
                 pickupLat:details.geometry.location.lat,
                 pickupLng:details.geometry.location.lng,
                 address:data.description,
                 loc:2
               })
             }else{
               navigate('location');
             }

            }else if(userPickupDetails.locType==1){
               navigate('location',{
                 
               })
               
            }
             */
            // 'details' is provided when fetchDetails = true
           // console.log(data, details);
           //console.log(details.geometry);
           // check if 1st or 2rnd user

           //console.log(userPickupDetails.locType);
           // console.log(data.description);
           // console.log(details.geometry.location);
            if(userPickupDetails.locType==1){
            setUserLoc({...userLoc,lat:details.geometry.location.lat,lng:details.geometry.location.lng,address:data.description}, navigate('location'));
          
            console.log(userLoc); 
            console.log(1);
          }else if(userPickupDetails.locType==2){
            setSenderLoc({...senderLoc,lat:details.geometry.location.lat,lng:details.geometry.location.lng,address:data.description}, navigate('location')); 
           
            console.log(senderLoc); 
            console.log(2);
          }
         //  console.log(details.geometry.location)
            setRegion({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          }}
          // renderRightButton={(e) => mapDetails.height==250?<TouchableOpacity  onPress={()=>this.textInput.clear()} style={{padding:10}}><Icon name="times" size={15} color="#000"/></TouchableOpacity>:null}
          query={{
            key: "AIzaSyCE41gWBv1AfHzJNsyvCQe6FIPpYHLKcrs",
            language: "en",
            components: "country:ng",
            types: "establishment",
            radius: 30000,
            location: `${region.latitude},${region.longitude}`,
          }}
        />
    </View>
  );
}

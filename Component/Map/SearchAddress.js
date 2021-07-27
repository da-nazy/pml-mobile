import React,{useState} from 'react';
import {View ,Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { AppColor } from '../WorkerComp/AppColor';
export default function SearchAdress(){
    const [region,setRegion]=useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    })
    return(
   <View>
      <View>
          <View>
              <Icon name="exclamation-circle" size={15} color={AppColor.third}/>
         <Text>
              You can enter the address of a landmark closest to your location,
              if your location is not returned by the serach. 
              You can also select from previous address used.
         </Text>
          </View>
           <TouchableOpacity><Text>Dismiss</Text></TouchableOpacity>
          </View> 
          <View>
          <GooglePlacesAutocomplete
      ref={texInput}
        styles={{
          container: {
            position: "absolute",
            width: "100%",
            top: 45,
            elevation: 1,
            height: "50%",
          },
          listView: { backgroundColor: "white", zIndex: 500, marginTop: 5 },
        }}
        placeholder="Search"
        fetchDetails={true}
        
        enablePoweredByContainer={false}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
          setRegion({
            latitude:details.geometry.location.lat,
            longitude:details.geometry.location.lng,        
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          })
        
        }}
       // renderRightButton={(e) => mapDetails.height==250?<TouchableOpacity  onPress={()=>this.textInput.clear()} style={{padding:10}}><Icon name="times" size={15} color="#000"/></TouchableOpacity>:null}
        query={{
          key: "AIzaSyCE41gWBv1AfHzJNsyvCQe6FIPpYHLKcrs",
          language: "en",
          components: "country:us",
          types: "establishment",
          radius: 30000,
          location: `${region.latitude},${region.longitude}`,
        }}
      />
          </View>
          <TouchableOpacity><Icon name="map-marker-alt" size={15} color={AppColor.third}/><Text>Select Location From Map</Text> </TouchableOpacity>
   </View>
    )
}
import React, { useState, useEffect, useRef, useContext } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  JSON,
  Text,
} from "react-native";
import MapViewDirections from "react-native-maps-directions";
import InputComp from "../WorkerComp/InputComp";
import Icon from "react-native-vector-icons/FontAwesome5";
import { AppColor } from "../WorkerComp/AppColor";
import {locations} from './locations';
import LoaderComp from "../WorkerComp/LoaderComp";
import { apiRequest, api, pinColor } from "../WorkerComp/Api";
import { UserContext } from "../DataProvider/UserContext";
import Custombtm from "../WorkerComp/Custombtm";
export default function PickupLocationMap({ navigation }) {
  const { navigate } = navigation;
  const usercontext = useContext(UserContext);
  const {
    userLoc,
    setUserLoc,
    senderLoc,
    setSenderLoc,
    userPickupDetails,
    setuserPickupDetails,
  } = usercontext;
    
  const operation=()=>{
    (userPickupDetails.operation);
      if(userPickupDetails.operation=='pickup'){
        navigate('Details');
      }else if(userPickupDetails.operation=='parcel'){
        navigate('Create Parcel');
      }else{
      //  ("Operation Error")
      }
  }

  const proceed = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          position: "absolute",
          alignSelf: "flex-end",
          flexDirection: "row",
          width: "95%",
          bottom: 25,
          height: 50,
          margin: 5,
        }}
      >
        <TouchableOpacity onPress={()=>operation()} style={styles.procBtn}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
              borderRadius: 5,
              color:'#fff',
            }}
          >
            PROCEED
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // (userLoc,senderLoc);
  const pickOperation = (e) => {
   // (e)
    setuserPickupDetails({ ...userPickupDetails, locType: e });
    if (coordinates.latitude) {
      setUserLoc(
        {
          ...userLoc,
          lat: coordinates.latitude,
          lng: coordinates.longitude,
          address: coordinates.address,
        },
        navigate("SearchAddress")
      );
    } else {
    //  ("error");
    }
    // navigate('SearchAddress');
  };

  const succFunc = (e) => {
    //(e);
  };
 
  // Calling the Location to get LatLng for user.

  const [pickupAddress, setPickupAddress] = useState({
    latitude: null,
    longitude: null,
    address: "Searching...",
    senderAddress: "...",
  });
  const [coordinates, setCoordinates] = useState({
    address: "",
    latitude: 0,
    longitude: 0,
    id: 1,
  });

  const payload = (e) => {
  
    if (e.data.results[0].formatted_address) {
      // setPickupAddress({...pickupAddress,address:e.data.results[0].formatted_address})
      setCoordinates( { ...coordinates, address: e.data.results[0].formatted_address });
    }
  };

  const [appOperation, setAppOperation] = useState({
    load: false,
    currentLoc: false,
  });

  
    locations((e, c) => setcoord(e, c));
 

  const setcoord = (e, c) => {
    
    if (!coordinates.longitude > 0) {
      setCoordinates(
        { ...coordinates, latitude: e, longitude: c }
      );
   
    }

  };

  const reverseGeoCode = (lat, lng) => {
    // request Object
    var requestObject = {
      method: "get",
      url: `${api.googleReversGeoCodeUrl}${lat},${lng}&key=${api.googleApiKey}`,
      data: {},
    };

   // (requestObject);
    apiRequest(
      requestObject,
      (e) => setAppOperation({ ...appOperation, load: e }),
      (e) => succFunc(e),
      (e) => errorFunc(e),
      (e) => payload(e)
    );
    setAppOperation({ ...appOperation, currentLoc: true });
  };

  const mapRef = useRef(null);

  useEffect(() => {
    if (!coordinates.address) {
      if(!coordinates.latitude==0){
        reverseGeoCode(coordinates.latitude, coordinates.longitude);
      }
     
      //check if lat&lng is 0
    }
  }, [coordinates]);
  return (
    <View style={styles.container}>
      <View style={styles.pick}>
        <View style={{ height: 90, alignSelf: "center", width: "5%" }}>
          <Icon
            name="circle"
            size={15}
            color={pinColor.color2}
            style={{ fontWeight: "bold" }}
          />
          <View
            style={{
              flex: 1,
              borderStyle: "dotted",
              borderLeftWidth: 1,
              borderLeftRadius: 1,
              marginLeft: 6,
            }}
          ></View>
          <Icon
            name="circle"
            size={15}
            color={pinColor.color17}
            style={{ fontWeight: "bold" }}
          />
        </View>
        <View style={{ width: "90%" }}>
          <TouchableOpacity onPress={() => pickOperation(1)}>
            <InputComp
              value={userLoc.address ? userLoc.address : coordinates.address}
              style={styles.btn}
              mode="outlined"
              editable={false}
              label="Pick-up  Address "
              placeholder="Select Pickup address"
              setText={(e) => (e)}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pickOperation(2)}>
            <InputComp
              value={
                senderLoc.address
                  ? senderLoc.address
                  : pickupAddress.senderAddress
              }
              style={styles.btn}
              pointerEvents="none"
              mode="outlined"
              editable={false}
              label="Drop-off Address "
              placeholder="Searching..."
              setText={(e) => (e)}
            />
          </TouchableOpacity>
        </View>
      </View>
      {userLoc.lat && senderLoc.lat ? (
        //setPickupAddress({...pickupAddress,senderAddress:senderLoc.address})

        <View style={{ flexDirection: "row" }}>
          <MapView
            style={styles.map}
            onMapReady={() => console.log("Map ViewDirection")}
            initialRegion={{
              latitude: userLoc.lat,
              longitude: userLoc.lng,
              latitudeDelta: 0.0622,
              longitudeDelta: 0.0121,
            }}
            provider="google"
          >
            <MapViewDirections
              lineDashPattern={[0]}
              origin={{
                latitude: userLoc.lat,
                longitude: userLoc.lng,
              }}
              destination={{
                latitude: senderLoc.lat,
                longitude: senderLoc.lng,
              }}
              apikey={api.googleApiKey} // insert your API Key here
              strokeWidth={3}
              strokeColor={AppColor.third}
            />
            <Marker
              pinColor={pinColor.color2}
              coordinate={{ latitude: userLoc.lat, longitude: userLoc.lng }}
            />
            <Marker
              pinColor={pinColor.color17}
              coordinate={{ latitude: senderLoc.lat, longitude: senderLoc.lng }}
            />
          </MapView>
          {proceed()}
        </View>
      ) : coordinates.latitude > 0 && !senderLoc.lat ? (
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
        ></MapView>
      ) : null}
      {appOperation.load && <LoaderComp size={15} color={AppColor.third} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    top: 5,
  },
  pick: {
    flexDirection: "row",
    position: "absolute",
    margin: 10,
    zIndex: 1,
    width: Dimensions.get("screen").width / 1.13,
    borderRadius: 5,
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  btn: {
    margin: 5,
    height: 50,
    fontSize: 13,
    textAlign: "left",
  },
  procBtn: {
    borderRadius: 2,
    width: "90%",
    height: 40,
    justifyContent:"center",
    backgroundColor:`${AppColor.third}`,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});

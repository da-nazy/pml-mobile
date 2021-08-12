import React, { useState,useContext } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  
} from "react-native";
import menu_bg from "../Assets/menu_bg.png";
import Icon from "react-native-vector-icons/FontAwesome5";
import { AppColor } from "../WorkerComp/AppColor";
import { UserContext } from "../DataProvider/UserContext";
export default function SelectCat({navigation}) {
  const usercontext=useContext(UserContext);
  const {navigate}=navigation;
  const{userPickupDetails,setuserPickupDetails}=usercontext;
  
  const setPickupType=(e)=>{
    setuserPickupDetails({...userPickupDetails,pickupType:e});
     navigate('location');
  }

  const [transport, setTransport] = useState([
    {
      image: "motorcycle",
      name: "Motor Bike",
      desc: "Ideal for light weight items: International passport, human hari, mobile phones e.t.c",
      func:()=>{setPickupType("Motor Bike")}
    },
    {
      image: "car-side",
      name: "Car",
      desc: "For items that cannot fit a motor bike: Microwave, bags of clothes, television, e.t.c",
      func:()=>{setPickupType("Car")}
    },
    {
      image: "shuttle-van",
      name: "Mini Van",
      desc: "Ideal for big and bulky items: Refrigerator, washing machine,air conditionar, standing fan, e.t.c",
      func:()=>{setPickupType("Mini Van")}
    },
    {
      image: "truck-moving",
      name: "Truck",
      desc: "Perfect for moving very large items: Furniture, office equipment, outdoor equipment e.t.c ",
      func:()=>{setPickupType("Truck")}
    },
  ]);
  return (
    <View>
      <ImageBackground
        source={menu_bg}
        resizeMode="cover"
        style={style.image}
        blurRadius={5}
      >
        <View >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            Hello Ani,
          </Text>
          <Text style={{ color: "#fff", width: "80%", fontSize: 15 }}>
            {" "}
            Please select the most suitable vehicle to pickup up your item(s)
          </Text>
        </View>
      </ImageBackground>
      <ScrollView
        style={{
          height: Dimensions.get("screen").height / 1.57,
          paddingTop: 20,
         borderTopRightRadius:10,
         borderTopLeftRadius:10,
         top:-10,
         backgroundColor:'#fff',
        }}
      >
       {transport&&(transport.map((e,i)=>{
           return(
            <TouchableOpacity 
            onPress={()=>e.func()}
            key={i}
            style={style.transTypecontainer}
          >
          <View style={{width:'30%',borderBottomLeftRadius:8,borderTopLeftRadius:8,justifyContent:'center',backgroundColor:'#F8C081'}}>
          <Icon name={e.image} size={40} color="#000" style={{textAlign:'center'}}/>
            </View>
            <View style={{width:'70%',borderBottomRightRadius:8,borderTopRightRadius:8,paddingLeft:5,paddingTop:5,backgroundColor:'#FCEAD5'}}>
                <Text style={{fontWeight:'bold'}}>
                {e.name}
                </Text>
                <Text style={{color:'#4c4a4a'}}>
                {e.desc}
                </Text>
            </View>
          </TouchableOpacity>
           )
       }))}
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  image: {
    height: 200,
    justifyContent: "flex-end",
    paddingBottom: 20,
    paddingLeft: 15,
  },
  transTypecontainer: {
    height: 85,
    margin: 5,
    borderRadius: 8,
    backgroundColor:'#fff',
    shadowColor: "#000",
    flexDirection:'row',
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 4,
  },
});

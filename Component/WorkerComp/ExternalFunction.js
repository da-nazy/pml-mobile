import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { AppColor } from "./AppColor";
import { RadioButton } from "react-native-paper";

export const packaging = [
  {
    name: "BAG",
  },
  {
    name: "CRATE",
  },
  {
    name: "BOX",
  },
  {
    name: "PACK",
  },
  {
    name: "ROW",
  },
  {
    name: "CARTON",
  },

  {
    name: "PACK",
  },

  {
    name: "GALLON",
  },

  {
    name: "BOTTLE",
  },

  {
    name: "JUG",
  },
  {
    name: "TIN",
  },
  {
    name: "CAN",
  },
  {
    name: "PACKET",
  },
  {
    name: "SACHET",
  },
  {
    name: "BUCKET",
  },
  {
    name: "PEN",
  },
  {
    name: "BAR",
  },
];

export const VEHICLE_TYPE = [
  { name: "BUS" },
  { name: "CAR" },
  { name: "TAXI" },
  { name: "KEKE" },
  { name: "BIKE" },
  { name: "JEEP" },
];

export const VEHICLE_MAKE = [
  { name: "TOYOTA" },
  { name: "UGAMA" },
  { name: "MEIYER" },
  { name: "SIENNA" },
  { name: "KINGO" },
];
export const PAYMENT = {
  // paystak or wallet
  GATEWAY: {
    FLUTTERWAVE: "FLUTTERWAVE",
    UNIONBANK: "UNIONBANK",
    PAYSTACK: "PAYSTACK",
    PAYPAL: "PAYPAL",
    WALLET: "WALLET",
  },
  METHOD: {
    POS: "POS",
    CASH: "CASH",
    GATEWAY: "GATEWAY",
  },
  STATUS: { PENDING: "PENDING", SUCCESSFUL: "SUCCESSFUL", FAIL: "FAIL" },
};

export const IconComp = (name, style, size, color) => {
  return <Icon name={name} size={size} color={color} style={style} />;
};

export const noParcel = () => {
  return (
    <View>
      <Text style={{ margin: 5 }}> No Parcel Created Yet!</Text>
      <TouchableOpacity style={style.parcelCreateBtn}>
        <Text
          style={{ textAlign: "center", fontWeight: "bold", color: "#fff" }}
        >
          Create Parcel
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const succFunc=(e)=>{
Alert.Alert("Success",e)
}
export const failFunc=(e)=>{
Alert.alert("Error",e);
}
export const getPayload=(e)=>{
  return e;
}

export const parcelComp = (item) => {
 
    return(
         <View style={style.parcelComp}>
      <Text style={{ width: "66%", alignSelf: "center" }}>{item.name}</Text>
      <TouchableOpacity onPress={()=>console.log(item)} style={{ width: "10%", justifyContent: "center" }}>
        {IconComp("eye", { alignSelf: "center" }, 15, AppColor.third)}
      </TouchableOpacity>
    </View>
    )
  
 
};
const style = StyleSheet.create({
  parcelComp: {
    paddingLeft:5,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    borderRadius: 2,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  parcelCreateBtn: {
    marginLeft: 5,
    width: "45%",
    height: 30,
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor:`${AppColor.third}`,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

import React,{useContext} from "react";
import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { AppColor } from "./AppColor";
import { UserContext } from "../DataProvider/UserContext";
export const regX={
  phoneFilter:/^\d{11}$/,
  emailFilter:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,

}

  export const clearAppState=()=>{
    const usercontext=useContext(UserContext);
    const{userLoc,senderLoc,setUserLoc,setSenderLoc,setuserPickupDetails,userPickupDetails}=usercontext;

     setUserLoc({userLoc, lat:null, lng:null,address:null,type:1});
     setSenderLoc({senderLoc, lat:null, lng:null,address:null,type:1});
     setuserPickupDetails({...userPickupDetails, pickupType:'',locType:1,});
  }
export const validatePhone=(e)=>{
  if(regX.phoneFilter.test(e)){
 //   setUser({...user,type:'email'});
      return true;  
}
}
export const validateEmail=(e)=>{
 if(regX.emailFilter.test(e)){
 //   setUser({...user,type:'email'});
      return true;  
}

}

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
Alert.alert("Success",e)
}
export const failFunc=(e)=>{
Alert.alert("Error",e);
}
export const getPayload=(e)=>{
  return e;
}
export const head=(e)=>{
  return( <View style={{flexDirection:'column',justifyContent:'center',height:35,paddingLeft:10,backgroundColor:`${AppColor.lightThird}`}}><Text style={{fontWeight:'bold',fontSize:15}}>{e}</Text></View>
  )
}
export const addParcelHead=(e,func)=>{
  return( <View style={{flexDirection:'row',justifyContent:'space-between',height:35,paddingLeft:10,backgroundColor:`${AppColor.lightThird}`}}>
    <View style={{flexDirection:'row',justifyContent:"center"}}>{IconComp("box",{alignSelf:'center',marginRight:5},15,AppColor.third)}
    <Text style={{fontWeight:'bold',fontSize:15,alignSelf:"center"}}>{e}</Text></View><TouchableOpacity onPress={()=>func()} style={{marginRight:8,justifyContent:'center'}}>{IconComp('plus',{fontWeight:'bold',marginRight:5},18,AppColor.third)}</TouchableOpacity></View>
  ) 
}

export const parcelIdComp = (item,i,remFunc,icon,m) => {
 
  return(
       <View style={style.parcelIdComp} key={i}>
      <TouchableOpacity onPress={()=>remFunc(m?m.id:item)} style={{ width: "10%", justifyContent: "center" }}>
        {IconComp(icon, { alignSelf: "center" }, 15, AppColor.third)}
      </TouchableOpacity>
    <Text style={{ width: "66%", alignSelf: "center" }}>{item}</Text>
    <TouchableOpacity onPress={()=>m?console.log(m.id):console.log(item)} style={{ width: "10%", justifyContent: "center" }}>
      {IconComp("eye", { alignSelf:"center"}, 15, AppColor.third)}
    </TouchableOpacity>
  </View>
  )


};
export const parcelComp = (item) => {
 
    return(
         <View style={style.parcelComp}>
           
      <Text style={{ width: "66%", alignSelf: "center" }}>{item.name}</Text>
      <TouchableOpacity onPress={()=>console.log(item.id)} style={{ width: "10%", justifyContent:"center" }}>
        {IconComp("eye", { alignSelf: "center" }, 15, AppColor.third)}
      </TouchableOpacity>
    </View>
    )
  
 
};

export const modalView=(setView,mdbStyle,mdStyle)=>{
  return(
   <View style={mdbStyle}> 
     <Modal 
     style={mdStyle}
   animationType="slide"
   transparent={true}
   visible={modalVisible}
   onRequestClose={() => {
     Alert.alert("Modal has been closed.");
     setModalVisible(!modalVisible);
   }}
 >
  
 </Modal></View>

  )
}
const style = StyleSheet.create({
  parcelIdComp: {
    height:35,
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

export  const wait=(timeout)=>{
  return new Promise(resolve=>setTimeout(resolve,timeout));
}

export const sortAlphabet=(sortValue)=>{
  var sortAlph=sortValue.slice(0);
  sortAlph.sort(function(a,b) {
    var x = a.name.toLowerCase();
    var y = b.name.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });
  return sortAlph;
}
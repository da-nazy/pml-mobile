import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import InputComp from "./InputComp";
import { AppColor } from "./AppColor";
import { IconComp,noParcel,parcelComp } from "./ExternalFunction";
import { Picker } from "@react-native-community/picker";
export default function Details() {
    const[item,setItems]=useState([
        {
          id:1,
          name:"Phone",
        },
        {
            id:2,
            name:"Xbox"
        },
        {
            id:3,
            name:"PC"
        },
        {
            id:4,
            name:"Shoe"
        }

    ]);

    var selectedparcels=[
        {
            id:4,
            name:"Shoe"
        }

    ];

    const checkParcel=(e)=>{
     const object=selectedparcels.filter((item)=>item.id===e);
     if(!object.length==0){
         return true;
     }else{
         return false;
     }
    }
   /**
      const object = parcel.filter(
        (item) => item.id === parcelDetails.currentParcelId
      );
   
    * 
    */

    const addRemoveParcel=(e,c)=>{
       
        const object=selectedparcels.filter((item)=>item.id===e);
        if(!object.length==0){
          selectedparcels = selectedparcels.filter((item)=>item.id!==e);
          console.log("remove");
        }else{
            console.log("add")
           selectedparcels.push(c);
           console.log(selectedparcels);
        }
    }

  const [stateFrom, setStateFrom] = useState(null);
 const head=(e)=>{
     return( <View style={{flexDirection:'column',justifyContent:'center',height:35,paddingLeft:10,backgroundColor:`${AppColor.lightThird}`}}><Text style={{fontWeight:'bold',fontSize:15}}>{e}</Text></View>
     )
 }
 const addParcelHead=(e)=>{
    return( <View style={{flexDirection:'row',justifyContent:'space-between',height:35,paddingLeft:10,backgroundColor:`${AppColor.lightThird}`}}><View style={{flexDirection:'row',justifyContent:"center"}}>{IconComp("box",{alignSelf:'center',marginRight:5},15,AppColor.third)}<Text style={{fontWeight:'bold',fontSize:15,alignSelf:"center"}}>{e}</Text></View><TouchableOpacity style={{marginRight:8,justifyContent:'center'}}>{IconComp('plus',{fontWeight:'bold',marginRight:5},18,AppColor.third)}</TouchableOpacity></View>
    ) 
 }
  return (
    <ScrollView>
      <StatusBar animated={true} backgroundColor={AppColor.third} />
      <View style={style.sendCont}>
          {head("Sender's Info:")}
         <View style={{padding:8}}>
        <InputComp label="Pickup Address" mode="outlined" />
        <InputComp label="Sender Phone" mode="outlined" />
        <InputComp label="vehicle Type" mode="outlined" editable={false} />
        <InputComp label="Description" mode="outlined" />
        <View style={{ flexDirection: "row", margin: 10,justifyContent:"center" }}>
          <TouchableOpacity style={{ width: "10%" ,justifyContent:'center'}}>
            {IconComp("sync-alt", {justifyContent:'center',alignSelf:'center'}, 15, AppColor.third)}
          </TouchableOpacity>
          <Picker
            selectedValue={stateFrom}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }
            style={{ borderWidth: 1, width: "80%" }}
          >
            <Picker.Item label="State From " value="" />
          </Picker>
        </View>
        </View>
      </View>
      <View style={style.sendCont}>
      {head("Receiver's Info:")}
      
        <View style={{padding:10}}>
        <InputComp label="Delivery Address" mode="outlined" />
        <View style={{ flexDirection: "row",justifyContent:'space-between' }}>
          {false&&(<TouchableOpacity style={{ width: "10%", justifyContent: "center" }}>
            { IconComp(
              true ? "check" : "times",
              { textAlign: "center" },
              15,
              AppColor.third
            )}
          </TouchableOpacity>)}
          <InputComp
            label="Receipent Phone or Email"
            mode="outlined"
            style={{ width: "80%" }}
          />
          <TouchableOpacity style={{ justifyContent: "center", width: "10%" }}>
            {IconComp("sync-alt", { textAlign: "center" }, 15, AppColor.third)}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", margin: 10 ,justifyContent:'space-evenly'}}>
          <TouchableOpacity style={{ width: "10%",justifyContent:'center' }}>
            {IconComp("sync-alt", null, 15, AppColor.third)}
          </TouchableOpacity>
          <Picker
            selectedValue={stateFrom}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }
            style={{ borderWidth: 1, width: "80%" }}
          >
            <Picker.Item label="State To " value="" />
          </Picker>
        </View>
        </View>
      </View>

      <View style={style.sendCont}>
          {addParcelHead("Add Parcels:")}
         <View style={{padding:8}}>
         {false&&(noParcel())}
         {parcelComp(item,(e)=>addRemoveParcel(e),(e)=>checkParcel(e))}
     
        </View>
      </View>
      <TouchableOpacity style={style.contBtn}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 15,
            textAlign: "center",
            color: "#fff",
          }}
        >
          CONTINUE
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const style = StyleSheet.create({
   
  contBtn: {
    backgroundColor: `${AppColor.third}`,
    width: "80%",
    alignSelf: "center",
    height: 40 ,
    margin: 8,
    justifyContent: "center",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  sendCont:{
    backgroundColor:"#fff",
    margin:10,
    borderRadius:2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
});

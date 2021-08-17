import React, { useState,useEffect,useContext} from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  LogBox,
  Alert
} from "react-native";
import InputComp from "./InputComp";
import { AppColor } from "./AppColor";
import { IconComp,noParcel,parcelComp } from "./ExternalFunction";
import { Picker } from "@react-native-community/picker";
import SelectableFlatlist, { STATE } from 'react-native-selectable-flatlist';
import { api,apiRequest} from "./Api";
import { UserContext } from "../DataProvider/UserContext";
import LoaderComp from "./LoaderComp";
export default function Details() {
  
  const usercontext=useContext(UserContext);
  const{userLoc,senderLoc,userPickupDetails,user,authUser}=usercontext;
    const [appDetails,setAppDetails]=useState({
      load:false,

    });

  const [pickupAddress,setPickupAddress]=useState({
      address:'',
  })
   const [senderPhone,setSenderPhone]=useState({
       phone:'',
   });
   const [pickupDesc,setPickupDesc]=useState({
     description:'',
     descError:false,
   })

  const [stateFrom,setStateFrom]=useState({
    stateId:'',
    stateName:'',
  })

  const[stateTo,setStateTo]=useState({
     stateId:'',
     stateName:'',
  })

  const [ngState,setNgState]=useState(null);

  useEffect(() => {
    // Should avoid virtualized list  the log list error
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])

  const succFunc=(e)=>{
  Alert.alert("Success",e)
  }

  const failFunc=(e)=>{
  Alert.alert("Error",e);
  }

  const getStatePayload=(e)=>{
    console.log(e);
    setNgState(e.data.payload);
  }
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

    const [deliveryAdd,setDeliveryAdd]=useState({
      address:'',
    })
    const[recpientPhoneEmail,setRecipientPhoneEmail]=useState({
      emailPhone:'',
    })
   const[selectedParce,setSelectedParcel]=useState(null);
   const[parcel,setParcel]=useState(null);

    const selected=[];
    const   itemsSelected = (selectedItem) => {
      //  console.log(selectedItem);
         selected.push(selectedItem);
        // console.log(selected);
         // should map and update constatly
        const parcelId=[];
         selectedItem.map((e)=>{
          parcelId.push(e.id);
         })
         
         if(parcelId){
           console.log(parcelId);
         }
     
      }
     const  getStateList=()=>{
        if(!ngState){
          getState();
        }else{
          console.log("State already gotten")
        }
     } 
    
    const getState=()=>{
       // state request object
       var stateObject={
         method:"get",
         url:`${api.localUrl}${api.getState}`,
         headers:{
          Authorization:' Bearer ' + authUser.token,
        }
       }
       console.log(stateObject);
       apiRequest(stateObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>getStatePayload(e));
 
    }
   
   const inputCheck=()=>{
     // Things to check
     // Statefrom and to
     //Description
     // Receipient Phone or email
     // Parcels
     var check=true;
     var errorMessage="";
     if(!pickupDesc.description){
       check=false;
       setPickupDesc({...pickupDesc,descError:true});
     }else{
       setPickupDesc({...pickupDesc,descError:false});
     }


   }
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
        <InputComp label="Pickup Address" mode="outlined" value={pickupAddress.address?pickupAddress.address:userLoc.address}  editable={false}/>
        <InputComp label="Sender Phone" mode="outlined" value={user.phone?user.phone:''} />
        <InputComp label="vehicle Type" mode="outlined" editable={false} value={userPickupDetails.pickupType} />
        <InputComp label="Description" mode="outlined" setText={(e)=>setPickupDesc({...pickupDesc,description:e})} error={pickupDesc.descError} />
        <View style={{ flexDirection: "row", margin: 10,justifyContent:"center" }}>
          <TouchableOpacity style={{ width: "10%" ,justifyContent:'center'}} onPress={()=>getStateList()}>
            {IconComp("sync-alt", {justifyContent:'center',alignSelf:'center'}, 15, AppColor.third)}
          </TouchableOpacity>
          <Picker
            selectedValue={stateFrom}
            onValueChange={(itemValue, itemIndex) =>
              setStateFrom({...stateFrom,stateId:itemValue})
            }
            style={{ borderWidth: 1, width: "80%" }}
          >
              <Picker.Item label="State From " value="" />
            {ngState&&(ngState.map((e,i)=>{
              return(
                <Picker.Item key={i} label={e.name} value={e.id} />
              )
            }))}
          
          </Picker>
        </View>
        </View>
      </View>
      <View style={style.sendCont}>
      {head("Receiver's Info:")}
      
        <View style={{padding:10}}>
        <InputComp label="Delivery Address" mode="outlined" value={deliveryAdd.address?deliveryAdd.address:senderLoc.address} editable={false} />
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
            setText={(e)=>setRecipientPhoneEmail({...recpientPhoneEmail,emailPhone:e})}
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
              setStateTo({...stateTo,stateId:itemValue})
            }
            style={{ borderWidth: 1, width: "80%" }}
          >
            <Picker.Item label="State To " value="" />
            {ngState&&(ngState.map((e,i)=>{
              return(
                <Picker.Item key={i} label={e.name} value={e.id} />
              )
            }))}
          </Picker>
        </View>
        </View>
      </View>

      <View style={style.sendCont}>
          {addParcelHead("Add Parcels:")}
         <View style={{padding:8}}>
         {false&&(noParcel())}
         <SafeAreaView style={{flex: 1}}>
         <SelectableFlatlist
                        // data={[{ test: 'test1' }, { test: 'test2' }, { test: 'test3' }]}
                        //TODO selected parcels should be updated so that It won't be populated again.
                         data={item}
                         checkColor={AppColor.third}
                         state={STATE.EDIT}
                         multiSelect={true}
                         itemsSelected={(selectedItem) => { itemsSelected(selectedItem) }}
                         initialSelectedIndex={[]}
                         cellItemComponent={(item, otherProps) => parcelComp(item)}
                       />
         </SafeAreaView>
         {/*parcelComp(item,(e)=>addRemoveParcel(e),(e)=>checkParcel(e))*/}
     
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
      {appDetails.load&&<LoaderComp/>}
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

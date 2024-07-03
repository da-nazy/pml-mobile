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
import { IconComp,noParcel,parcelComp,validateEmail,validatePhone} from "./ExternalFunction";
import { Picker } from "@react-native-picker/picker";
import { api,apiRequest,ngStates} from "./Api";
import { UserContext } from "../DataProvider/UserContext";
import LoaderComp from "./LoaderComp";
export default function Details({navigation}) {
    
  const{navigate}=navigation;

  const usercontext=useContext(UserContext);
  const{userLoc,senderLoc,userPickupDetails,user,authUser,setUserLoc,setSenderLoc,setuserPickupDetails}=usercontext;

  const[userParcels,setUserParcels]=useState(null);

    const [appDetails,setAppDetails]=useState({
      load:false,
      userValid:null,
      receiverObjectId:'',
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



  useEffect(() => {
    // Should avoid virtualized list  the log list error
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])

  const succFunc=(e)=>{
  if(e){
   // Alert.alert("Success",e);
   (e);
  }else{
    (e);
  }
  }

  const failFunc=(e)=>{
  Alert.alert("Error",e);
  }
    const getUserParcelPayload=(e)=>{
      (e)
      if(e.data.payload.length!==0){
        (e.data.payload);
      setUserParcels(e.data.payload);
      }else{
        setUserParcels("Empty Parcel");
      }

    

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
      emailPhoneError:false,
    })
   const[selectedParcel,setSelectedParcel]=useState(null);
   const[parcel,setParcel]=useState(null);

    const selected=[];
    const   itemsSelected = (selectedItem) => {
      //  (selectedItem);
         selected.push(selectedItem);
        // (selected);
         // should map and update constatly
        const parcelId=[];
         selectedItem.map((e)=>{
          parcelId.push(e.id);
          
         })
         
         if(parcelId){
           (parcelId);
         setSelectedParcel(parcelId);
         }
     
      }
   
  
     
    const getUserParcels=()=>{
     var userParcelObect={
          method:"get",
         url:`${api.localUrl}${api.userParcels}${user.id}`,
         headers:{
          Authorization:' Bearer ' + authUser.token,
        }
       }
       (userParcelObect);
       apiRequest(userParcelObect,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>getUserParcelPayload(e));
 
    }
    const clearAppState=()=>{
      setUserLoc({userLoc, lat:null, lng:null,address:null,type:1});
      setSenderLoc({senderLoc, lat:null, lng:null,address:null,type:1});
      setuserPickupDetails({...userPickupDetails, pickupType:'',locType:1,operation:''})
    }
   const compPickOp=()=>{
     clearAppState();
     navigate('Pickup');
   }
    const createPickupPayload=(e)=>{
      //(e);
     (e.data.payload);
     Alert.alert("Success",`Pickup Creation ${e.data.message}`,[
      {
        text: 'Ok',
        onPress: () => compPickOp(),
      },]);
     //if successfull take to pickup section and clear things
    }

    const userCheckPayload=(e)=>{
      (e.data.payload.id);
      if(e.data.payload.length!==0){
         setAppDetails({...appDetails,userValid:'check',receiverObjectId:e.data.payload.id});
      }else{
        setAppDetails({...appDetails,userValid:'times'});
        Alert.alert("USER NOT FOUND","Create user!");
      }
    }
    const isUserValid=()=>{
      setAppDetails({...appDetails,userValid:null});
      if(recipientVerification()){
        var userCheckObject={
          method:"get",
          url:`${api.localUrl}${api.checkUser}phone=${recpientPhoneEmail.emailPhone}`,
          headers:{
           Authorization:' Bearer ' + authUser.token,
         }
        }

        apiRequest(userCheckObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>userCheckPayload(e));
 
      }else{
      }
    }
    const recipientVerification=()=>{
      var check=true;
      if(!recpientPhoneEmail.emailPhone){
        setRecipientPhoneEmail({...recpientPhoneEmail,emailPhoneError:true});
        check=false;
      }else{
       // setRecipientPhoneEmail({...recpientPhoneEmail,emailPhoneError:false});
        if(validatePhone(recpientPhoneEmail.emailPhone)){
          setRecipientPhoneEmail({...recpientPhoneEmail,emailPhoneError:false});
        }else{
          check=false;
          setRecipientPhoneEmail({...recpientPhoneEmail,emailPhoneError:true});
        }
      }
      return check;
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
     if(!stateFrom.stateId){
       check=false;
       
     }
     if(!stateTo.stateId){
       check=false;
     }
     if(!appDetails.receiverObjectId){
         check=false;
         ("here1");
         (appDetails.receiverObjectId);
     }

    return check;

   }

   const createPickup=()=>{
     if(inputCheck()){
       //check parcels
       
      var createPickupObject={
        method:"post",
        url:`${api.localUrl}${api.createPickup}`,
        data:{
         senderType:"C",
         recipientType:"C",
         senderPhone:user.phone?user.phone:'',
         recipientPhone:appDetails.receiverObjectId?recpientPhoneEmail.emailPhone:'',
         stateFrom:stateFrom.stateId,
         stateTo:stateTo.stateId,
         deliveryAddress:senderLoc.address,
         vehicleType:userPickupDetails.pickupType,
         description:pickupDesc.description,
         sender:user.id,
        // pmlParcels:selectedParcel,
        //  paymentGateway  GATEWAY
        //  WALLET: "WALLET",
        //  }
         // },
         recipient:appDetails.receiverObjectId,
         locationFrom:{"coordinates":[userLoc.lat,userLoc.lng],"address":userLoc.address},
         locationTo:{"coordinates":[senderLoc.lat,senderLoc.lng],"address":senderLoc.address}
        },
        headers:{
         Authorization:' Bearer ' + authUser.token,
         'Cache-Control': 'no-cache',
       }
      }
     

      (createPickupObject);

    apiRequest(createPickupObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>createPickupPayload(e));

      
        }else{
      Alert.alert("Empty fields","Fill in the correct values.")
     }
   
       
   }
 const head=(e)=>{
     return( <View style={{flexDirection:'column',justifyContent:'center',height:35,paddingLeft:10,backgroundColor:`${AppColor.lightThird}`}}><Text style={{fontWeight:'bold',fontSize:15}}>{e}</Text></View>
     )
 }
 const addParcelHead=(e)=>{
    return( <View style={{flexDirection:'row',justifyContent:'space-between',height:35,paddingLeft:10,backgroundColor:`${AppColor.lightThird}`}}>
      <View style={{flexDirection:'row',justifyContent:"center"}}>{IconComp("box",{alignSelf:'center',marginRight:5},15,AppColor.third)}
      <Text style={{fontWeight:'bold',fontSize:15,alignSelf:"center"}}>{e}</Text></View><TouchableOpacity onPress={()=>getUserParcels()} style={{marginRight:8,justifyContent:'center'}}>{IconComp('plus',{fontWeight:'bold',marginRight:5},18,AppColor.third)}</TouchableOpacity></View>
    ) 
 }
 
  return (
    <ScrollView>
      <StatusBar animated={true} backgroundColor={AppColor.third} />
      <View style={style.sendCont}>
          {head("Sender's Info:")}
         <View style={{padding:8}}>
        <InputComp label="Pickup Address" mode="outlined" value={pickupAddress.address?pickupAddress.address:userLoc.address}  editable={false}/>
        <InputComp label="Sender Phone" mode="outlined" value={user.phone?user.phone:''} editable={false} />
        <InputComp label="vehicle Type" mode="outlined" editable={false} value={userPickupDetails.pickupType} />
        <InputComp label="Description" mode="outlined" setText={(e)=>setPickupDesc({...pickupDesc,description:e})} error={pickupDesc.descError} />
        <View style={{ flexDirection: "row", margin: 10,justifyContent:"center" }}>
          
          <Picker
            selectedValue={stateFrom.stateId}
            onValueChange={(itemValue, itemIndex) =>
              setStateFrom({...stateFrom,stateId:itemValue})
            }
            style={{ borderWidth: 1, width: "100%" }}
          >
              <Picker.Item label="State From " value="" />
            {ngStates&&(ngStates.map((e,i)=>{
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
          {appDetails.userValid&&(<View style={{ width: "10%", justifyContent: "center" }}>
            { IconComp(
             appDetails.userValid,
              { textAlign: "center" },
              15,
              AppColor.third
            )}
          </View>)}
          <InputComp
            label="Recipient Phone "
            mode="outlined"
            style={{ width: "80%" }}
            setText={(e)=>setRecipientPhoneEmail({...recpientPhoneEmail,emailPhone:e})}
            error={recpientPhoneEmail.emailPhoneError}
          />
          <TouchableOpacity onPress={()=>isUserValid()} style={{ justifyContent: "center", width: "10%" }}>
            {IconComp("sync-alt", { textAlign: "center" }, 15, AppColor.third)}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", margin: 10 ,justifyContent:'space-evenly'}}>
          
          <Picker
            selectedValue={stateTo.stateId}
            onValueChange={(itemValue, itemIndex) =>
              setStateTo({...stateTo,stateId:itemValue})
            }
            style={{ borderWidth: 1, width: "100%" }}
          >
            <Picker.Item label="State To " value="" />
            {ngStates&&(ngStates.map((e,i)=>{
              return(
                <Picker.Item key={i} label={e.name} value={e.id} />
              )
            }))}
          </Picker>
        </View>
        </View>
      </View>

 
     
      <TouchableOpacity  onPress={()=>createPickup()}
      style={style.contBtn}>
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
      {appDetails.load&&<LoaderComp size={25} color={AppColor.third}/>}
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

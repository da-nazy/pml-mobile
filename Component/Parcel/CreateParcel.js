import React, { useState, useEffect, useContext,useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Alert,
  RefreshControl
} from "react-native";
import { AppColor,numberCheck} from "../WorkerComp/AppColor";
import Icon from "react-native-vector-icons/FontAwesome5";
import InputComp from "../WorkerComp/InputComp";
import { Picker } from "@react-native-community/picker";
import { UserContext } from "../DataProvider/UserContext";
import { IconComp, packaging,validatePhone,wait} from "../WorkerComp/ExternalFunction";
import DateTimePicker from "@react-native-community/datetimepicker";
import { api, apiRequest,ngStates} from "../WorkerComp/Api";
import LoaderComp from "../WorkerComp/LoaderComp";
import axios from 'axios';
export default function CreateParcel({navigation}) {
  const{navigate}=navigation;
  const usercontext = useContext(UserContext);
  const {
    userLoc,
    senderLoc,
    userPickupDetails,
    user,
    authUser,
    setUserLoc,
    setSenderLoc,
    setuserPickupDetails,
  } = usercontext;

  const [dateshow, setDateShow] = useState(false);
  const [appDate, setAppDate] = useState(new Date(1598051730000));
  const[estimateBill,setEstimateBill]=useState({
    bill:'',
    error:false,
  })
  const[worth,setWorth]=useState({
    worth:'',
    worthError:'',
  })
  const [appDetails, setAppDetails] = useState({
    load: false,
    categoryId: null,
    packageId: null,
    stateOp: "",
    userValid:null,
    receiverObjectId:'',
    refresh:false,

  });
  
  const [category, setCategory] = useState(null);

  const [name, setName] = useState({
    name: "",
    nameError: false,
  });

  const [desc, setDesc] = useState({
    desc: "",
    descError: false,
  });
  const [weight, setWeight] = useState({
    weight: "",
    weightError: false,
  });
  const [stateFrom, setStateFrom] = useState({
    stateFromId: "",
  });

  const [stateTo, setStateTo] = useState({
    stateToId: "",
  });
  const [mass, setMass] = useState({
    mass: "",
    massError: false,
  });
  const [volume, setVolume] = useState({
    volume: "",
    volumeError: false,
  });
  const [quantity, setQuantity] = useState({
    quantity: "",
    quantityError: false,
  });
  const [id, setId] = useState({
    id: "",
    idError: false,
  });
  const [expectedDate, setExpectedDate] = useState({
    date: "",
    dateError: false,
  });
  const [depatureDate, setDepatureDate] = useState({
    date: "",
    dateError: false,
  });

  const succFunc = (e) => {
    console.log(e);
  };
  const failFunc = (e) => {
    Alert.alert("Error", e);
  };

  const userCheckPayload=(e)=>{
    console.log(e.data.payload.id);
    if(e.data.payload.length!==0){
       setAppDetails({...appDetails,userValid:'check',receiverObjectId:e.data.payload.id});
    }else{
      setAppDetails({...appDetails,userValid:'times'});
      Alert.alert("USER NOT FOUND","Create user!");
    }
  }

  const onRefresh=useCallback(()=>{
   setAppDetails({...appDetails,refresh:true});
   getCategory();
  
  wait(200).then(()=>setAppDetails({...appDetails,refresh:false}))
  })
  const getCategoryPayload = (e) => {
    console.log(e);
    setCategory(e.data.payload);
  };
  const[recpientPhoneEmail,setRecipientPhoneEmail]=useState({
    emailPhone:'',
    emailPhoneError:false,
  })

  const clearAppState=()=>{
    setUserLoc({userLoc, lat:null, lng:null,address:null,type:1});
    setSenderLoc({senderLoc, lat:null, lng:null,address:null,type:1});
    setuserPickupDetails({...userPickupDetails, pickupType:'',locType:1,operation:''})
  }

  const userVerification=()=>{
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

  const isUserValid=()=>{
    setAppDetails({...appDetails,userValid:null});
    if(userVerification()){
      var userCheckObject={
        method:"get",
        url:`${api.localUrl}${api.checkUser}phone=${recpientPhoneEmail.emailPhone}`,
        headers:{
         Authorization:' Bearer ' + authUser.token,
       }
      }
      console.log(userCheckObject);

      apiRequest(userCheckObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>userCheckPayload(e));

    }else{
      console.log("Error");
    }
  }
    
  const compParcel=()=>{
    clearAppState();
    navigate('Parcel');
  }

  const inputCheck = () => {
    var check = true;
    if (!name.name) {
      check = false;
      
      setName({ ...name, nameError: true });
    } else {
      setName({ ...name, nameError: false });
    }
    if (!desc.desc) {
      check = false;
    
      setDesc({ ...desc, descError: true });
    } else {
      setDesc({ ...desc, descError: false });
    }

    if (!stateFrom.stateFromId) {
      check = false;
    }
    if (!stateTo.stateToId) {
      check = false;
    }
    if (!appDetails.categoryId) {
      check = false;
    }
    if (!appDetails.packageId) {
      check = false;
    }

    if (!mass.mass) {
      check = false;
      setMass({ ...mass, massError: true });
    } else {
      if(numberCheck(mass.mass)){
        setMass({ ...mass, massError: false });
      }else{
        check=false;
        setMass({ ...mass, massError:true });
      }
    }

    if (!worth.worth) {
      check = false;
      setWorth({ ...worth, worthError: true });
    } else {
      if(numberCheck(worth.worth)){
        setWorth({ ...worth, worthError: false });
      }else{
        check=false;
        setWorth({ ...worth,worthError:true });
      }
    }

    if (!volume.volume) {
      check = false;
      setVolume({ ...volume, volumeError: true });
    } else {
      if(numberCheck(volume.volume)){
        setVolume({ ...volume, volumeError: false });
      }else{
        check=false;
        setVolume({ ...volume, volumeError:true });
      }
    }

    if (!quantity.quantity) {
      check = false;
      setQuantity({ ...quantity, quantityError: true });
    } else {
      if(numberCheck(quantity.quantity)){
        setQuantity({ ...quantity, quantityError: false });
      }else{
        check=false;
        setQuantity({ ...quantity, quantityError:true });
      }
    }

    if (!id.id) {
      check = false;
      setId({ ...id, idError: true });
    } else {
      setId({ ...id, idError: false });
    }
    if(!expectedDate.date){
      check=false;
      setExpectedDate({...expectedDate,dateError:true})
   
    }else{
      setExpectedDate({...expectedDate,dateError:false})
    }

    if(!depatureDate.date){
      check=false;
      setDepatureDate({...depatureDate,dateError:true})
    }else{
     setDepatureDate({...depatureDate,dateError:false})
    }

    if(!appDetails.receiverObjectId){
      check=false;
      console.log("here1");
      console.log(appDetails.receiverObjectId);
  }
    if(!estimateBill.bill){
      check=false;
      setEstimateBill({...estimateBill,error:true});
    }else{
      
      setEstimateBill({...estimateBill,error:false});
    }

  if(!userLoc.lat&&!userLoc.lng){
    check=false;
  }
  if(!senderLoc.lat&&!senderLoc.lng){
    check=false;
  }
   
    return check;
  };
     
  const billingPayload=(e)=>{
 
  setEstimateBill({...estimateBill,bill:e.data.payload});
  
  }

  const createParcelPayload=(e)=>{
    console.log(e);
    Alert.alert("Success","Parcel Created Successfully",[
      {
        text:'Ok',
      onPress:()=>compParcel(),
      }
    ])
  }
  const estimateCheck=()=>{
     var check=true;
     if (!mass.mass) {
      check = false;
      setMass({ ...mass, massError: true });
    } else {
      if(numberCheck(mass.mass)){
        setMass({ ...mass, massError: false });
      }else{
        check=false;
        setMass({ ...mass, massError:true });
      }
    }

    if (!worth.worth) {
      check = false;
      setWorth({ ...worth, worthError: true });
    } else {
      if(numberCheck(worth.worth)){
        setWorth({ ...worth, worthError: false });
      }else{
        check=false;
        setWorth({ ...worth,worthError:true });
      }
    }

    if (!volume.volume) {
      check = false;
      setVolume({ ...volume, volumeError: true });
    } else {
      if(numberCheck(volume.volume)){
        setVolume({ ...volume, volumeError: false });
      }else{
        check=false;
        setVolume({ ...volume, volumeError:true });
      }
    }

    if (!appDetails.categoryId) {
      check = false;
    }
    if(!userLoc.lat&&!userLoc.lng&&!userLoc.address){
        check=false;
    }
    if(!senderLoc.lat&&!senderLoc.lng&&!senderLoc.address){
      check=false;
    }

   
     return check;
  }

  const getEstimateBilling=()=>{
    if(estimateCheck()){
     var billingObject={
       method:'post',
       url:`${api.localUrl}${api.estimatedBilling}`,
       data:{
        mass:Number.parseInt(mass.mass),
        volume:Number.parseInt(volume.volume),
        worth:Number.parseInt(worth.worth),
        category:appDetails.categoryId,
        locationFrom:{"coordinates":[userLoc.lat,userLoc.lng]},
        locationTo:{"coordinates":[senderLoc.lat,senderLoc.lng]},

       
      },
      headers:{
        Authorization:' Bearer ' + authUser.token,
      } 
     }
   //  console.log(billingObject);

     apiRequest(billingObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>billingPayload(e));
    

    }else{
      Alert.alert("Error","Empty fields detected for estimated billing");
    }
  }
  
  const registerParcel=()=>{
    if(inputCheck()){
       var createParcelObject={
         method:'POST',
         url:`${api.localUrl}${api.createParcel}`,
      headers:{
        Authorization:' Bearer ' + authUser.token,
        'Cache-Control': 'no-cache',
      } ,
         data:{
          category:appDetails.categoryId,
          packaging:appDetails.packageId,
          name:name.name,
          sender:user.id,
          recipient:appDetails.receiverObjectId,
          worth:worth.worth,
          description:desc.desc,
          locationTo:{"coordinates":[userLoc.lat,userLoc.lng],"address":userLoc.address},
          locationFrom:{"coordinates":[senderLoc.lat,senderLoc.lng],"address":senderLoc.address}, 
          stateFrom:stateFrom.stateFromId,
          stateTo:stateTo.stateToId,
          expectedDate:expectedDate.date,
          departureDate:depatureDate.date,
          costPayable:estimateBill.bill,
          paymentGateway:"PAYSTACK",
          mass:mass.mass,
          volume:volume.volume,
          identification:id.id,
          quantity:quantity.quantity,
         }
       }
       console.log(createParcelObject);
       apiRequest(createParcelObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>createParcelPayload(e));
    
    }else{
      Alert.alert("Error","Empty fields detected");
    }
  }
  const onChange = (even, selectedDate) => {
    //

    setDateShow(false);
    //console.log(selectedDate.toDateString());
    if (even.type == "set") {
      if (appDetails.stateOp == 1) {
        console.log("Expected Date");
        setAppDetails({ ...appDetails, stateOp: "" });
         setExpectedDate({
          ...expectedDate,
          date: selectedDate.toDateString(),
        });
      } else {
        console.log("Departure Date");
        setAppDetails({ ...appDetails, stateOp: "" });
        setDepatureDate({
          ...depatureDate,
          date: selectedDate.toDateString(),
        });
      }
    } else {
      //cancel Button
      return null;
    }
  };

  const selectDate = (op) => {
    // Select Date From and To
    if (op == 1) {
      // date from
      setDateShow(true);
      setAppDetails({ ...appDetails, stateOp: op });
    } else if (op == 2) {
      setDateShow(true);
      setAppDetails({ ...appDetails, stateOp: op });
      // date To
    }
  };
 
  useEffect(() => {
    if (!category) {
      getCategory();
    }
  }, [category]);

 
  const getCategory = () => {
    // state request object
    var stateObject = {
      method: "get",
      url: `${api.localUrl}${api.getCategory}`,
      headers: {
        Authorization: " Bearer " + authUser.token,
      },
    };
    console.log(stateObject);
    apiRequest(
      stateObject,
      (e) => setAppDetails({ ...appDetails, load: e }),
      (e) => succFunc(e),
      (e) => failFunc(e),
      (e) => getCategoryPayload(e)
    );
  };
  return (
    <View
      style={{
        backgroundColor: "#fff",
        height: Dimensions.get("screen").height/1.12,
        padding:10,
      }}
    >
      <StatusBar animated={true} backgroundColor={AppColor.third} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          padding: 15,
          borderBottomWidth: 1,
          borderBottomColor: `${AppColor.third}`,
        }}
      >
        <Icon name="box" size={15} color={AppColor.third} />
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 15,
            marginLeft: 5,
          }}
        >
          Create Parcel
        </Text>
      </View>
      <ScrollView style={{ marginTop: 10 }}
         refreshControl={
          <RefreshControl refreshing={appDetails.refresh}
          onRefresh={()=>onRefresh()}
          />}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={style.inputContainer}>
            <InputComp
              mode="outlined"
              right={null}
              label="Name:"
              placeholder="Enter Item Name"
              style={style.name}
              error={name.nameError}
              secureText={false}
              setText={(e) => {
                setName({ ...name, name: e });
              }}
            />
          </View>
          <View style={{ width: "50%", height: 70 }}>
            <InputComp
              mode="outlined"
              right={null}
              label="Description:"
              placeholder="Enter Item Description"
              style={style.name}
              error={desc.descError}
              secureText={false}
              setText={(e) => {
                setDesc({ ...desc, desc: e });
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 2,
            marginLeft: 2,
          }}
        >
          <View style={{ width: "49%", borderWidth: 1, borderRadius: 2 }}>
            <Picker
              selectedValue={stateFrom.stateFromId}
              onValueChange={(itemValue, itemIndex) =>
                setStateFrom({ ...stateFrom, stateFromId: itemValue })
              }
              style={{ borderWidth: 1, width: "100%" }}
            >
              <Picker.Item label="State From " value="" />
              {ngStates &&
                ngStates.map((e, i) => {
                  return <Picker.Item key={i} label={e.name} value={e.id} />;
                })}
            </Picker>
          </View>

          <View style={{ width: "49%", borderWidth: 1, borderRadius: 2 }}>
            <Picker
              selectedValue={stateTo.stateToId}
              onValueChange={(itemValue, itemIndex) =>
                setStateTo({ ...stateTo, stateToId: itemValue })
              }
              style={{ borderWidth: 1, width: "100%" }}
            >
              <Picker.Item label="State To" value="" />
              {ngStates &&
                ngStates.map((e, i) => {
                  return <Picker.Item key={i} label={e.name} value={e.id} />;
                })}
            </Picker>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 2,
            marginLeft: 2,
            marginTop: 10,
          }}
        >
          <View style={{ width: "49%", borderWidth: 1, borderRadius: 2 }}>
            <Picker
              selectedValue={appDetails.categoryId}
              onValueChange={(itemValue, itemIndex) =>
                //  setCategory({ ...category, stateId: itemValue })
                setAppDetails({ ...appDetails, categoryId: itemValue })
              }
              style={{ borderWidth: 1, width: "100%" }}
            >
              <Picker.Item label="Category " value="" />
              {category &&
                category.map((e, i) => {
                  return <Picker.Item key={i} label={e.name} value={e.id} />;
                })}
            </Picker>
          </View>

          <View style={{ width: "49%", borderWidth: 1, borderRadius: 2 }}>
            <Picker
              selectedValue={appDetails.packageId}
              onValueChange={(itemValue, itemIndex) =>
                setAppDetails({ ...appDetails, packageId: itemValue })
              }
              style={{ borderWidth: 1, width: "100%" }}
            >
              <Picker.Item label="Packaging" value="" />
              {packaging &&
                packaging.map((e, i) => {
                  return <Picker.Item key={i} label={e.name} value={e.name} />;
                })}
            </Picker>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "50%", height: 70 }}>
            <InputComp
              mode="outlined"
              right={null}
              label="Mass:"
              placeholder="KG"
              style={style.name}
              error={mass.massError}
              secureText={false}
              setText={(e) => {
                setMass({ ...mass, mass: e });
              }}
            />
          </View>
          <View style={{ width: "50%", height: 70 }}>
            <InputComp
              mode="outlined"
              right={null}
              label="Volume:"
              placeholder="Item Volume"
              style={style.name}
              error={volume.volumeError}
              secureText={false}
              setText={(e) => {
                setVolume({ ...volume, volume: e });
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "100%", height: 70 }}>
            <InputComp
              mode="outlined"
              right={null}
              label="Worth:"
              placeholder="#"
              style={style.name}
              error={worth.worthError}
              secureText={false}
              setText={(e) => {
                setWorth({ ...worth, worth: e });
              }}
            />
          </View>
       </View>
       <View style={{ flexDirection: "row",justifyContent:'space-between' }}>
          {appDetails.userValid&&<View style={{ width: "10%", justifyContent: "center" }}>
            { IconComp(
             appDetails.userValid,
              { textAlign: "center" },
              15,
              AppColor.third
            )}
          </View>}<InputComp
            label="Receipent Phone "
            mode="outlined"
            style={{ width: "80%",backgroundColor:'#fff'}}
            setText={(e)=>setRecipientPhoneEmail({...recpientPhoneEmail,emailPhone:e})}
            error={recpientPhoneEmail.emailPhoneError}
          />
          <TouchableOpacity onPress={()=>isUserValid()} style={{ justifyContent: "center", width: "10%" }}>
            {IconComp("sync-alt", { textAlign: "center" }, 15, AppColor.third)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row",justifyContent:'space-between' }}>
          {appDetails.userValid&&<View style={{ width: "10%", justifyContent: "center" }}>
         
          </View>}<InputComp
            label="Estimated Billing "
            mode="outlined"
            editable={false}
            value={estimateBill.bill?estimateBill.bill.toString():''}
            style={{ width: "80%" ,backgroundColor:'#fff'}}
            error={estimateBill.error}
          />
          <TouchableOpacity onPress={()=>getEstimateBilling()} style={{ justifyContent: "center", width: "10%" }}>
            {IconComp("sync-alt", { textAlign: "center" }, 15, AppColor.third)}
          </TouchableOpacity>
        </View>
          
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "50%", height: 70 }}>
            <InputComp
              mode="outlined"
              right={null}
              label="Quantity:"
              placeholder="Enter Quantity:"
              style={style.name}
              error={quantity.quantityError}
              secureText={false}
              setText={(e) => {
                setQuantity({ ...quantity, quantity: e });
              }}
            />
          </View>
          <View style={{ width: "50%", height: 70 }}>
            <InputComp
              mode="outlined"
              right={null}
              label="Identification:"
              placeholder="Identification Means"
              style={style.name}
              error={id.idError}
              secureText={false}
              setText={(e) => {
                setId({ ...id, id: e });
              }}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => selectDate(1)}
            style={style.inputContainer}
          >
            <InputComp
              mode="outlined"
              right={null}
              label="Expected Date:"
              placeholder="Enter Date"
              value={expectedDate.date? expectedDate.date : ""}
              style={style.name}
              error={expectedDate.dateError}
              secureText={false}
              editable={false}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => selectDate(2)}
            style={{ width: "50%", height: 70 }}
          >
            <InputComp
              mode="outlined"
              right={null}
              label="Depature Date:"
              placeholder="Enter Item Description"
              style={style.name}
              error={depatureDate.dateError}
              value={depatureDate.date ? depatureDate.date : ""}
              secureText={false}
              editable={false}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "column" }}>
          <View style={{ height: 70 }}>
            <InputComp
              mode="outlined"
              right={null}
              label="Location From :"
              placeholder="Enter Location From "
              style={style.name}
              secureText={false}
              value={userLoc.address ? userLoc.address : ""}
              editable={false}
            />
          </View>
          <View style={{ height: 70 }}>
            <InputComp
              mode="outlined"
              right={null}
              label="Location To:"
              placeholder="Enter Location To"
              style={style.name}
              value={senderLoc.address ? senderLoc.address : ""}
              secureText={false}
              editable={false}
            />
          </View>
        </View>
        <TouchableOpacity>
          {IconComp("images", { marginLeft: 10 }, 25, AppColor.third)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => registerParcel()} style={style.createBtn}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            CREATE PARCEL
          </Text>
        </TouchableOpacity>

        {dateshow && (
          <DateTimePicker
            testID="dateTimePicker"
            value={appDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
            onTouchCancel={() => console.log("error")}
          />
        )}
      </ScrollView>
       {appDetails.load&&<LoaderComp size={25} color={AppColor.third}/>}
    </View>
  );
}

const style = StyleSheet.create({
  name: {
    height: 55,
    margin: 2,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },

  inputContainer: {
    width: "50%",
    height: 80,
  },

  createBtn: {
    margin: 10,
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    backgroundColor: `${AppColor.third}`,
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

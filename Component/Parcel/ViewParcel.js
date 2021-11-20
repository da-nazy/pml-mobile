import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AppColor } from "../WorkerComp/AppColor";
import InputComp from "../WorkerComp/InputComp";
import { packaging, IconComp } from "../WorkerComp/ExternalFunction";
import { api, apiRequest, ngStates, symbols } from "../WorkerComp/Api";
import { Picker } from "@react-native-community/picker";
import LoaderComp from "../WorkerComp/LoaderComp";
import { UserContext } from "../DataProvider/UserContext";
import { TextInput } from 'react-native-paper';
export default function ViewParcel({ parcel, onParcelChange }) {
  const usercontext = useContext(UserContext);
  const { authUser, user, userWallet } = usercontext;
  console.log(parcel);
  // should only update pickup not added to a parcel

  const viewComp = (name, description) => {
    return (
      <View style={{ margin: 5 }}>
        <Text style={style.nameText}>{name}</Text>
        <View style={style.descText}>
          <Text>{description}</Text>
        </View>
      </View>
    );
  };

  const [costPayable, setCostPayable] = useState({
    cost: "",
    costError: false,
  });
  const [ngState, setNgState] = useState(null);

  const [parcelState, setParcelState] = useState({
    stateFrom: parcel.stateFrom.name ? parcel.stateFrom.name : null,
    stateTo: parcel.stateTo.name ? parcel.stateTo.name : null,
  });

  const [stateFrom, setStateFrom] = useState(null);
  const [stateTo, setStateTo] = useState(null);

  const [walletPin, setWalletPin] = useState({
    pin: "",
    pinSecure: true,
    pinError: false,
  });

  const [appDetails, setAppDetails] = useState({
    edit: false,
    userValid: "",
    locToValid: "",
    locFromValid: "",
    load: false,
  });

  const [name, setName] = useState({
    name: "",
    nameError: false,
  });

  const [desc, setDesc] = useState({
    desc: "",
    descError: false,
  });

  const [locationTo, setLocationTo] = useState({
    address: "",
    coordinates: [{}],
  });
  const [locationFrom, setLocationFrom] = useState({
    address: "",
    coordinates: [{}],
  });
  const [quantity, setQuantity] = useState({
    quantity: "",
    quantityError: false,
  });

  const [receipientPhone, setReceipientPhone] = useState({
    phone: "",
    phoneError: false,
  });

  const [worth, setWorth] = useState({
    worth: "",
    worthError: false,
  });

  const [mass, setMass] = useState({
    mass: "",
    massError: false,
  });
  const [volume, setVolume] = useState({
    volume: "",
    volumeError: false,
  });
  const [category, setCategory] = useState({
    catId: "",
    category: [],
  });
  const [packageId, setPackageId] = useState({
    packageId: parcel.packaging ? parcel.packaging : "",
  });
   
  const payParcel=()=>{
    // Check the wallet
     if(!walletPin.pin){
        setWalletPin({...walletPin,pinError:true});
     }else{
       setWalletPin({...walletPin,pinError:false},makePayment());
       // should pay for parcel right now.
     }
  }



  const isUserValid = () => {};


  const succFunc = (e) => {
    if (e) {
      console.log(e);
    }
    // Alert.alert("Success",e.data.message);
  };

  const failFunc = (e) => {
    if(e.includes('dup')){
      // Alert.alert("Error","The payment is a duplicate");
       console.log(e);
       confirmPayment();
  }else{
    //console.log(e);
    Alert.alert("Error",e);
  }
  };

  const editUser = () => {
    console.log(appDetails.edit);
    if (appDetails.edit) {
      // run the  edit
      // after which set edit false
      console.log(appDetails.edit);
    } else {
      // set edit true
      setAppDetails({ ...appDetails, edit: true });
      console.log(appDetails.edit);
    }
  };

  const getGeocode = (e) => {
    console.log(e);
  };

  const getCost = (e) => {};
  const confirmPaymentPayload=(e)=>{
    console.log(e);
    if(e.data.success){
      Alert.alert("Success","Payment Verified");
      onParcelChange();

    }
  }

  const removeParcel = (id) => {
    var deleteParcelObject = {
      method: "PATCH",
      url: `${api.localUrl}${api.deleteParcel}${id ? id : parcel.id}`,
      headers: {
        Authorization: " Bearer " + authUser.token,
      },
    };
    console.log(deleteParcelObject);
    apiRequest(
      deleteParcelObject,
      (e) => setAppDetails({ ...appDetails, load: e }),
      (e) => succFunc(e),
      (e) => failFunc(e),
      (e) => deleteParcelPayload(e)
    );
  };

  const deleteParcelPayload = (e) => {
    console.log(e.data.success);
    // Alert.alert("Success",e.data.message);
    if (e.data.success) {
      Alert.alert("Success", ` Parcel has been removed ${e.data.message}`, [
        {
          text: "Okay",
          onPress: () => {
            onParcelChange();
          },
        },
      ]);
    }
  };
     const makePaymentPayload=(e)=>{
      if(e.data.payload.status==='SUCCESS'){
        Alert.alert("Message","Transaction Successfull",[{
          text:'Ok',
          onPress:()=>confirmPayment()
        }])
       }
     }
      const makePayment=()=>{
        var paymentObject={
          method:'post',
          url:`${api.localUrl}${api.makePayment}`,
          headers:{
           Authorization:' Bearer ' + authUser.token,
           'Cache-Control': 'no-cache',
         },
         data:{
          trxref:parcel.trxref?parcel.trxref:'',
          walletFrom:userWallet&&userWallet.wallet?userWallet.wallet:'',
          walletTo:api.pmlWallet,
          narration:"Customer Parcel",
          pin:walletPin.pin,
          type:"L",
          amount:parcel.costPayable?parcel.costPayable:'',
          
           }
         
        }
        console.log(paymentObject);
        apiRequest(paymentObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>makePaymentPayload(e));
      }

      const confirmPayment=()=>{
      //  setAppDetails({...appDetails,confirm:false})
        var confirmPaymentObject={
          method:'get',
          url:`${api.localUrl}${api.verifyPayment}/${parcel.code?parcel.code:""}`,
          headers:{
           Authorization:' Bearer ' + authUser.token,
           'Cache-Control': 'no-cache',
         }
        }
        console.log(confirmPaymentObject);
        apiRequest(confirmPaymentObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>confirmPaymentPayload(e));
      }

  const deleteParcel = () => {
    console.log(parcel.id);
    Alert.alert(
      "Caution",
      `Are you sure you want to delete the parcel with code ${parcel.code}?`,
      [
        {
          text: "Cancle",
          onPress: () => console.log("cancle"),
          style: style.cancel,
        },
        {
          text: "Okay",
          onPress: () => removeParcel(),
          style: style.okay,
        },
      ]
    );
  };
  return (
    <View>
      <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 18 }}>
        {" "}
        View Parcel
      </Text>
      <ScrollView style={{ height: 500, margin: 10 }}>
        {parcel && (
          <View>
            <View
              style={{
                width: "25%",
                marginBottom: 20,
                height: 50,
                width: 50,
                marginTop: 25,
              }}
            >
              {parcel.imgUrl ? (
                <Image
                  style={{ width: 70, height: 70, borderWidth: 1 }}
                  source={{
                    uri: parcel.imgUrl,
                  }}
                />
              ) : (
                <View style={{ flexDirection: "row" }}>
                  {IconComp(
                    "box",
                    { width: 70, height: 70, textAlign: "center" },
                    50,
                    AppColor.third
                  )}

                  {appDetails.edit && (
                    <TouchableOpacity
                      style={{
                        borderRadius: 8,
                        backgroundColor: "#fff",
                        left: -30,
                        top: 8,
                        borderWidth: 1,
                        borderColor: `${AppColor.third}`,
                        alignSelf: "center",
                      }}
                    >
                      {IconComp(
                        "pen",
                        {
                          width: 20,
                          height: 20,
                          textAlign: "center",
                          padding: 3,
                        },
                        10,
                        AppColor.third
                      )}
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>

            <View style={{ marginTop: 5 }}>
              <InputComp
                inputType="name"
                value={parcel.name}
                mode="outlined"
                right={null}
                label="Product Name:"
                placeholder="Input value"
                style={style.name}
                error={name.nameError}
                secureText={false}
                disabled={!appDetails.edit}
                setText={(e) => {
                  setName({ ...name, name: e });
                }}
              />
            </View>

            <View style={{ marginTop: 5 }}>
              <InputComp
                inputType="Code:"
                value={parcel.code}
                mode="outlined"
                right={null}
                label="Product Code:"
                placeholder="Input value"
                style={style.name}
                error={name.nameError}
                secureText={false}
                disabled={true}
                setText={(e) => {
                  setName({ ...name, name: e });
                }}
              />
            </View>

            <View style={{ marginTop: 5, flexDirection: "row" }}>
              <View style={{ width: `${appDetails.edit ? "80%" : "100%"}` }}>
                <InputComp
                  inputType="CostPayable:"
                  value={parcel.costPayable.toString()}
                  mode="outlined"
                  right={null}
                  label="Product CostPayable:"
                  placeholder="Input value"
                  style={style.name}
                  error={name.nameError}
                  secureText={false}
                  disabled={true}
                  setText={(e) => {
                    setName({ ...name, name: e });
                  }}
                />
              </View>
              {appDetails.edit && (
                <TouchableOpacity
                  onPress={() => getCost()}
                  style={{ justifyContent: "center", width: "10%" }}
                >
                  {IconComp(
                    "sync-alt",
                    { textAlign: "center" },
                    15,
                    AppColor.third
                  )}
                </TouchableOpacity>
              )}
            </View>

            <View style={{ marginTop: 5 }}>
              <InputComp
                inputType="Description:"
                value={parcel.description}
                mode="outlined"
                right={null}
                label="Product Description:"
                placeholder="Input value"
                style={style.name}
                error={name.nameError}
                secureText={false}
                disabled={!appDetails.edit}
                setText={(e) => {
                  setName({ ...name, name: e });
                }}
              />
            </View>

            <View style={{ marginTop: 5 }}>
              <InputComp
                inputType="Identification:"
                value={parcel.identification}
                mode="outlined"
                right={null}
                label="Product Identification:"
                placeholder="Input value"
                style={style.name}
                error={name.nameError}
                secureText={false}
                disabled={!appDetails.edit}
                setText={(e) => {
                  setName({ ...name, name: e });
                }}
              />
            </View>

            <View style={{ marginTop: 5, flexDirection: "row" }}>
              {appDetails.locToValid ? (
                <View style={{ width: "10%", justifyContent: "center" }}>
                  {IconComp(
                    appDetails.locToValid,
                    { textAlign: "center" },
                    15,
                    AppColor.third
                  )}
                </View>
              ) : null}
              <View style={{ width: appDetails.edit ? "80%" : "100%" }}>
                <InputComp
                  inputType="LocationTo:"
                  value={parcel.locationTo.address}
                  mode="outlined"
                  right={null}
                  label="Product LocationTo:"
                  placeholder="Input value"
                  style={style.name}
                  error={name.nameError}
                  secureText={false}
                  disabled={!appDetails.edit}
                  setText={(e) => {
                    setName({ ...name, name: e });
                  }}
                />
              </View>
              {appDetails.edit && (
                <TouchableOpacity
                  onPress={() => getGeocode()}
                  style={{ justifyContent: "center", width: "10%" }}
                >
                  {IconComp(
                    "sync-alt",
                    { textAlign: "center" },
                    15,
                    AppColor.third
                  )}
                </TouchableOpacity>
              )}
            </View>
            <View style={{ marginTop: 5, flexDirection: "row" }}>
              {appDetails.locFromValid ? (
                <View style={{ width: "10%", justifyContent: "center" }}>
                  {IconComp(
                    appDetails.locFromValid,
                    { textAlign: "center" },
                    15,
                    AppColor.third
                  )}
                </View>
              ) : null}
              <View style={{ width: appDetails.edit ? "80%" : "100%" }}>
                <InputComp
                  inputType="LocationFrom:"
                  value={parcel.locationFrom.address}
                  mode="outlined"
                  right={null}
                  label="Product LocationFrom:"
                  placeholder="Input value"
                  style={style.name}
                  error={name.nameError}
                  secureText={false}
                  disabled={!appDetails.edit}
                  setText={(e) => {
                    setName({ ...name, name: e });
                  }}
                />
              </View>
              {appDetails.edit && (
                <TouchableOpacity
                  onPress={() => getGeocode()}
                  style={{ justifyContent: "center", width: "10%" }}
                >
                  {IconComp(
                    "sync-alt",
                    { textAlign: "center" },
                    15,
                    AppColor.third
                  )}
                </TouchableOpacity>
              )}
            </View>
            <View style={{ marginTop: 5 }}>
              <InputComp
                inputType="Quantity:"
                value={parcel.quantity.toString()}
                mode="outlined"
                right={null}
                label="Product Quantity:"
                placeholder="Input value"
                style={style.name}
                error={name.nameError}
                secureText={false}
                disabled={!appDetails.edit}
                setText={(e) => {
                  setName({ ...name, name: e });
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              {appDetails.userValid ? (
                <View style={{ width: "10%", justifyContent: "center" }}>
                  {IconComp(
                    appDetails.userValid,
                    { textAlign: "center" },
                    15,
                    AppColor.third
                  )}
                </View>
              ) : null}
              <View style={{ width: appDetails.edit ? "80%" : "100%" }}>
                <InputComp
                  inputType="Phone:"
                  value={parcel.recipientPhone}
                  mode="outlined"
                  right={null}
                  label="Receipient Phone:"
                  placeholder="Input value"
                  style={style.name}
                  error={name.nameError}
                  secureText={false}
                  disabled={!appDetails.edit}
                  setText={(e) => {
                    setName({ ...name, name: e });
                  }}
                />
              </View>
              {appDetails.edit && (
                <TouchableOpacity
                  onPress={() => isUserValid()}
                  style={{ justifyContent: "center", width: "10%" }}
                >
                  {IconComp(
                    "sync-alt",
                    { textAlign: "center" },
                    15,
                    AppColor.third
                  )}
                </TouchableOpacity>
              )}
            </View>

            <View style={{ marginTop: 5 }}>
              <InputComp
                inputType="Routing:"
                value={parcel.routing}
                mode="outlined"
                right={null}
                label="Product Routing:"
                placeholder="Input value"
                style={style.name}
                error={name.nameError}
                secureText={false}
                disabled={true}
                setText={(e) => {
                  setName({ ...name, name: e });
                }}
              />
            </View>
            <View style={{ marginTop: 5 }}>
              <InputComp
                inputType="Worth:"
                value={parcel.worth.toString()}
                mode="outlined"
                right={null}
                label="Product Worth:"
                placeholder="Input value"
                style={style.name}
                error={name.nameError}
                secureText={false}
                disabled={!appDetails.edit}
                setText={(e) => {
                  setName({ ...name, name: e });
                }}
              />
            </View>
            <View style={{ marginTop: 5 }}>
              <InputComp
                inputType="Volume:"
                value={parcel.volume.toString()}
                mode="outlined"
                right={null}
                label="Product Volume:"
                placeholder="Input value"
                style={style.name}
                error={name.nameError}
                secureText={false}
                disabled={!appDetails.edit}
                setText={(e) => {
                  setName({ ...name, name: e });
                }}
              />
            </View>
            <View style={{ marginTop: 5 }}>
              <InputComp
                inputType="Mass:"
                value={`${parcel.mass}kg`}
                mode="outlined"
                right={null}
                label="Product Mass:"
                placeholder="Input value"
                style={style.name}
                error={name.nameError}
                secureText={false}
                disabled={!appDetails.edit}
                setText={(e) => {
                  setName({ ...name, name: e });
                }}
              />
            </View>
            <View style={{ marginTop: 5, marginBottom: 10 }}>
              <InputComp
                inputType="Date:"
                value={parcel.updatedAt.split("T")[0]}
                mode="outlined"
                right={null}
                label="Product Date:"
                placeholder="Input value"
                style={style.name}
                error={name.nameError}
                secureText={false}
                disabled={true}
                setText={(e) => {
                  setName({ ...name, name: e });
                }}
              />
            </View>

            <View
              style={{
                marginTop: 10,
                borderWidth: 1,
                borderRadius: 2,
                borderColor: `${appDetails.edit ? "#000" : "#bbb"}`,
                marginBottom: 10,
              }}
            >
              <Picker
                enabled={appDetails.edit}
                selectedValue={packageId.packageId}
                onValueChange={(itemValue, itemIndex) =>
                  setPackageId({ ...packageId, packageId: itemValue })
                }
                style={{ borderWidth: 1, width: "100%", color: "#bbb" }}
              >
                <Picker.Item label="Packaging" value="" />
                {packaging &&
                  packaging.map((e, i) => {
                    return (
                      <Picker.Item key={i} label={e.name} value={e.name} />
                    );
                  })}
              </Picker>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 2,
                  borderColor: `${appDetails.edit ? "#000" : "#bbb"}`,
                  marginTop: 10,
                  width: appDetails.edit ? "90%" : "100%",
                }}
              >
                <Picker
                  enabled={appDetails.edit}
                  selectedValue={category.catId}
                  onValueChange={(itemValue, itemIndex) =>
                    //  setCategory({ ...category, stateId: itemValue })
                    setCategory({ ...category, catId: itemValue })
                  }
                  style={{
                    borderWidth: 1,
                    width: "100%",
                    color: `${appDetails.edit ? "#000" : "#bbb"}`,
                  }}
                >
                  <Picker.Item label="Category " value="" />
                  {category.category &&
                    category.category.map((e, i) => {
                      return (
                        <Picker.Item key={i} label={e.name} value={e.id} />
                      );
                    })}
                </Picker>
              </View>
              {appDetails.edit && (
                <TouchableOpacity
                  onPress={() => isUserValid()}
                  style={{ justifyContent: "center", width: "10%" }}
                >
                  {IconComp(
                    "sync-alt",
                    { textAlign: "center" },
                    15,
                    AppColor.third
                  )}
                </TouchableOpacity>
              )}
            </View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 2,
                  borderColor: `${appDetails.edit ? "#000" : "#bbb"}`,
                  marginTop: 10,
                  width: "100%",
                }}
              >
                <Picker
                  enabled={appDetails.edit}
                  selectedValue={parcelState.stateFrom}
                  onValueChange={(itemValue, itemIndex) =>
                    //  setCategory({ ...category, stateId: itemValue })
                    setStateFrom(itemValue)
                  }
                  style={{
                    borderWidth: 1,
                    width: "100%",
                    color: `${appDetails.edit ? "#000" : "#bbb"}`,
                  }}
                >
                  <Picker.Item
                    label={
                      appDetails.edit ? "StateFrom" : parcel.stateFrom.name
                    }
                    value=""
                  />
                  {ngStates &&
                    ngStates.map((e, i) => {
                      return (
                        <Picker.Item key={i} label={e.name} value={e.id} />
                      );
                    })}
                </Picker>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 2,
                  borderColor: `${appDetails.edit ? "#000" : "#bbb"}`,
                  marginTop: 10,
                  width: "100%",
                }}
              >
                <Picker
                  enabled={appDetails.edit}
                  selectedValue={category.catId}
                  onValueChange={(itemValue, itemIndex) =>
                    //  setCategory({ ...category, stateId: itemValue })
                    setStateTo(itemValue)
                  }
                  style={{
                    borderWidth: 1,
                    width: "100%",
                    color: `${appDetails.edit ? "#000" : "#bbb"}`,
                  }}
                >
                  <Picker.Item
                    label={appDetails.edit ? "StateTo" : parcel.stateTo.name}
                    value=""
                  />
                  {ngStates &&
                    ngStates.map((e, i) => {
                      return (
                        <Picker.Item key={i} label={e.name} value={e.id} />
                      );
                    })}
                </Picker>
              </View>
            </View>
            <View style={{ marginTop: 10, paddingLeft: 5 }}>
              <Text
                style={{
                  borderBottomWidth: 1,
                  borderColor: AppColor.third,
                  color: "#bbb",
                  paddingBottom: 5,
                }}
              >
                Items In Parcel
              </Text>
              {parcel.items &&
                parcel.items.map((e, i) => {
                  console.log(e);
                  return (
                    <View
                      key={i}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 5,
                      }}
                    >
                      <Text style={{ width: "28%", color: "#bbb" }}>
                        {e.name}
                      </Text>
                      <Text style={{ width: "10%", color: "#bbb" }}>
                        {e.mass}kg
                      </Text>
                      <Text style={{ width: "23%", color: "#bbb" }}>
                        {symbols.naira}
                        {e.worth}
                      </Text>
                      <Text style={{ width: "20%", color: "#bbb" }}>
                        {e.quantity}piece(s)
                      </Text>
                    </View>
                  );
                })}
            </View>

            <View>
              <View style={{ marginTop: 5 }}>
                <InputComp
                  mode="outlined"
                  right={null}
                  label="Wallet Pin:"
                  placeholder="Input value"
                  style={style.name}
                  secureText={walletPin.pinSecure}
                  setText={(e) => setWalletPin({ ...walletPin, pin: e })}
                  error={walletPin.pinError}
                  right={
                    <TextInput.Icon
                      name="eye"
                      onPress={() =>
                        setWalletPin({
                          ...walletPin,
                          pinSecure: !walletPin.pinSecure,
                        })
                      }
                    />
                  }
                />
              </View>
            </View>
            {/** Edit Delete */}
            <View
              style={{
                flexDirection: "row",
                margin: 15,
                justifyContent: "space-evenly",
                marginBottom: 25,
              }}
            >
              {appDetails.edit && (
                <TouchableOpacity
                  onPress={() => editUser()}
                  style={style.actionBtn}
                >
                  <Text style={style.actionBtnText}>Edit</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => deleteParcel()}
                style={style.actionBtn}
              >
                <Text style={style.actionBtnText}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>payParcel()}  style={style.actionBtn}>
                <Text style={style.actionBtnText}>Pay</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
      {appDetails.load && <LoaderComp size={30} color={AppColor.third} />}
    </View>
  );
}

const style = StyleSheet.create({
  nameText: {
    color: `${AppColor.third}`,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  descText: {
    paddingLeft: 5,
    height: 35,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingTop: 2,
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
  },
  actionBtn: {
    width: 120,
    height: 40,
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: `${AppColor.third}`,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  name: {
    height: 50,
    marginTop: 15,
    width: "100%",
  },
  actionBtnText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
  cancel: {
    backgroundColor: "#000",
  },
  okay: {
    backgroundColor: "#000",
  },
});

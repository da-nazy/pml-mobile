import React, { useState,useRef} from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AppColor } from "../WorkerComp/AppColor";
import Icon from "react-native-vector-icons/FontAwesome5";
import InputComp from "../WorkerComp/InputComp";
import { Picker } from "@react-native-community/picker";
import { IconComp,packaging} from "../WorkerComp/ExternalFunction";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateParcel() {
  
  const [ngState, setNgState] = useState(null);
  const[dateshow,setDateShow]=useState(false);
  const[appDate,setAppDate]=useState(new Date(1598051730000));
  const [appDetails, setAppDetails] = useState({
    load: false,
    categoryId:null,
    packageId:null,
    stateOp:'',
  });
  const [category,setCategory]=useState(null);

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
  const [mass,setMass]=useState({
    mass:'',
    massError:false,
  })
  const[volume,setVolume]=useState({
    volume:'',
    volumeError:false,
  })
  const[quantity,setQuantity]=useState({
    quantity:'',
    quantityError:false,
  })
  const[id,setId]=useState({
    id:'',
    idError:false,
  });
  const[expectedDate,setExpectedDate]=useState({
    date:'',
    dateError:false,
  })
  const[depatureDate,setDepatureDate]=useState({
    date:'',
    dateError:false,
  })

  const succFunc = (e) => {
    console.log(e);
  };
  const failFunc = (e) => {
    Alert.Alert("Error", e);
  };
  const getStatePayload = (e) => {
    console.log(e);
  };
    

 
  const inputCheck=()=>{
       var check=true;
    if(!name.name){
      check=false;
      setName({...name,nameError:true});
    }else{
      
      setName({...name,nameError:false});
    }
    if(!desc.desc){
      check=false;
      setDesc({...desc,descError:true});
    }else{
      setDesc({...desc,descError:false});
    }
     
    if(!stateFrom.stateFromId){
      check=false;
    }
    if(!stateTo.stateToId){
      check=false;
    }
    if(!appDetails.categoryId){
      check=false;
    }
    if(!appDetails.packageId){
      check=false;
    }

     }

     const onChange=(even,selectedDate)=>{
     //  
       setDateShow(false);
       console.log(selectedDate.toDateString());
       if(appDetails.stateOp==1){
          console.log("Expected Date");
          setAppDetails({...appDetails,stateOp:''});
           setExpectedDate({...expectedDate,stateId:selectedDate.toDateString()})
       }else{

         console.log("Departure Date");
         setAppDetails({...appDetails,stateOp:''});
         setDepatureDate({...depatureDate,stateId:selectedDate.toDateString()})
     
       }
     }


     const selectDate=(op)=>{
       // Select Date From and To
       if(op==1){
     // date from 
      setDateShow(true);
      setAppDetails({...appDetails,stateOp:op});

       }else if(op==2){

        setDateShow(true);
        setAppDetails({...appDetails,stateOp:op});
         // date To
     
       }
     }

  const getState = () => {
    // state request object
    var stateObject = {
      method: "get",
      url: `${api.localUrl}${api.getState}`,
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
      (e) => getStatePayload(e)
    );
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        height: Dimensions.get("screen").height,
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
      <ScrollView>
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
            {name.nameError ? (
              <Text style={{ marginLeft: 25, color: "red" }}>
                Invalid input.
              </Text>
            ) : null}
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
            {desc.descError ? (
              <Text style={{ marginLeft: 25, color: "red" }}>
                Invalid input.
              </Text>
            ) : null}
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
              selectedValue={stateFrom.stateId}
              onValueChange={(itemValue, itemIndex) =>
                setStateFrom({ ...stateFrom, stateId: itemValue })
              }
              style={{ borderWidth: 1, width: "100%" }}
            >
              <Picker.Item label="State From " value="" />
              {ngState &&
                ngState.map((e, i) => {
                  return <Picker.Item key={i} label={e.name} value={e.id} />;
                })}
            </Picker>
          </View>

          <View style={{ width: "49%", borderWidth: 1, borderRadius: 2 }}>
            <Picker
              selectedValue={stateTo.stateId}
              onValueChange={(itemValue, itemIndex) =>
                setStateTo({ ...stateTo, stateId: itemValue })
              }
              style={{ borderWidth: 1, width: "100%" }}
            >
              <Picker.Item label="State To" value="" />
              {ngState &&
                ngState.map((e, i) => {
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
              selectedValue={stateFrom.stateId}
              onValueChange={(itemValue, itemIndex) =>
              //  setCategory({ ...category, stateId: itemValue })
              setAppDetails({...appDetails,categoryId:itemValue})
              }
              style={{ borderWidth: 1, width: "100%" }}
            >
              <Picker.Item label="Category " value="" />
              {ngState &&
                ngState.map((e, i) => {
                  return <Picker.Item key={i} label={e.name} value={e.id} />;
                })}
            </Picker>
          </View>

          <View style={{ width: "49%", borderWidth: 1, borderRadius: 2 }}>
            <Picker
              selectedValue={stateTo.stateId}
              onValueChange={(itemValue, itemIndex) =>
                setAppDetails({ ...appDetails, packageId: itemValue })
              }
              style={{ borderWidth: 1, width: "100%" }}
            >
              <Picker.Item label="Packaging" value="" />
              { packaging&&
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
              error={name.nameError}
              secureText={false}
              setText={(e) => {
                setName({ ...name, name: e });
              }}
            />
            {name.nameError ? (
              <Text style={{ marginLeft: 25, color: "red" }}>
                Invalid input.
              </Text>
            ) : null}
          </View>
          <View style={{ width: "50%", height: 70 }}>
            <InputComp
              mode="outlined"
              right={null}
              label="Volume:"
              placeholder="Item Volume"
              style={style.name}
              error={name.nameError}
              secureText={false}
              setText={(e) => {
                setName({ ...name, name: e });
              }}
            />
            {name.nameError ? (
              <Text style={{ marginLeft: 25, color: "red" }}>
                Invalid input.
              </Text>
            ) : null}
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "50%", height: 70 }}>
            <InputComp
              mode="outlined"
              right={null}
              label="Quantity:"
              placeholder="Enter Quantity:"
              style={style.name}
              error={name.nameError}
              secureText={false}
              setText={(e) => {
                setName({ ...name, name: e });
              }}
            />
            {name.nameError ? (
              <Text style={{ marginLeft: 25, color: "red" }}>
                Invalid input.
              </Text>
            ) : null}
          </View>
          <View style={{ width: "50%", height: 70 }}>
            <InputComp
              mode="outlined"
              right={null}
              label="Identification:"
              placeholder="Identification Means"
              style={style.name}
              error={name.nameError}
              secureText={false}
              setText={(e) => {
                setName({ ...name, name: e });
              }}
            />
            {name.nameError ? (
              <Text style={{ marginLeft: 25, color: "red" }}>
                Invalid input.
              </Text>
            ) : null}
          </View>
        </View>
        
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity  onPress={()=>selectDate(1)} style={style.inputContainer}>
            <InputComp
              mode="outlined"
              right={null}
              label="Expected Date:"
              placeholder="Enter Date"
              value={expectedDate.stateId?expectedDate.stateId:''}
              style={style.name}
              error={name.nameError}
              secureText={false}
              setText={(e) => {
                setName({ ...name, name: e });
              }}
              editable={false}
            />
         </TouchableOpacity>

          <TouchableOpacity onPress={()=>selectDate(2)} style={{ width: "50%", height: 70 }}>
            <InputComp
              mode="outlined"
              right={null}
              label="Depature Date:"
              placeholder="Enter Item Description"
              style={style.name}
              error={name.nameError}
              value={depatureDate.stateId?depatureDate.stateId:''}
              secureText={false}
              setText={(e) => {
                setName({ ...name, name: e });
              }}
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
              error={name.nameError}
              secureText={false}
              setText={(e) => {
                setName({ ...name, name: e });
              }}
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
              error={name.nameError}
              secureText={false}
              editable={false}
              setText={(e) => {
                setName({ ...name, name: e });
              }}
            />
           
          </View>
        </View>
        <TouchableOpacity>
          {IconComp("images", { marginLeft: 10 }, 25, AppColor.third)}
        </TouchableOpacity>
        <TouchableOpacity
          style={style.createBtn}
        >
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

      
         {dateshow&&(
            <DateTimePicker
            testID="dateTimePicker"
            value={appDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
             />
         )}
       

      </ScrollView>
     
    </View>
  );
}

const style = StyleSheet.create({
  name: {
    height: 50,
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
    height: 70,
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

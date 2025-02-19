import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import LoaderComp from "../WorkerComp/LoaderComp";
import { AppColor } from "../WorkerComp/AppColor";
import InputComp from "../WorkerComp/InputComp";
import { TextInput } from "react-native-paper";
import { apiRequest } from "../WorkerComp/Api";
import { phoneCheck, emailCheck } from "../WorkerComp/AppColor";
import { Picker } from "@react-native-picker/picker";
import { api } from "../WorkerComp/Api";
export default function UserRegister({navigation,onCreate}) {
  const {navigate}=navigation;
  const [genderSelected, setGenderSelected] = useState({
    gender: null,
    genderError: false,
  });

  const [gender, setGender] = useState([
    {
      label: "Male",
      value: "M",
    },
    {
      label: "Female",
      value: "F",
    },
    {
      label: "Other",
      value: "O",
    },
  ]);
  const [appOperation, setAppOperation] = useState({
    load: false,
  });

  const [name, setName] = useState({
    nameError: false,
    name: "",
  });

  const [lastName, setLastName] = useState({
    lastNameError: false,
    lastName: "",
  });

  const [email, setEmail] = useState({
    email: "",
    emailError: false,
  });
  const [phone, setPhone] = useState({
    phone: "",
    phoneError: false,
  });

  const [password, setPassword] = useState({
    password: "",
    passwordError: false,
    secure: true,
  });

  const [repassword, setRepassword] = useState({
    repassword: "",
    repasswordError: false,
    secure: true,
  });

  const requestSuc = (e) => {
    Alert.alert("Success", e,[{
      text:"OK",
      onPress:()=>{onCreate?onCreate():navigate('Login')}
    }]);
  };
  const requestFail = (e) => {
    Alert.alert("Error", e);
  };
  const requestPayload = (e) => {
  
  };
  const makeRequest = () => {
    if (inputCheck()) {
      var regObject = {
        method: "post",
        url: `${api.localUrl}${api.register}`,
        data: {
          surname:name.name,
          otherName:lastName.lastName,
          gender:genderSelected.gender,
          phone: phone.phone,
          password:password.password,
        },
      };
      if(email.email){
        regObject.data['email']=email.email;
      }

      apiRequest(regObject,(e)=>setAppOperation({...appOperation,load:e}),(e)=>requestSuc(e),(e)=>requestFail(e),(e)=>requestPayload(e));
   
    }
  };
  const inputCheck = () => {
    var check = true;
    if (!name.name) {
      check = false;
      setName({ ...name, nameError: true });
    } else {
      setName({ ...name, nameError: false });
    }

    if (!lastName.lastName) {
      check = false;
      setLastName({ ...lastName, lastNameError: true });
    } else {
      setLastName({ ...lastName, lastNameError: false });
    }

    if (email.email) {
      // check user if email is valid
      if (!emailCheck(email.email.trim())) {
        check = false;
        setEmail({ ...email, emailError: true });
      } else {
        setEmail({ ...email, emailError: false });
      }
    } else {
      setEmail({ ...email, emailError: false });
    }

    if (!phone.phone.trim()) {
      check = false;
      setPhone({ ...phone, phoneError: true });
    } else {
      // phone check regx
      if (phoneCheck(phone.phone.trim())) {
        setPhone({ ...phone, phoneError: false });
      } else {
        setPhone({ ...phone, phoneError: true });
      }
    }

    if (!password.password) {
      check = false;
      setPassword({ ...password, passwordError: true });
    } else {
      setPassword({ ...password, passwordError: false });
    }

    if (!repassword.repassword) {
      check = false;
      setRepassword({ ...repassword, repasswordError: true });
    } else {
      setRepassword({ ...repassword, repasswordError: false });
    }

    if (password.password && repassword.repassword) {
      if (!(password.password === repassword.repassword)) {
        check = false;
        setPassword({ ...password, passwordError: true });
        setRepassword({ ...repassword, repasswordError: true });
      } else {
        setPassword({ ...password, passwordError: false });
        setRepassword({ ...repassword, repasswordError: false });
      }
    }

    if(!genderSelected.gender){
      check=false;
      setGenderSelected({...genderSelected,genderError:true});
    }else{
      setGenderSelected({...genderSelected,genderError:false});
  
    }

    return check;
  };

  return (
    <ScrollView>
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-end",
          marginTop: 45,
          marginRight: 15,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: `${AppColor.third}`,
          }}
        >
          PMT
        </Text>
        <Text style={{ fontSize: 8 }}>LOGISTICS</Text>
      </View>
      <View>
        <InputComp
          mode="outlined"
          right={null}
          label="Surname"
          style={style.name}
          error={name.nameError}
          secureText={false}
          setText={(e) => {
            setName({ ...name, name: e });
          }}
        />
        {name.nameError ? (
          <Text style={{ marginLeft: 25, color: "red" }}>Invalid Surname</Text>
        ) : null}
      </View>
      <View>
        <InputComp
          mode="outlined"
          right={null}
          label="Last Name"
          style={style.name}
          error={lastName.lastNameError}
          secureText={false}
          setText={(e) => {
            setLastName({ ...lastName, lastName: e });
          }}
        />
        {lastName.lastNameError ? (
          <Text style={{ marginLeft: 25, color: "red" }}>Invalid Name.</Text>
        ) : null}
      </View>
     <View>
     <View
        style={{
          borderWidth:Number.parseInt(`${genderSelected.genderError?2:1}`),
          margin: 10,
          borderRadius: 5,
          borderColor:`${genderSelected.genderError?"#CD0A0A":"#97A0A6"}`,
          color: "#97A0A6",
        }}
      >
        <Picker
          mode="dropdown"
          selectedValue={genderSelected.gender}
          style={{ height:50,borderWidth:1}}
          
          onValueChange={(itemValue, itemIndex) =>
            setGenderSelected({ ...genderSelected, gender: itemValue })
          }
        >
          <Picker.Item label="Select Gender" value={null} />
          {gender.map((e, i) => {
            return <Picker.Item key={i} label={e.label} value={e.value} />;
          })}
        </Picker>
      </View>
     {genderSelected.genderError&&( <Text style={{color:'red',marginLeft:25}}> Invalid gender selected</Text>
   )}
       </View>
      <View>
        <InputComp
          inputType="emailAddress"
          mode="outlined"
          right={null}
          label="Email Address"
          style={style.name}
          error={email.emailError}
          secureText={false}
          setText={(e) => {
            setEmail({ ...email, email: e });
          }}
        />
        {email.emailError ? (
          <Text style={{ marginLeft: 25, color: "red" }}>Invalid Email.</Text>
        ) : null}
      </View>
      <View>
        <InputComp
          inputType="telephoneNumber"
          mode="outlined"
          right={null}
          label="Phone"
          style={style.name}
          error={phone.phoneError}
          secureText={false}
          setText={(e) => {
            setPhone({ ...phone, phone: e });
          }}
        />
        {phone.phoneError ? (
          <Text style={{ marginLeft: 25, color: "red" }}>Invalid Phone Number.</Text>
        ) : null}
      </View>

      <View>
        <InputComp
          inputType="password"
          mode="outlined"
          right={
            <TextInput.Icon
              name="eye"
              onPress={() =>
                setPassword({ ...password, secure: !password.secure })
              }
            />
          }
          label="Password"
          style={style.name}
          error={password.passwordError}
          secureText={password.secure}
          setText={(e) => {
            setPassword({ ...password, password: e });
          }}
        />
        {password.passwordError ? (
          <Text style={{ marginLeft: 25, color: "red" }}>Invalid password.</Text>
        ) : null}
      </View>
      <View>
        <InputComp
          inputType="password"
          mode="outlined"
          right={
            <TextInput.Icon
              name="eye"
              onPress={() =>
                setRepassword({ ...repassword, secure: !repassword.secure })
              }
            />
          }
          label="Re-enter Password"
          style={style.name}
          error={repassword.repasswordError}
          secureText={repassword.secure}
          setText={(e) => {
            setRepassword({ ...repassword, repassword: e });
          }}
        />
        {repassword.repasswordError ? (
          <Text style={{ marginLeft: 25, color: "red" }}>Invalid password.</Text>
        ) : null}
      </View>
      <TouchableOpacity onPress={() => makeRequest()} style={style.proc}>
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 15 }}>
          Proceed
        </Text>
      </TouchableOpacity>
      {appOperation.load && <LoaderComp siz={25} color={AppColor.third} />}
    </ScrollView>
  );
}
const style = StyleSheet.create({
  name: {
    margin: 10,
  },
  proc: {
    justifyContent: "center",
    margin: 35,
    marginTop: 20,
    height: 45,
    backgroundColor: `${AppColor.third}`,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import InputComp from "../WorkerComp/InputComp";
import { AppColor, regX } from "../WorkerComp/AppColor";

export default function Login({ navigation }) {
  const { navigate } = navigation;

  const [emailPhone, setEmailPhone] = useState({
    emailPhone: "",
    emailPhoneError: "",
  });

  const [password, setPassword] = useState({
    password: "",
    passwordError: false,
    secure: true,
  });

  //(||)
  const validatePhone = () => {
    if (regX.phoneFilter.test(emailPhone.emailPhone)) {
      return true;
    }
  };
  const validateEmail = () => {
    if (regX.emailFilter.test(emailPhone.emailPhone)) {
      return true;
    }
  };

  const check = () => {
    console.log(emailPhone.emailPhoneError);

    var check = true;
    if (!emailPhone.emailPhone) {
      check = false;
      setEmailPhone({ ...emailPhone, emailPhoneError: true });

    } else {
  //    
            if(validatePhone()||validateEmail()){
                console.log("correct");
                setEmailPhone({ ...emailPhone, emailPhoneError: false });
                }else{
                    check=false;
                    setEmailPhone({ ...emailPhone, emailPhoneError:true });
                }
    }
    if (!password.password) {
      check = false;
      setPassword({ ...password, passwordError: true });
    } else {
      setPassword({ ...password, passwordError: false });
    }
    return check;
  };
  const checkIpnut = () => {
    console.log("check");
    navigate('Dashboard');
    /**
     * if (check()) {
      Alert.alert("Success", "Values correct");
    }
     */
  };
  return (
    <ScrollView style={{ marginTop: 100 }}>
      <View style={{ alignSelf: "center", marginBottom: 20 }}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            color: `${AppColor.primary}`,
          }}
        >
          PML
        </Text>
        <Text style={{ textAlign: "center" }}>LOGISTICS</Text>
      </View>
      <View><InputComp
          mode="outlined"
          right={null}
          label="Email or Phone number"
          placeholder="Input value"
          style={style.emailPhone}
          error={emailPhone.emailPhoneError}
          secureText={false}
          setText={(e) => {
            setEmailPhone({ ...emailPhone, emailPhone: e });
          }}
        />
        {emailPhone.emailPhoneError?(
          <Text style={{ marginLeft: 25, color: "red" }}>Invalid input.</Text>):null}
      </View>
      <View>
        <InputComp
          mode="outlined"
          right={null}
          label="Password"
          placeholder="Enter password"
          style={style.emailPhone}
          error={password.passwordError}
          secureText={password.secure}
          setText={(e) => {
            setPassword({ ...password, password: e });
          }}
        />
        {password.passwordError && (
          <Text style={{ marginLeft: 25, color: "red" }}>
            Field Cannot be empty
          </Text>
        )}
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => checkIpnut()}
          style={{
            backgroundColor: `${AppColor.primary}`,
            borderWidth: 1,
            width: Dimensions.get("screen").width / 1.2,
            alignSelf: "center",
            marginTop: 40,
            height: 45,
            justifyContent: "center",
            borderRadius: 3,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: `${AppColor.forth}`,
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate("ForgotPassword")}>
          <Text style={{ marginTop: 20, textAlign: "center" }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 35,
        }}
      >
        <Text style={{ color: "#7F7F7F", marginRight: 10 }}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={()=>navigate('UserRegister')}>
          <Text>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const style = StyleSheet.create({
  emailPhone: {
    margin: 10,
  },
});

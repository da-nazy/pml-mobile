import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './Component/Splash/Splash.js';
import Login from './Component/Login/Login.js';
import ForgotPassword from './Component/ForgotPassword/ForgotPassword.js';
import UserRegister from './Component/Register/UserRegister.js';
import Dashboard from './Component/Dashboard/Dashboard.js';
import PickLocationMap from './Component/Map/PickLocationMap.js';
import UserProverider from './Component/DataProvider/UserContext';
export default function App() {
  const Stack=createStackNavigator();
  const myScreen=()=>{
    var check=true;
    if(check){
      return(
        <Stack.Screen 
         name="Splash"
         component={Splash}
         options={{ headerShown: false }}
        />
      )
    }else{
      return
    }
  }
  return (
   <UserProverider>
     <NavigationContainer>
     <Stack.Navigator>
     <Stack.Screen
      name="PickLocation"
      component={PickLocationMap}
      options={{ headerShown: false }}
      />
      {myScreen()}
     
      <Stack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
      />
     
      <Stack.Screen
      name="ForgotPassword"
      component={ForgotPassword}
      options={{title:false,headerShown:false}}
      />
       <Stack.Screen
      name="UserRegister"
      component={UserRegister}
      options={{title:"Register"}}
      />
      <Stack.Screen
      name="Dashboard"
      component={Dashboard}
      options={{title:false,headerShown:false}}
      />
     </Stack.Navigator>

   </NavigationContainer>
   </UserProverider>
  );
}



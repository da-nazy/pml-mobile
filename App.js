import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './Component/Splash/Splash.js';
import Login from './Component/Login/Login.js';
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
   <NavigationContainer>
     <Stack.Navigator>
      {myScreen()}
      <Stack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
      />
     </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

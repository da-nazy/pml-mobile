import React from 'react';
import { View,Text, TouchableOpacity } from 'react-native';

export  const Signupbtm=({userSignUp,dispatcherSignUP})=>{
  return(<View>
          <TouchableOpacity onPress={(e)=>userSignUp(e)}><Text> Sign up as an Individual User</Text></TouchableOpacity>
          <TouchableOpacity onPress={(e)=>dispatcherSignUP(e)}><Text>Sign up as Dispatcher</Text></TouchableOpacity>
  </View>)
}
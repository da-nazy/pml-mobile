import * as React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './Component/Splash/Splash.js';
import Login from './Component/Login/Login.js';
import ForgotPassword from './Component/ForgotPassword/ForgotPassword.js';
import UserRegister from './Component/Register/UserRegister.js';
import Dashboard from './Component/Dashboard/Dashboard.js';
import UserProverider from './Component/DataProvider/UserContext';
import Upgrade from './Component/Upgrade/Upgrade.js';
import { ThemeProvider } from 'styled-components'
import { ToastProvider } from 'react-native-styled-toast'
import appTheme from './Component/WorkerComp/appTheme.js';
export default function App() {
  const Stack=createStackNavigator();


  return (
   
   <UserProverider>
     <ThemeProvider theme={appTheme}>
    <ToastProvider>
     <NavigationContainer>
     <Stack.Navigator>
    
      <Stack.Screen 
         name="Splash"
         component={Splash}
         options={{ headerShown: false }}
        />
      <Stack.Screen
      name="Upgrade"
      component={Upgrade}
      options={{headerShown:false}}
      />
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
   </ToastProvider>
    </ThemeProvider>
   </UserProverider>

  );
}



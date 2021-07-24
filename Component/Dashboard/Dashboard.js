
import React from 'react';
import { createDrawerNavigator} from '@react-navigation/drawer';
import {UserDrawerContent} from '../WorkerComp/UserDrawerContent';
import Menu from './Menu';
const Drawer=createDrawerNavigator();

export default function Dashboard(){
 //
    return(
        <Drawer.Navigator  initialRouteName='Menu' drawerContent={(props)=><UserDrawerContent {...props}/>}>
          <Drawer.Screen name="Menu" component={Menu} options={{headerShown:false}}/>
         </Drawer.Navigator>  
    )
}
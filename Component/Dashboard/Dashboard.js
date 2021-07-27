
import React from 'react';
import { createDrawerNavigator} from '@react-navigation/drawer';
import {UserDrawerContent} from '../WorkerComp/UserDrawerContent';
import Pickup from '../Pickup/Pickup';
import SearchAdress from '../Map/SearchAddress';
import Menu from './Menu';
import Parcel from '../Parcel/Parcel';
import Ship from '../Ship/Ship';
import Transaction from '../Transaction/Transaction';
import XpressPickup from '../Pickup/XpressPickup';
import Support from '../Support/Support';
const Drawer=createDrawerNavigator();
export default function Dashboard(){
 //
    return(
        <Drawer.Navigator  initialRouteName='Menu' drawerContent={(props)=><UserDrawerContent {...props}/>}>
          <Drawer.Screen name="Menu" component={Menu} options={{headerShown:false}}/>
          <Drawer.Screen name="SearchAddress" component={SearchAdress} options={{headerShown:false}}/>
          <Drawer.Screen name="Pickup" component={Pickup} options={{headerShown:false}}/>
          <Drawer.Screen name="Parcel" component={Parcel} options={{headerShown:false}}/>
          <Drawer.Screen name="Ship" component={Ship} options={{headerShown:false}}/>
          <Drawer.Screen name="Transaction" component={Transaction} options={{headerShown:false}}/> 
          <Drawer.Screen name="XpressPickup" component={XpressPickup} options={{headerShown:false}}/> 
          <Drawer.Screen name="Support" component={Support} options={{headerShown:false}}/> 
          
         </Drawer.Navigator>  
    )
}
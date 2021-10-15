import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { UserDrawerContent } from "../WorkerComp/UserDrawerContent";
import Pickup from "../Pickup/Pickup";
import SearchAdress from "../Map/SearchAddress";
import Menu from "./Menu";
import Parcel from "../Parcel/Parcel";
import Ship from "../Ship/Ship";
import Transaction from "../Transaction/Transaction";
import XpressPickup from "../Pickup/XpressPickup";
import Support from "../Support/Support";
import CreateParcel from "../Parcel/CreateParcel";
import CreatePickup from "../Pickup/CreatePickup";
import SelectCat from "../Pickup/SelectCat";
import PickupLocationMap from "../Map/PickupLocationMap";
import PickLocation from "../Map/PickLocation";
import Details from "../WorkerComp/Details";
import Profile from "../Profile/Profile";
import Wallet from "../Wallet/Wallet";
import ResetPassword from "../ResetPassword/ResetPassword";
const Drawer = createDrawerNavigator();
export default function Dashboard() {
  /**
  * 
       <Stack.Screen
       name="Details"
       component={Details}
       options={{headerShown:false}}
       />
  */
  return (
    <Drawer.Navigator
      drawerContent={(props) => <UserDrawerContent {...props} />}
    >
      
      <Drawer.Screen
        name="Menu"
        component={Menu}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="SearchAddress"
        component={SearchAdress}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Pickup"
        component={Pickup}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Parcel"
        component={Parcel}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Ship"
        component={Ship}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Transaction"
        component={Transaction}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="XpressPickup"
        component={XpressPickup}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Support"
        component={Support}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
    name="Create Parcel"
    component={CreateParcel}
    options={{ headerShown: false }}
     />
      <Drawer.Screen
        name="Create Pickup"
        component={CreatePickup}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Select Category"
        component={SelectCat}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="location"
        component={PickupLocationMap}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="PickLocation"
        component={PickLocation}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Details"
        component={Details}
        options={{ headerShown: false }}
      />

      <Drawer.Screen
        name="Wallet"
        component={Wallet}
        options={{ headerShown: false }}
      />
       <Drawer.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: false }}
      />
      
    </Drawer.Navigator>
  );
}

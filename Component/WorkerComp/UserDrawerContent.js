import React,{useState,useContext,useEffect} from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import { AppColor } from './AppColor';
import { DrawerContentScrollView } from "@react-navigation/drawer";
import Icon from 'react-native-vector-icons/FontAwesome5';
import {UserContext} from '../DataProvider/UserContext';
export const  UserDrawerContent=(props)=>{
     
  const [appDetails,setAppDetails]=useState({
    name:'',
  })
  const usercontext=useContext(UserContext);
   const {user}=usercontext;

    const [sideBar,setSideBar]=useState([
      
      {
        icon:'bars',
        name:'Menu',
        func:()=>props.navigation.navigate('Menu'),
      },
      {
        icon:"phone-volume",
        name:"Support",
        func:()=>props.navigation.navigate('Support')
      },
      {
        icon:'box',
        name:'Parcels',
        func:()=>props.navigation.navigate('Parcel'),
      },
      {
        icon:'box',
        name:'Quick quotes',
        func:()=>console.log("Menu"),
      },
      {
        icon:'boxes',
        name:'Pickups',
        func:()=>props.navigation.navigate('Pickup'),
      },
      {
        icon:'thumbtack',
        name:'Track Pickup',
        func:()=>console.log("Menu"),
      },
      {
        icon:'wallet',
        name:'Wallet',
        func:()=>props.navigation.navigate('Wallet'),
      },
      {
        icon: "sign-out-alt",
        name: "Logout",
        // need to disable going back
        func: () =>props.navigation.navigate('Login'),
      },
    ])
    useEffect(()=>{
      if(user){
        setAppDetails({...appDetails,name:user.name});
        console.log(user.surname,user.otherName);
      }
    },[user])

  return(
    <DrawerContentScrollView {...props}>
    <View>
      <View
        style={{
          paddingLeft: 20,
          borderBottomColor: `${AppColor.third}`,
          borderBottomWidth: 1,
          margin: 5,
          paddingBottom: 10,
        }}
      >
        <View style={{ flexDirection: "row", marginTop: 30 }}>
          <TouchableOpacity
            style={{
              backgroundColor:'#bbbbbb',
              height: 70,
              width: 70,
              justifyContent: "center",
              borderRadius: 35,
            }}
            onPress={()=>props.navigation.navigate('Profile')}
          >
            <Icon
              style={{ textAlign: "center" }}
              name="user"
              color="#3F3F3F"
              size={30}
            />
          </TouchableOpacity>
          <Text style={{ marginTop: 20, marginLeft: 10, fontWeight: "bold" }}>
           Pml User Account
          </Text>
        </View>
        <Text style={{ marginTop:10,marginLeft:15}}>{user?`${user.surname} ${user.otherName}`:'Ani Daniel'}</Text>
      </View>
      <View style={{ marginTop: 35, marginLeft: 15 }}>
        {sideBar &&
          sideBar.map((e, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={()=>e.func()}
                style={{ flexDirection: "row", marginBottom: 30 }}
              >
                <Icon
                  name={e.icon}
                  size={20}
                  color={AppColor.third}
                  style={{ marginRight: 15, fontSize: 15, marginTop: 4 }}
                />
                <Text style={{ fontSize: 15 }}>{e.name}</Text>
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  </DrawerContentScrollView>
  )
}
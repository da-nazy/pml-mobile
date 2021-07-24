import React,{useState} from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import { AppColor } from './AppColor';
import { DrawerContentScrollView } from "@react-navigation/drawer";
import Icon from 'react-native-vector-icons/FontAwesome5';
export const  UserDrawerContent=(props)=>{
    const [sideBar,setSideBar]=useState([
      {
        icon:'bars',
        name:'Menu',
        func:()=>console.log("Menu"),
      },
      {
        icon:"phone-volume",
        name:"Support",
        func:()=>console.log("contact Support")
      },
      {
        icon: "sign-out-alt",
        name: "Logout",
        func: () => console.log("Logout"),
      },
    ])
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
        <Text style={{ marginTop:10,marginLeft:15}}>Ani Daniel</Text>
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
                  color="#000"
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
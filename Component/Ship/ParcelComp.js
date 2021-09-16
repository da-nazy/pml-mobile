import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppColor } from '../WorkerComp/AppColor';
export default function ParcelComp({name,subIcon,func,catIcon}) {
    return (
        <View style={style.pendPick}>
        <Icon name={catIcon} size={20} color={AppColor.third} style={{ margin: 5,width:'10%' }} />
        <Text style={{ marginLeft: 10, marginRight: 10 ,width:'50%'}}>
          {name}
        </Text>
        <Icon
          name={subIcon}
          size={20}
          color={AppColor.third}
          style={{ marginRight: 20,width:'10%' }}
        />
        <TouchableOpacity onPress={()=>func()} style={{width:'10%'}}>
          <Icon name="ellipsis-v" size={20} color={AppColor.third} />
        </TouchableOpacity>
      </View>
    )
}

const style = StyleSheet.create({
    pendPick: {
      width:'97%',
  
      flexDirection: "row",
      height: 50,
      marginTop: 10,
      borderRadius: 5,
      backgroundColor: "#fff",
      margin: 5,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  });
  
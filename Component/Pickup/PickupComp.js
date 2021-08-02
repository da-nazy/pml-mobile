import React from 'react';
import { View,Text,Dimension,StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppColor } from '../WorkerComp/AppColor';
export default function PickupComp({catIcon,name,func,parcel,pickStatus}) {
    return (
      <View style={style.pendPick}>
        <Icon name={catIcon} size={20} color={AppColor.third} style={{ margin: 5,width:'10%' }} />
       <View style={{ marginLeft: 10, marginRight: 10 ,width:'60%',borderLeftColor:`${AppColor.third}`,borderLeftWidth:1,paddingLeft:5}}>
       <View style={{flexDirection:'row'}}>
           <Text style={{fontWeight:'700',marginRight:2}}>Name:</Text><Text >
          {name}
        </Text>
       </View>
       <View style={{flexDirection:'row'}}>
           <Text style={{fontWeight:'700',marginRight:2}}>PickupStatus:</Text><Text >
          {pickStatus}
        </Text>
        
       </View>
        <View style={{flexDirection:'row'}}>
           <Text style={{fontWeight:'700',marginRight:2}}>Parcel:</Text><Text>
        {parcel}
        </Text>
        
       </View>
       </View>
      
        
        <TouchableOpacity onPress={()=>func()} style={{width:'10%'}}>
          <Icon name="ellipsis-v" size={20} color={AppColor.third} />
        </TouchableOpacity>
      </View>
    );
  }
  
  const style = StyleSheet.create({
    pendPick: {
      width:'97%',
      flexDirection: "row",
      height: 75,
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
  
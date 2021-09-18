import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppColor } from '../WorkerComp/AppColor';
export default function ParcelComp({parcel,func}) {
   
    return (
      <View  style={style.pendPick}>
      <Icon name="box" size={15} color={AppColor.third} style={{ margin: 5,width:'10%' }} />
     <View style={{ marginLeft: 10, marginRight: 10 ,width:'50%'}}>
      <View style={{flexDirection:'row'}}>
      <Text style={{fontWeight:'bold'}}>Name: </Text> 
      <Text>
        {parcel.name}
      </Text>
      </View>
      <View style={{flexDirection:'row'}}>
      <Text style={{fontWeight:'bold'}}>Date: </Text> 
      <Text>
        {parcel.createdAt.split('T')[0]}
      </Text>
      </View>
      <View style={{flexDirection:'row'}}>
      <Text style={{fontWeight:'bold'}}>Status: </Text> 
      <Text>
        {parcel.deliveryStatus}
      </Text>
      </View>
      <View style={{flexDirection:'row'}}>
      <Text style={{fontWeight:'bold'}}>
         isPackaged:
        </Text>
        {parcel.isPackaged?<TouchableOpacity style={{height:25,width:55,borderRadius:2,marginLeft:5,backgroundColor:`${AppColor.third}`}}><Text style={{textAlign:'center',color:'#fff',fontWeight:'bold'}}>Track</Text></TouchableOpacity>:<Text> Not Packaged</Text>}
      </View>
     </View>
      
      <TouchableOpacity onPress={()=>func(parcel.id)} style={{width:'10%'}}>
        <Icon name="ellipsis-v" size={20} color={AppColor.third} />
      </TouchableOpacity>
    </View>
  )
  
    
}

const style = StyleSheet.create({
    pendPick: {
      width:'97%',
  
      flexDirection: "row",
      height: 100,
  
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
  
import React,{useState} from 'react';
import { View,Text,Dimension,StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppColor } from '../WorkerComp/AppColor';
import  ItemComp from './ItemComp';
import Pickupoperation from './Pickupopeation';
export default function ParcelComp({catIcon,func,parcel,pickOp}) {
  const [parcelDisplay,setParcelDisplay]=useState(false);
    return (
     <View>
        <View style={style.pendPick}>
        <Icon name={catIcon} size={20} color={AppColor.third} style={{ margin: 5,width:'10%' }} />
       <View style={{ marginLeft: 10, marginRight: 10 ,width:'60%',borderLeftColor:`${AppColor.third}`,borderLeftWidth:1,paddingLeft:5}}>
       <View style={{flexDirection:'row'}}>
           <Text style={{fontWeight:'700',marginRight:2}}>Name:</Text><Text >
          {parcel.description}
        </Text>
       </View>
       <View style={{flexDirection:'row'}}>
           <Text style={{fontWeight:'700',marginRight:2}}>ParcelStatus:</Text><Text >
          {parcel.deliveryStatus}
        </Text>
        
       </View>
        <View style={{flexDirection:'row'}}>
           <Text style={{fontWeight:'700',marginRight:2}}>Parcel:</Text><Text>
             {parcel.items.length.toString()}
           </Text>
        
       </View>
       
       <View style={{flexDirection:'row'}}>
           <Text style={{fontWeight:'700',marginRight:2}}>Date:</Text><Text>
        {parcel.createdAt.split("T")[0]}
        </Text>
        
       </View>

       <View style={{flexDirection:'row'}}>
           <Text style={{fontWeight:'700',marginRight:2}}>Amount:</Text><Text>
        {parcel.costPayable}
        </Text>
       </View>
       

       </View>
      
      <View style={{width:'10%',height:'100%',justifyContent:'space-evenly',flexDirection:'column'}}>
      <TouchableOpacity onPress={()=>pickOp()}  style={{alignSelf:'center'}}>
          <Icon name="telegram-plane" size={20} color={AppColor.third} />
        </TouchableOpacity>

      <TouchableOpacity onPress={()=>setParcelDisplay(!parcelDisplay)}   style={{alignSelf:'center'}}>
          <Icon name="eye" size={20} color={parcelDisplay?AppColor.third:"#bbb"} />
        </TouchableOpacity>
      </View>

      </View>
     {
       parcel.items&&parcelDisplay&&parcel.items.map((e,i)=>{
    
         return(
          <ItemComp key={i} item={e} func={(a)=>console.log(a)}/>
         )
       })
     }
       </View>
    );
  }
  
  const style = StyleSheet.create({
    pendPick: {
      width:'97%',
      flexDirection: "row",
      height: 95,
      marginTop: 10,
      borderRadius: 5,
      backgroundColor: "#fff",
      margin: 5,
      padding:5,
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
  
import React,{useState} from 'react';
import { View,Text,Dimension,StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppColor } from '../WorkerComp/AppColor';
import  ParcelComp from '../Ship/ParcelComp';
export default function PickupComp({catIcon,func,pickup}) {
  const [parcelDisplay,setParcelDisplay]=useState(false);
    return (
     <View>
        <View style={style.pendPick}>
        <Icon name={catIcon} size={20} color={AppColor.third} style={{ margin: 5,width:'10%' }} />
       <View style={{ marginLeft: 10, marginRight: 10 ,width:'60%',borderLeftColor:`${AppColor.third}`,borderLeftWidth:1,paddingLeft:5}}>
       <View style={{flexDirection:'row'}}>
           <Text style={{fontWeight:'700',marginRight:2}}>Name:</Text><Text >
          {pickup.description}
        </Text>
       </View>
       <View style={{flexDirection:'row'}}>
           <Text style={{fontWeight:'700',marginRight:2}}>PickupStatus:</Text><Text >
          {pickup.status}
        </Text>
        
       </View>
        <View style={{flexDirection:'row'}}>
           <Text style={{fontWeight:'700',marginRight:2}}>Parcel:</Text><Text>
             {pickup.pmlParcels.length}
           </Text>
        
       </View>
       
       <View style={{flexDirection:'row'}}>
           <Text style={{fontWeight:'700',marginRight:2}}>Date:</Text><Text>
        {pickup.createdAt.split("T")[0]}
        </Text>
        
       </View>

       <View style={{flexDirection:'row'}}>
           <Text style={{fontWeight:'700',marginRight:2}}>Amount:</Text><Text>
        {pickup.amount}
        </Text>
       </View>
       

       </View>
      
        
        <TouchableOpacity onPress={()=>setParcelDisplay(!parcelDisplay)} style={{width:'10%'}}>
          <Icon name="eye" size={20} color={parcelDisplay?AppColor.third:"#bbb"} />
        </TouchableOpacity>
      </View>
     {
       pickup.pmlParcels&&parcelDisplay&&pickup.pmlParcels.map((e,i)=>{
    
         return(
          <ParcelComp key={i} parcel={e} func={(a)=>console.log(a)}/>
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
  
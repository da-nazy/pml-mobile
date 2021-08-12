import React from 'react';
import { View,Text,Dimensions,StyleSheet,ScrollView} from 'react-native';
import CustomFab from '../WorkerComp/CustomFab';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppColor } from '../WorkerComp/AppColor';
import PickupComp from './PickupComp';
export default function Pickup({navigation}){
    const {navigate}=navigation;
    return(
        <View style={{backgroundColor:'#fff',paddingBottom:40}}>
        <View style={{flexDirection:'row',justifyContent:'center',padding:15,borderBottomWidth:1,borderBottomColor:`${AppColor.third}`}}><Icon name="boxes" size={15} color={AppColor.third} /><Text style={{fontWeight:'bold',textAlign:'center',fontSize:15,marginLeft:5}}>Pickups</Text></View>
        <ScrollView style={{height:Dimensions.get('screen').height/1.29}}>
         <PickupComp catIcon="boxes"  name="Food Stuffs" parcel="Empty" pickStatus="Unassigned"  func={()=>{console.log("Check")}}/>
    
        </ScrollView>
        <CustomFab iconName="plus" fabFunc={()=>navigate("Select Category")}/> 
       </View>
    )
}

const style=StyleSheet.create({

})
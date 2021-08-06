import React from 'react';
import { View,Text,ScrollView,StyleSheet,Dimensions} from 'react-native';
import CustomFab from '../WorkerComp/CustomFab';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppColor } from '../WorkerComp/AppColor';
import ParcelComp from './ParcelComp';
export default function Parcel({navigation}){
  const {navigate}=navigation;
    return (
    <View style={{backgroundColor:'#fff',paddingBottom:45}} >
       <View style={{flexDirection:'row',justifyContent:'center',padding:15,borderBottomWidth:1,borderBottomColor:`${AppColor.third}`}}><Icon name="box" size={15} color={AppColor.third} /><Text style={{fontWeight:'bold',textAlign:'center',fontSize:15,marginLeft:5}}>Parcel</Text></View>
         <ScrollView style={{height:Dimensions.get('screen').height/1.3}}>
        <ParcelComp name="A bag of Rice" catIcon="box" func={()=>console.log("okay")}/>
     </ScrollView>
     <CustomFab iconName="plus" fabFunc={()=>navigate('Select Category')}/>
    </View>
    )
}

const style=StyleSheet.create({
    
})
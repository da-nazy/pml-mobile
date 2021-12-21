import React from 'react';
import { View,Text,ScrollView,StyleSheet, Dimensions,Linking } from 'react-native';

import SupportComp from './SupportComp';
export default function Support({navigation}){

    

    const {navigate}=navigation;
 

    return(
        <View style={style.container}>
        <ScrollView>
        <SupportComp iconName={"phone-volume"} fabFunc={()=>Linking.openURL('tel:09011111111')} name={"Call Customer Care "} value={"09011111111"}/>
        <SupportComp iconName={"envelope"} fabFunc={()=>Linking.openURL('mailto:admin@pmt.com?to=admin.pmt.com')} name={"Message Customer Care "} value={"admin@pmt.com"}/>
       </ScrollView>
          </View>
    )
}

const style=StyleSheet.create({
    container:{
    height:Dimensions.get('screen').height,
    paddingBottom:40,
    backgroundColor:'#fff',
    marginBottom:20
    }
})
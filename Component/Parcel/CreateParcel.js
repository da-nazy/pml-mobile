import React from 'react';
import { View,Text, ScrollView } from 'react-native';
import { AppColor } from '../WorkerComp/AppColor';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default function CreateParcel(){
    return(
        <View>
            <View style={{flexDirection:'row',justifyContent:'center',padding:15,borderBottomWidth:1,borderBottomColor:`${AppColor.third}`}}><Icon name="box" size={15} color={AppColor.third} /><Text style={{fontWeight:'bold',textAlign:'center',fontSize:15,marginLeft:5}}>Create Parcel</Text></View>
            <ScrollView>

            </ScrollView>
        </View>
    )
}
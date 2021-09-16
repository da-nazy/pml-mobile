import React from 'react';
import {View,StyleSheet,Text} from 'react-native';
import { IconComp } from '../WorkerComp/ExternalFunction';
import { AppColor } from '../WorkerComp/AppColor';
export default function Ship(){
    return(
        <View>
        <View style={{flexDirection:'row',justifyContent:'center',padding:15,borderBottomWidth:1,borderBottomColor:`${AppColor.third}`}}>{IconComp("ship",style.iconStyle,25,AppColor.third)}<Text style={{fontWeight:'bold',textAlign:'center',fontSize:15,marginLeft:5}}>Shipments</Text></View>
     
        </View>
    )
}

const style=StyleSheet.create({
    iconStyle:{

    }
})
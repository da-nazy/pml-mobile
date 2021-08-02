import React from 'react';
import { View,Text ,StyleSheet, ScrollView, Dimensions} from 'react-native';
import { AppColor } from '../WorkerComp/AppColor';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SearchByComp from '../WorkerComp/SearchByComp';
import TransComp from './TransComp';
export default function Transaction(){
    return(
        <View style={{backgroundColor:'#fff'}}>
              <View style={{flexDirection:'row',justifyContent:'center',padding:15,borderBottomWidth:1,borderBottomColor:`${AppColor.third}`}}><Icon name="wallet" size={17} color={AppColor.third} /><Text style={{fontWeight:'bold',textAlign:'center',fontSize:15,marginLeft:5}}>Transactions</Text></View>
            <SearchByComp func={()=>console.log("okay")}/>
            <ScrollView style={{height:Dimensions.get('screen').height/1.31}}>
           <TransComp iconName="long-arrow-alt-up" color="red" transText="Rides to dubai" transTime="10.30pm" transAmount="-70,000" func={()=>console.log("Okay")}/>
           <TransComp iconName="long-arrow-alt-down" color={AppColor.green} transText="Cash deposit" transTime="10.30pm" transAmount="70,000" func={()=>console.log("Okay")}/>
         
            </ScrollView>
        </View>
    )
}

const style=StyleSheet.create({

})
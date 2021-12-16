import React from 'react';
import {View,TextInput,Image,StyleSheet,Text,ScrollView} from 'react-native';
import {IconComp} from '../WorkerComp/ExternalFunction';
import { AppColor } from '../WorkerComp/AppColor';
import  order from '../Assets/order.jpg';
export default function Track(){
    //Should get the code from route params
    return(
        <ScrollView>
         <View style={{...style.searchCont}}>
            <Image source={order} style={style.image} resizeMode={"stretch"} />
             <View>
                 <Text style={{fontWeight:'700',fontSize:20,color:"#fff",textAlign:'center'}}>Track Your Parcel</Text>
                 <Text style={{textAlign:"center"}}>Enter your track number to track your parcel</Text>
                <View>
                {IconComp ("search",null,15,AppColor.third)}
                <TextInput placeholder='Search by track number' onChangeText={(e)=>console.log(e)}>

                </TextInput>
                </View>

             </View>
         </View>

        </ScrollView>
    )
}

const style=StyleSheet.create({
    searchCont:{
    height:400,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    backgroundColor:'#A7C7FA'
    },
   searchInput:{

   },
   image:{
      width:'100%',
      height:200 
   }
})
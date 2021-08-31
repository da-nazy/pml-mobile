import React,{useState} from 'react';
import {View,StyleSheet, TouchableOpacity,ScrollView,Text} from 'react-native';
import { IconComp } from '../WorkerComp/ExternalFunction';
import { AppColor } from '../WorkerComp/AppColor';
import InputComp from '../WorkerComp/InputComp';
export default function ViewPickup({pickup}){
    
    const[appDetails,setAppDetails]=useState({
        edit:false,
        load:false,
    })
    return (
        <View>
            <ScrollView>
              <View
                style={{
                  width: "25%",
                  marginBottom:20,
                  height: 50,
                  width: 50,
                  marginTop:25,
                }}
              > 
              <View style={{flexDirection:'row'}}>
                {IconComp("box",{width:70,height:70,textAlign:"center"},50,AppColor.third)}
               {appDetails.edit&&(
                <TouchableOpacity style={{borderRadius:8,backgroundColor:'#fff',left:-30,top:8,borderWidth:1,borderColor:`${AppColor.third}`,alignSelf:'center'}}>
                {IconComp("pen",{width:20,height:20,textAlign:"center",padding:3},10,AppColor.third)}
               </TouchableOpacity>
               )}
                   </View>
              </View>
              <View style={{margin:10}}> 
        
        <View style={{marginTop:5}}>
        <InputComp
          inputType="Code:"
          value={pickup.code?pickup.code:''}
          mode="outlined"
          right={null}
          label="Pickup Code:"
          style={style.name}
          secureText={false}
          disabled={true} 
        />
       </View>

       <View style={{marginTop:5}}>
        <InputComp
          inputType="CreatedAt:"
          value={pickup.createdAt?pickup.createdAt:''}
          mode="outlined"
          right={null}
          label="Pickup Code:"
          style={style.name}
          secureText={false}
          disabled={true} 
        />
       </View>

       <View style={{marginTop:5}}>
        <InputComp
          inputType="Description:"
          value={pickup.description?pickup.description:''}
          mode="outlined"
          right={null}
          label="Pickup Code:"
          style={style.name}
          secureText={false}
          disabled={true} 
        />
       </View>

       <View style={{marginTop:5}}>
        <InputComp
         
          value={pickup.description?pickup.description:''}
          mode="outlined"
          right={null}
          label="Delivery Address:"
          placeholder="Input  Delivery Address"
          style={style.name}
          secureText={false}
          disabled={!appDetails.edit}
        />  
      </View>


      <View style={{marginTop:5}}>
        <InputComp
          
          value={pickup.senderAddress?pickup.senderAddress:''}
          mode="outlined"
          right={null}
          label="Sender Address:"
          placeholder="Input value"
          style={style.name}
          secureText={false}
          disabled={!appDetails.edit}
        />  
      </View>

      <View style={{marginTop:5}}>
        <InputComp
          value={pickup.senderAddress?pickup.senderAddress:''}
          mode="outlined"
          right={null}
          label="Recipient Phone:"
          placeholder="Input  phone"
          style={style.name}
          secureText={false}
          disabled={!appDetails.edit}
        />  
      </View>

      <View style={{marginTop:5}}>
        <InputComp
         
          value={pickup.senderAddress?pickup.senderAddress:''}
          mode="outlined"
          right={null}
          label="Vehicle Type:"
          placeholder="Input Vehicle Type"
          style={style.name}
          secureText={false}
          disabled={!appDetails.edit}
        />  
      </View>
      <View>
        
      </View>

      </View>
      <View>
          <TouchableOpacity><Text>DELETE</Text></TouchableOpacity>
          <TouchableOpacity><Text>PAY</Text></TouchableOpacity>     
      </View>

            </ScrollView>
        </View>
    )
}

const style=StyleSheet.create({
   name:{
    height:50,
    marginTop:15,
    width:'100%',
   },

})
import React,{useState} from 'react';
import {View,Image,StyleSheet, TouchableOpacity,Text, ScrollView, Dimensions,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import InputComp from '../WorkerComp/InputComp';
import { regX } from '../WorkerComp/AppColor';
export default function ForgotPassword(){
    // inputType =email,phone
    const [email,setEmail]=useState({
        value:'',
        error:false,
        inputType:'',
    });
    const validatePhone=()=>{
        if(regX.phoneFilter.test(email.value)){
         return true;
        
    }
}
    const validateEmail=()=>{
        if(regX.emailFilter.test(email.value)){
            return true;
    }
   
}
    const checkInput=()=>{
        if(email.value==""){
            setEmail({...email,error:true});
           validateEmail();
           validatePhone();
           
        }else{
            setEmail({...email,error:false});
            Alert.alert("Success","Values are set")
        }
    }
   return(
       <ScrollView>
          <View style={{marginTop:80,justifyContent:'center',alignItems:'center',marginBottom:40}}><Icon name="user-lock" size={65} color="#000"/>
           </View>
           <View style={{alignItems:'center'}}><Text style={{textAlign:'center',fontSize:25,fontWeight:'bold',marginBottom:20}}>Forgot Password?</Text><Text style={{fontSize:18,width:'70%',textAlign:'center',color:'#A0A0A0'}}>
                   Enter your registered email to reset your password
               </Text>
           </View>
           <View><InputComp mode="outlined" right={null}  label="Email or Phone" placeholder="Input value"  style={style.email} error={email.error} secureText={true} setText={(e)=>{setEmail({...email,value:e})}}/>
           {email.error?(<Text style={{marginLeft:25,color:'red'}}>Field Cannot be empty</Text>):null}
            </View>
            <TouchableOpacity onPress={()=>checkInput()} style={style.send}><Text style={{color:'#fff',textAlign:'center'}}>SEND</Text></TouchableOpacity>
       </ScrollView>
   )
}

const style=StyleSheet.create({
     email:{
         marginTop:15,
         margin:10,
     },
     send:{
         justifyContent:'center',
         margin:15,
         marginTop:20,
         height:45,
         backgroundColor:'#000',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }
     
})
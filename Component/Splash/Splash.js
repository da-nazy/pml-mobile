import { auto } from 'async';
import React,{useState} from 'react';
import { View,Text,ImageBackground,StyleSheet, Dimensions,Image} from 'react-native';
import splash_background from '../Assets/splash_background.jpg';
import logowhite from '../Assets/logowhite.png';
import LoaderComp from '../WorkerComp/LoaderComp';
import {AppColor} from '../WorkerComp/AppColor';
import { getToken } from '../WorkerComp/ExternalFunction';
import { api,apiRequest } from '../WorkerComp/Api';
export default function Splash({navigation}){
    const {navigate}=navigation;

    const[appOp,setAppOp]=useState({
      load:false,
    })
   
        
   const userProfileSuc=(e)=>{
    console.log(e)
   }
   const userProfileFail=(e)=>{
    console.log(e)
   }
 const userProfilePayload=(e)=>{
   console.log(e)
 }
    const getProfile=(token)=>{
      var userObject={
        method:'get',
        url:`${api.localUrl}${api.userProfile}`,
            headers:{
                Authorization:' Bearer ' + token,
              }
        
    }
    console.log(userObject);

   apiRequest(userObject,(e)=>{setAppOp({...appOp,load:e})},(e)=>{userProfileSuc(e)},(e)=>{userProfileFail(e)},(e)=>{userProfilePayload(e)})


    }
    getToken('token').then((check)=>{
      if(check){
        // token exists
      // check if token is still active
      // check if the user logout
      //if user logout it should set token to null
      // set to the state token

      console.log("The token:",check);
         getProfile(check);
      }else{
          console.log(check);
          setTimeout(()=>navigate('Login'),2000);
      }
    }).catch((err)=>{
    console.log(err)
    })

    return(
        <View style={styles.container}>
            
            <ImageBackground
            source={splash_background}
            resizeMode="cover" style={styles.image}
            >
             
             <View style={{backgroundColor:`${AppColor.third}`,borderWidth:1,borderColor:'#F38640',height:100,width:100,justifyContent:'center',borderRadius:5,alignSelf:'center'}}>
             <Text style={{color:'#fff',textAlign:'center',fontSize:20}}>PMLGO!</Text>
             <Image source={logowhite} style={{height:25,width:20,borderColor:'#000',alignSelf:'flex-end',marginRight:-7}}/>
             </View>
            
            </ImageBackground>
             {appOp.load(<LoaderComp size={40} color='#433E91'/>)}
             </View>
    )
}
const styles=StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center"
      },
    container:{
        flex:1,
      },
      txt:{
        color:'#fff',
        height:100,
        width:100,
        borderWidth:1,
        borderColor:'#fff',
        borderRadius:5,
        alignSelf:'center', 
        textAlign:'center',
      
      }
})
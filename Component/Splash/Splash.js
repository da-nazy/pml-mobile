
import React,{useState,useEffect, useContext} from 'react';
import { View,Text,ImageBackground,StyleSheet, Dimensions,Image} from 'react-native';
import splash_background from '../Assets/splash_background.jpg';
import logowhite from '../Assets/logowhite.png';
import { StackActions } from '@react-navigation/native';
import LoaderComp from '../WorkerComp/LoaderComp';
import {AppColor} from '../WorkerComp/AppColor';
import { getToken } from '../WorkerComp/ExternalFunction';
import { api,apiRequest } from '../WorkerComp/Api';
import {UserContext} from '../DataProvider/UserContext';
export default function Splash({navigation}){
    const {navigate}=navigation;
   const usercontext=useContext(UserContext);
   const{user,setUser,setAuthUser,authUser}=usercontext;

    const[appOp,setAppOp]=useState({
      load:false,
      token:'',
    })
   
       useEffect(()=>{
         console.log("checking")
       if(appOp.token){
         setAuthUser({...authUser,token:appOp.token});
         if(!user){
          getProfile(appOp.token);
          console.log("chap")
         }
       
       }

       },[appOp.token])   

   const userProfileSuc=(e)=>{
    console.log(e);
   }
   const userProfileFail=(e)=>{
    console.log(e);
    // check if the payload has expired and send the user to the login section 
   }
 const userProfilePayload=(e)=>{
  setUser(e.data.payload, navigation.dispatch(StackActions.replace('Dashboard')));
  
 
 }
    const getProfile=(token)=>{
      var userObject={
        method:'get',
        url:`${api.localUrl}${api.userProfile}`,
            headers:{
                Authorization:' Bearer ' + token,
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
              }
        
    }
   // console.log(userObject);

   apiRequest(userObject,(e)=>{setAppOp({...appOp,load:e})},(e)=>{userProfileSuc(e)},(e)=>{userProfileFail(e)},(e)=>{userProfilePayload(e)})
    }

    getToken('token').then((check)=>{
      if(check){
        // token exists
      // check if token is still active
      // check if the user logout
      //if user logout it should set token to null
      // set to the state token
      //console.log(check);
         if(!appOp.token){
          setAppOp({...appOp,token:check});
          console.log(check);
         }else{
           console.log("test")
         }

      }else{
          console.log(check);
         // setTimeout(()=>navigate('Login'),2000);
         navigation.dispatch(StackActions.replace('Login'));
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
             {appOp.load&&<LoaderComp size={40} color='#433E91'/>}
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
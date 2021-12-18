
import React,{useState,useEffect, useContext} from 'react';
import { View,Text,ImageBackground,StyleSheet, Dimensions,Image,ScrollView} from 'react-native';
import splash_background from '../Assets/splash_background.jpg';
import splashImg from '../Assets/splashImg.png';
import logowhite from '../Assets/logowhite.png';
import logo from '../Assets/logo.png';
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
       if(appOp.token){
         setAuthUser({...authUser,token:appOp.token});
         if(!user){
          getProfile(appOp.token);
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
   console.log(e.data.payload);

   if(e.data.payload){
    setUser(e.data.payload, navigation.dispatch(StackActions.replace('Dashboard')));
   }else{
     //empty payload returned
     navigation.dispatch(StackActions.replace('Login'));
   }
 
  
 
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
       
         }else{
           console.log("test")
         }

      }else{
       
         // setTimeout(()=>navigate('Login'),2000);
       //  navigation.dispatch(StackActions.replace('Login'));
      }
    }).catch((err)=>{
    console.log(err)
    })

    return(
        <ScrollView style={styles.container}>
            
            <View style={{...styles.headCont}}>
            <View style={{...styles.cont1}}><Text style={{...styles.pmtTxt}}>PMT {'\n'}LOGISTICS</Text>
            <View style={{...styles.logoCont}}><Image source={logo} style={{...styles.logo}}/></View></View>
            </View>
            <View style={{...styles.splashCont}}>
              <Image source={splashImg} resizeMode='contain' height={270}/>
            </View>
             {appOp.load&&<LoaderComp size={40} color='#433E91'/>}
             </ScrollView>
    )
}
const styles=StyleSheet.create({
  splashCont:{
   marginTop:122,
   height:270,
  },
  headCont:{
    flexDirection:'row',
    justifyContent:'center',
  },
  logoCont:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    
    elevation: 7,
  },
  logo:{
    height:37,
    width:40,
  },
  cont1:{
   marginTop:96,
   width:'85%',
   flexDirection:'row',
  justifyContent:'space-between',
  display:'flex',
  },
  imgCont:{
  height:37,
  width:40 
  }, 
  pmtTxt:{
    fontWeight:'700',
    fontSize:24,
    color:`${AppColor.secondary}`,
    textShadowRadius:5,
  },
    image: {
        flex: 1,
        justifyContent: "center"
      },
    container:{
        flex:1,
        backgroundColor:'#fff',
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
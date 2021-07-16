import { auto } from 'async';
import React from 'react';
import { View,Text,ImageBackground,StyleSheet, Dimensions,Image} from 'react-native';
import splash_background from '../Assets/splash_background.jpg';
import logowhite from '../Assets/logowhite.png';
import LoaderComp from '../WorkerComp/LoaderComp';
import {AppColor} from '../WorkerComp/AppColor';
export default function Splash({navigation}){
    const {navigate}=navigation;
    setTimeout(()=>navigate('Login'),2000);
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
             <LoaderComp size={40} color='#433E91'/>
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
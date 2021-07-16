import React,{useState} from 'react';
import { View,Text,StyleSheet, TouchableOpacity, Dimensions, ScrollView,Alert} from 'react-native';
import InputComp from '../WorkerComp/InputComp';
import {AppColor,regX} from '../WorkerComp/AppColor';

export default function Login(){
    const set=()=>{
        console.log("elo");
    }
    const [user,setUser]=useState({
        emailPhone:'',
        password:'',
        ePInputError:false,
        passwordError:false,
    }) 
    //(||)
    const check=()=>{
        var check=true;
        if(!user.emailPhone){
            check=false;
          setUser({...user,ePInputError:true});
          console.log("error");
        }else{
            if(!regX.phoneFilter.test(user.emailPhone)&&!regX.emailFilter.test(user.emailPhone)){
                setUser({...user,ePInputError:true});
                console.log("phone");
            }else{
                setUser({...user,ePInputError:false});
                console.log("okay") 
            }
         
        }
        if(!user.password){
            check=false;
            setUser({...user,passwordError:true});
        }else{
            setUser({...user,passwordError:false});  
        }
        return check;
    }
      const checkIpnut=()=>{
         if(check()){
          Alert.alert("Success","Values correct")
         }
      }
    return(
        <ScrollView style={{marginTop:100}}>
            <View style={{alignSelf:'center',marginBottom:20}}>
                <Text style={{fontSize:40,fontWeight:'bold',color:`${AppColor.primary}`}}>PML</Text>
                <Text style={{textAlign:'center'}}>LOGISTICS</Text>
                </View>
            <View>
          <InputComp mode="outlined" right={null}  label="Email or Phone number" placeholder="Input value"  style={style.emailPhone} error={user.ePInputError} secureText={false} setText={(e)=>{setUser({...user,emailPhone:e})}}/>
           {user.ePInputError&&(<Text style={{marginLeft:25,color:'red'}}>Invalid input.</Text>)}
            </View>
            <View>
          <InputComp mode="outlined" right={null}  label="Password" placeholder="Input value"  style={style.emailPhone} error={user.passwordError} secureText={true} setText={(e)=>{setUser({...user,password:e})}}/>
           {user.passwordError&&(<Text style={{marginLeft:25,color:'red'}}>Field Cannot be empty</Text>)}
            </View>
            <View style={{ display:'flex', flexDirection:'column',justifyContent:'center'}}>   
            <TouchableOpacity onPress={()=>checkIpnut()} style={{backgroundColor:`${AppColor.primary}`,borderWidth:1,width:Dimensions.get("screen").width/1.2,alignSelf:'center',marginTop:40,height:45,justifyContent:'center',borderRadius:3}}><Text style={{textAlign:'center',color:`${AppColor.forth}`,fontSize:15,fontWeight:'bold'}}>Login</Text></TouchableOpacity>
              <TouchableOpacity><Text style={{marginTop:20,textAlign:'center'}}>Forgot password?</Text></TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',marginTop:35}}>
                <Text style={{color:'#7F7F7F',marginRight:10}}>Don't have an account?</Text><TouchableOpacity><Text>Sign up</Text></TouchableOpacity>
            </View>
              </ScrollView>
    )
}
const style=StyleSheet.create({
    emailPhone:{
        margin:10,
    }
})
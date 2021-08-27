import React,{useState,useContext,useRef} from 'react';
import { StatusBar,View,Text,StyleSheet, TouchableOpacity, Dimensions, ScrollView,Alert,Switch} from 'react-native';
import InputComp from '../WorkerComp/InputComp';
import {AppColor,regX} from '../WorkerComp/AppColor';
import {apiRequest,api} from '../WorkerComp/Api';
import LoaderComp from '../WorkerComp/LoaderComp';
import { UserContext} from '../DataProvider/UserContext';
import ResetPassword from '../ResetPassword/ResetPassword';
import Custombtm from '../WorkerComp/Custombtm';
import { TextInput } from 'react-native-paper';
export default function Login({navigation}){
 const btmRef=useRef(null);
 const usercontext=useContext(UserContext);
 const{authUser,setAuthUser,user,setUser}=usercontext;
 const {navigate}=navigation;
 const [isOtpEnabled, setOtpIsEnabled] = useState(false);

 const toggleSwitch = () => setOtpIsEnabled(previousState => !previousState);
 //console.log(navigation);
 const [appOp,setAppOp]=useState({
     load:false,
     token:'',
     userid:'',
 })

 const pwdAlert=(e,m)=>{
     return Alert.alert(e,m);
 }
    const [appUser,setAppUser]=useState({
        type:'',
        emailPhone:'',
        password:'',
        emailPhoneError:false,
        passwordError:false,
        passwordSecure:true,
    }) 
    //(||)
    const validatePhone=()=>{
         if(regX.phoneFilter.test(appUser.emailPhone)){
        //   setUser({...user,type:'email'});
             return true;  
    }
}  
 

    const validateEmail=()=>{
        if(regX.emailFilter.test(appUser.emailPhone)){
        //   setUser({...user,type:'email'});
             return true;  
    }
   
}
const resetpwdFail=(e)=>{
   Alert.alert("Error",e);
   
}
const resetPwdSucc=(e)=>{
  Alert.alert("Success",e);
  
  btmRef.current.open();
}
   const userProfilePayload=(e)=>{
     console.log("danny2");
       setUser(e.data.payload);
       setAppOp({...appOp,userid:e.data.payload.id});
   }
   
   
const userProfileSuc=(e)=>{
   // console.log(e);
   if(isOtpEnabled){
       // request for the btm
       btmRef.current.open();

   }else{
       console.log("No otp");
    
       // should login 
      navigate('Dashboard');
   }
}
const userProfileFail=(e)=>{
 return Alert.alert("Error",e);
}
  const getUser=(e)=>{
   
   
   // To get the user 
   var userObject={
    method:'get',
    url:`${api.localUrl}${api.userProfile}`,
        headers:{
            Authorization:' Bearer ' + e,
          }
    
}
console.log(userObject);

apiRequest(userObject,(e)=>{setAppOp({...appOp,load:e})},(e)=>{userProfileSuc(e)},(e)=>{userProfileFail(e)},(e)=>{userProfilePayload(e)})

  }
const requestSuccess=(e)=>{
 //return  Alert .alert("Success",e);
 //
console.log(e);
}
const requestFailure=(e)=>{
   
return Alert.alert("Error",e?e:'Nothing returned');
}

const payload=(e)=>{
  
 console.log(e.data.payload.token);
    setAuthUser({...authUser,token:e.data.payload.token});
  
    if(e.data.payload.token){
        getUser(e.data.payload.token);
        setAppOp({...appOp,token:e.data.payload.token});
    }
}

    
    const check=()=>{
        var check=true;
      if(!appUser.emailPhone){
      check=false;
      setAppUser({...appUser,emailPhoneError:true})
      }else{
          //true
          // check
        if(validateEmail()){
             setAppUser({...appUser,emailPhoneError:false});
            // console.log(user);
             if(!appUser.password){
                check=false;
                setAppUser({...appUser,passwordError:true});
                
            }else{
                setAppUser((prevState)=>({...prevState,passwordError:false,emailPhoneError:false}));
            }
        }else if(validatePhone()){
              setAppUser((prevState)=>({...prevState,emailPhoneError:false}));
            // console.log(user.emailPhoneError,'phone');
            if(!appUser.password){
                check=false;
                setAppUser({...appUser,passwordError:true}); 
            }else{
                setAppUser((prevState)=>({...prevState,passwordError:false,emailPhoneError:false}));
            }
        }else{
            check=false;
            setAppUser({...appUser,emailPhoneError:true});
            console.log("error");
        }
      }
      

     
        return check;
    }
      const checkInput=()=>{
         if(check()){
       //   Alert.alert("Success","Values correct")
       var loginObject={
            method:"post",
            url:`${api.localUrl}${api.login}`,
            data:
            {
             
            }
       }
       // loginObject[`${user.type}`]=user.emailPhone;
        var type;
        if(validateEmail()){
            type="email";
        }
        if(validatePhone()){
            type="phone";
        }   
         
         if(isOtpEnabled){
             console.log("otp");
             loginObject.data['otp']=appUser.password;
         }else{
             console.log("No Otp");
             loginObject.data['password']=appUser.password;
            
         }
        // This section adds the property type to the loginObject
       // loginObject[type]=user.emailPhone;
      
       loginObject.data[type]=appUser.emailPhone;
         console.log(loginObject);
      apiRequest(loginObject,(e)=>{setAppOp({...appOp,load:e})},(e)=>{requestSuccess(e)},(e)=>{requestFailure(e)},(e)=>{payload(e)})
         }
      //  navigate('AppSection');
      }
    return(
        <ScrollView style={{marginTop:100}}>
             <StatusBar animated={true} backgroundColor={AppColor.third} />
            <View style={{alignSelf:'center',marginBottom:20}}>
                <Text style={{fontSize:40,fontWeight:'bold',color:`${AppColor.primary}`}}>PMT</Text>
                <Text style={{textAlign:'center'}}>LOGISTICS</Text>
                </View>
            <View>
          <InputComp mode="outlined" right={null}  label="Email or Phone number" placeholder="Input value"  style={style.emailPhone} error={appUser.emailPhoneError} secureText={false} setText={(e)=>{setAppUser({...appUser,emailPhone:e})}}/>
           {appUser.emailPhoneError&&(<Text style={{marginLeft:25,color:'red'}}>Invalid input.</Text>)}
            </View>
            <View>
          <InputComp mode="outlined" secureText={appUser.passwordSecure}  label="Password" placeholder="Input value"  style={style.emailPhone} error={appUser.passwordError} right={<TextInput.Icon name="eye"  onPress={()=>setAppUser({...appUser,passwordSecure:!appUser.passwordSecure})}/>} setText={(e)=>{setAppUser({...appUser,password:e})}}/>
           {appUser.passwordError&&(<Text style={{marginLeft:25,color:'red'}}>Field Cannot be empty</Text>)}
            </View>
            <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                <Text style={{fontWeight:'bold',margin:5}}>OTP?</Text>
      <Switch 
        style={{marginRight:4}}
        trackColor={{ false: `${AppColor.third}`, true:"#bbbbbb" }}
        thumbColor={isOtpEnabled ? `${AppColor.third}` : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isOtpEnabled}
      />
      
    </View>
            <View style={{ display:'flex', flexDirection:'column',justifyContent:'center'}}>   
            <TouchableOpacity onPress={()=>checkInput()} style={{backgroundColor:`${AppColor.primary}`,borderWidth:1,width:Dimensions.get("screen").width/1.2,alignSelf:'center',marginTop:40,height:45,justifyContent:'center',borderRadius:3}}><Text style={{textAlign:'center',color:`${AppColor.forth}`,fontSize:15,fontWeight:'bold'}}>Login</Text></TouchableOpacity>
              <TouchableOpacity onPress={()=>navigate('ForgotPassword')}><Text style={{marginTop:20,textAlign:'center'}}>Forgot password?</Text></TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',marginTop:35}}>
                <Text style={{color:'#7F7F7F',marginRight:10}}>Don't have an account?</Text><TouchableOpacity onPress={()=>navigate('UserRegister')}><Text>Sign up</Text></TouchableOpacity>
            </View>
            {appOp.load&&(<LoaderComp size={25} color={AppColor.third} />)}
           <Custombtm displayComp={()=><ResetPassword  token={authUser.token} showText={true} id={appOp.userid} setAlert={(e,m)=>pwdAlert(e,m)} succ={(e)=>resetPwdSucc(e)} load={(e)=>setAppOp({...appOp,load:e})} fail={(e)=>resetpwdFail(e)}/> } btmRef={btmRef} height={390}  />
               </ScrollView>
    )
}

const style=StyleSheet.create({
    emailPhone:{
        margin:10,
    }
})
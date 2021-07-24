import React,{useState} from 'react';
import { View,Text,StyleSheet ,ScrollView,TouchableOpacity} from 'react-native';
import LoaderComp from '../WorkerComp/LoaderComp';
import { AppColor } from '../WorkerComp/AppColor';
import InputComp from '../WorkerComp/InputComp';
import { TextInput } from 'react-native-paper';
export default function UserRegister(){
    const [appOperation,setAppOperation]=useState({
           load:false,
    })

    const[name,setName]=useState({
       nameError:false,
       name:'', 
    })

    const[lastName,setLastName]=useState({
        lastNameError:false,
        lastName:'',
    })
    
    const [email,setEmail]=useState({
        email:'',
        emailError:false,
    })
    const [phone,setPhone]=useState({
      phone:'',
      phoneError:false,
    })

    const [password,setPassword]=useState({
        password:'',
        passwordError:false,
        secure:true,
    })

    const [repassword,setRepassword]=useState({
        repassword:'',
        repasswordError:false,
        secure:true,
    })

    return(
<ScrollView>
        <View style={{justifyContent:'flex-start',alignItems:'flex-end',marginTop:45,marginRight:15}}>
        <Text style={{fontSize:20,fontWeight:'bold',color:`${AppColor.primary}`}}>PMT</Text>
        <Text style={{fontSize:8}} >LOGISTICS</Text>
        </View>
        <View>
          <InputComp mode="outlined" right={null}  label="First Name or Surname" placeholder="Input value"  style={style.name} error={name.nameError} secureText={false} setText={(e)=>{setName({...name,name:e})}}/>
          {name.nameError?(<Text style={{marginLeft:25,color:'red'}}>Invalid input.</Text>):null}
            </View>
            <View>
          <InputComp mode="outlined" right={null}  label="Last Name" placeholder="Input value"  style={style.name} error={lastName.lastNameError} secureText={false} setText={(e)=>{setLastName({...lastName,lastName:e})}}/>
          {lastName.lastNameError?(<Text style={{marginLeft:25,color:'red'}}>Invalid input.</Text>):null}
            </View>
            <View>
          <InputComp inputType="emailAddress" mode="outlined" right={null}  label="Email Address" placeholder="Input value"  style={style.name} error={email.emailError} secureText={false} setText={(e)=>{setEmail({...email,email:e})}}/>
          {email.emailError?(<Text style={{marginLeft:25,color:'red'}}>Invalid input.</Text>):null}
            </View>
            <View>
          <InputComp inputType="telephoneNumber" mode="outlined" right={null}  label="Phone" placeholder="Input value"  style={style.name} error={phone.phoneError} secureText={false} setText={(e)=>{setPhone({...phone,phone:e})}}/>
          {phone.phoneError?(<Text style={{marginLeft:25,color:'red'}}>Invalid input.</Text>):null}
        </View>
       
        <View>
          <InputComp inputType="password" mode="outlined" right={<TextInput.Icon name="eye"  onPress={()=>setPassword({...password,secure:!password.secure})}/>}  label="Password" placeholder="Input value"  style={style.name} error={password.passwordError} secureText={password.secure} setText={(e)=>{setPassword({...password,password:e})}}/>
          {password.passwordError?(<Text style={{marginLeft:25,color:'red'}}>Invalid input 8 or more characters.</Text>):null}
        </View>
        <View>
          <InputComp inputType="password" mode="outlined" right={<TextInput.Icon name="eye"  onPress={()=>setRepassword({...repassword,secure:!repassword.secure})}/>}  label="Re-enter Password" placeholder="Input value"  style={style.name} error={repassword.repasswordError} secureText={repassword.secure} setText={(e)=>{setRepassword({...repassword,repassword:e})}}/>
          {repassword.repasswordError?(<Text style={{marginLeft:25,color:'red'}}>Invalid input 8 or more characters.</Text>):null}
        </View>
        <TouchableOpacity onPress={()=>registerRequest()} style={style.proc}><Text style={{color:'#fff',textAlign:'center',fontSize:15}}>Proceed</Text></TouchableOpacity>
    {appOperation.load&&(<LoaderComp siz={25} color={AppColor.third}/>)}
    </ScrollView>
    )    
}
const style=StyleSheet.create({
    name:{
        margin:10
    }
    ,
    proc:{
     justifyContent:'center',
     margin:35,
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
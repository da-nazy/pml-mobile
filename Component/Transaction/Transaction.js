import React,{useContext, useEffect,useState} from 'react';
import { View,Text ,StyleSheet, ScrollView, Dimensions} from 'react-native';
import { AppColor } from '../WorkerComp/AppColor';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SearchByComp from '../WorkerComp/SearchByComp';
import TransComp from './TransComp';
import { api,apiRequest } from '../WorkerComp/Api';
import { UserContext } from '../DataProvider/UserContext';
import LoaderComp from '../WorkerComp/LoaderComp';
export default function Transaction(){
    const usercontext=useContext(UserContext);
    const{authUser}=usercontext;
    const[transactions,setTransactions]=useState(null);
    const[appDetails,setAppDetails]=useState({
        load:false,
    })
    useEffect(()=>{
    if(!transactions){
        getTransactions();
    }
    },[transactions])
   
    const transSuc=(e)=>{
        //console.log(e)
    }
    const transFail=(e)=>{
        console.log(e)
    }
    const transPayload=(e)=>{
       // console.log(e.data.payload.payload);
        setTransactions(e.data.payload.payload)
    }
    const getTransactions=()=>{
       var transObject={
           method:'get',
           url:`${api.localUrl}${api.transaction}`,
           headers:{
            Authorization:'Bearer ' + authUser.token,
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
          }
    
       }
       console.log(transObject);
          
         apiRequest(transObject,(e)=>{setAppDetails({...appDetails,load:e})},(e)=>{transSuc(e)},(e)=>{transFail(e)},(e)=>{transPayload(e)})
  
    }
  
    return(
        <View style={{backgroundColor:'#fff'}}>
              <View style={{flexDirection:'row',justifyContent:'center',padding:15,borderBottomWidth:1,borderBottomColor:`${AppColor.third}`}}><Icon name="wallet" size={17} color={AppColor.third} /><Text style={{fontWeight:'bold',textAlign:'center',fontSize:15,marginLeft:5}}>Transactions</Text></View>
            <SearchByComp func={()=>console.log("okay")}/>
            <ScrollView style={{height:Dimensions.get('screen').height/1.31}}>
            {transactions&&transactions.map((e,i)=>{
              if(e.type==="D"){
                return(       
           <TransComp key={i} iconName="long-arrow-alt-down" color={AppColor.green} transText="Cash deposit" transTime={e.createdAt.split('T')[0]} transAmount={e.amount} func={()=>console.log("Okay")}/>
           
                  )
             }else if (e.type==="T"){
               return  <TransComp  key={i} iconName="long-arrow-alt-up" color="red" transText={e.narration} transTime={e.createdAt.split('T')[0]} transAmount={`-${e.amount}`} func={()=>console.log("Okay")}/>
             
             }
            })}
        </ScrollView>
        {appDetails.load&&<LoaderComp size={30} color={AppColor.third}/>}
        </View>
    )
}

const style=StyleSheet.create({

})
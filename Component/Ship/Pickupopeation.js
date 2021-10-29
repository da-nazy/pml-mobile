import React,{useState,useEffect,useContext} from 'react';
import {View,Text, TouchableOpacity,StyleSheet, Dimensions,StatusBar,Alert,ScrollView} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { AppColor } from '../WorkerComp/AppColor';
import {api,apiRequest,pickupStatusConstant} from '../WorkerComp/Api';
import { IconComp } from '../WorkerComp/ExternalFunction';
const {width,height}=Dimensions.get("window");
import { UserContext } from '../DataProvider/UserContext';
import LoaderComp from '../WorkerComp/LoaderComp';
export default function Pickupoperation({pickup}){
    const usercontext=useContext(UserContext);
    const{user,authUser}=usercontext;
    console.log(pickup.status);
     
    // If pickup is pending do nothing
      
   

  const [appDetails,setAppDetails]=useState({
       load:false,
      accepted:null,
      collected:null,
      dispatched:null,
      delivered:null,
  })
  const[accepted,setAccepted]=useState(null);
  const[currentPosition,setCurrentPosition]=useState(0);

    const labels = ["PENDING","ASSIGNED","COLLECTED","DISPATCHED","DELIVERED"];

     const checkPickupStatus=()=>{
         console.log("test");
     }

    const  [data,setData]=useState([
        {   
             id:1,
            name:'PENDING',
            accepted:null,
            message:'Pickup assigned to a dispatcher?',
            view:<View style={{flexDirection:'row'}}><TouchableOpacity onPress={()=>checkPickupStatus()} style={{borderWidth:1,height:28,width:70,justifyContent:'center',borderRadius:2,margin:2,backgroundColor:AppColor.third,borderColor:AppColor.third}}><Text style={{textAlign:'center',color:'#fff'}}>REFRESH</Text></TouchableOpacity></View>,
        },
        {  
             id:2,
            name:'ASSIGNED',
            accepted:null,
            message:'Assigned pickup accepted by a dispatcher?',
            view:<TouchableOpacity onPress={()=>checkPickupStatus()} style={{borderWidth:1,height:28,width:70,justifyContent:'center',borderRadius:2,margin:2,backgroundColor:AppColor.third,borderColor:AppColor.third}}><Text style={{textAlign:'center',color:'#fff'}}>REFRESH</Text></TouchableOpacity>
        },
        {   
            id:3,
            name:'COLLECTED',
            accepted:null,
            message:'Have the pickup been collected?',
            view:<TouchableOpacity onPress={()=>collectPickup()} style={{borderWidth:1,height:28,width:70,justifyContent:'center',borderRadius:2,margin:2,backgroundColor:AppColor.third,borderColor:AppColor.third}}><Text style={{textAlign:'center',color:'#fff'}}>YES</Text></TouchableOpacity>
        },
        {
            id:4,
            name:'DISPTACHED',
            accepted:null,
            message:'Have pickup been dispatched?',
            view:<TouchableOpacity onPress={()=>update(4)} style={{borderWidth:1,height:28,width:70,justifyContent:'center',borderRadius:2,margin:2,backgroundColor:AppColor.third,borderColor:AppColor.third}}><Text style={{textAlign:'center',color:'#fff'}}>REFRESH</Text></TouchableOpacity>
        },
        {
            id:5,
            name:'DELIVERED',
            accepted:null,
            message:'Confirm if you have received the pickup?',
            view:<TouchableOpacity onPress={()=>update(4)} style={{borderWidth:1,height:28,width:70,justifyContent:'center',borderRadius:2,margin:2,backgroundColor:AppColor.third,borderColor:AppColor.third}}><Text style={{textAlign:'center',color:'#fff'}}>YES</Text></TouchableOpacity>
        }
    ]);


 
    const assignedPickup=()=>{
        switch(pickup.status){
            case "ASSIGNED":
                const newItems=[...data];
                newItems.map((e,i)=>{
                  if(e.id===1){
                   console.log(i);
                   newItems[i].accepted=true;
                   newItems[i].message="Pickup has been asigned to a dispatcher";
                   delete newItems[i].view;
                   setCurrentPosition(1);
                   setData(newItems);
                   
                  }
                })
                break;

                case "ACCEPTED":
                    const newItems1=[...data];
                    newItems1.map((e,i)=>{
                        if(e.id===1){
                            newItems1[i].accepted=true;
                            newItems1[i].message="Pickup has been asigned to a dispatcher";
                            delete newItems1[i].view;
                        }
                        if(e.id===2){
                            newItems1[i].accepted=true;
                            newItems1[i].message="Pickup has been accepted by a dispatcher";
                            delete newItems1[i].view; 
                        }
                        setCurrentPosition(2);
                        setData(newItems1);
                    })
                    break;

            case "COLLECTION":
                const collItems=[...data];
                collItems.map((e,i)=>{
                    if(e.id===1){
                        collItems[i].accepted=true;
                        collItems[i].message="Pickup has been asigned to a dispatcher";
                        delete collItems[i].view;
                    }
                    if(e.id===2){
                        collItems[i].accepted=true;
                        collItems[i].message="Pickup has been accepted by a dispatcher";
                        delete collItems[i].view; 
                    }
                    if(e.id===3){
                        collItems[i].accepted=true;
                        collItems[i].message="You have confirmed pickup collection";
                        delete collItems[i].view;
                    }
                    setCurrentPosition(3);
                    setData(collItems);
                })
                break;

        }
    }

   useEffect(()=>{
    assignedPickup();
   },[])
    

    //question,check
   
     const acceptOp=(idx)=>{
     // set Accepted:true
    //set appDetails.Accepted to true;
    //Remove the buttons
    // Change the text to : You have accepted to attend to the pickup.
      const newItems=[...data];
      newItems.map((e,i)=>{
         if(e.id===idx){
         newItems[i].accepted=true;
         newItems[i].message="You have accepted to attend to the pickup";
         delete newItems[i].view;
         setCurrentPosition(1);
         setData(newItems);
        // console.log("upate")
         }
      })
     }

     const dispatchOp=(idx)=>{
         // check if collected
         // change change accepted to true
         // Remove the buttons
         // Change text to : Collected Pickup has been dispatched .
         console.log(idx);
         console.log(data[1].accepted,data[1].name);
         if(!data[1].accepted&&!data[1].name=="COLLECTED"){
             Alert.alert("Caution","Pickup hasn't been collected yet!");
         }else{
             const newItems=[...data];
             newItems.map((e,i)=>{
               if(e.id===idx){
                   newItems[i].accepted=true;
                   newItems[i].message="Collected pickup has been dispatched.";
                   delete newItems[i].view;
                   setCurrentPosition(3);
                   setData(newItems);
               }
             })
         }

     }

     const collectPickup=()=>{
         Alert.alert("Caution","Have the dispatcher collected the pickup?",[
             {
                 text:"Yes",
                 onPress:()=>pickupCollection()
             },
             {
                 text:"Cancel",

             }
         ])
     }
     const collectPickupPayload=(e)=>{
        console.log(e);
     }
     const failFunc=(e)=>{
        Alert.alert("Message",e);
     }
     const succFunc=(e)=>{
         console.log(e);
     }

    const pickupCollection=()=>{
        var collectObject={
         method:'put',
         url:`${api.localUrl}${api.pmlPickups}/${api.pickupStatus[0]}/${pickup.id}`,
         headers:{
            Authorization:' Bearer ' + authUser.token,
            'Cache-Control': 'no-cache',
          }
        }

        console.log(collectObject);
       apiRequest(collectObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>collectPickupPayload(e));

    }

const update=(idx)=>{
    // data.map(()=>{})
    //idx is object id not array index id search for the array index and display
    const newItems=[...data];
    console.log(idx);
   //console.log(newItems[idx]);
   newItems.map((e,i)=>{
      if(e.id===idx){
         // console.log(i);
        //console.log(newItems[i]);
          newItems[i].accepted=true;
        //  delete newItems[i].message;
        //  delete newItems[i].view;
          //console.log(newItems[i]);
          setData(newItems);
      }
   })
   
    
}


    const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize:30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: '#fe7013',
        stepStrokeWidth: 3,
        stepStrokeFinishedColor: '#fe7013',
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: '#fe7013',
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: '#fe7013',
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 13,
        currentStepIndicatorLabelFontSize: 13,
        stepIndicatorLabelCurrentColor: '#fe7013',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        labelColor: '#999999',
        labelSize: 13,
        currentStepLabelColor: '#fe7013',
        
      }
    return(
    <ScrollView  contentContainerStyle={style.container}>
         <StatusBar animated={true} backgroundColor={AppColor.third} />
       <StepIndicator
         customStyles={customStyles}
         currentPosition={currentPosition}
         labels={labels}
         stepCount={5}
         direction='vertical'
         renderLabel={({position,label,currentPosition,stepStatus})=>{
            return (
                <View key={position} style={{width:width-100,marginTop:30}}>
                    <View style={{flexDirection:'row',justifyContent:"space-between"}}>
                        <Text style={{fontSize:15,fontWeight:'700'}}>{data[position].name}</Text>
                        <View style={{width:20,height:20,borderWidth:1,borderRadius:10,justifyContent:'center',borderColor:AppColor.third}}>
                            {/**   {IconComp("boxes",{width:70,height:70,textAlign:"center"},50,AppColor.third)}*/}
                            {IconComp (data[position].accepted?'check':'question',{textAlign:'center'},10)}
                            </View></View>
                    <Text style={{padding:5}}>{data[position].message}</Text>
                    {data[position].view}
                </View>
            )
         }}
    />
     {appDetails.load&&<LoaderComp size={25} color={AppColor.third}/>}
    </ScrollView>
    )
}

const style=StyleSheet.create({
    container:{
     height:height-50,
     width:width-50,
    padding:5, 
    justifyContent:'center',
    alignSelf:'center',
    borderRadius:5,
     flexDirection:'column',
     elevation:10,
     backgroundColor:'#fff'
    },
   dContainer:{

   }
})
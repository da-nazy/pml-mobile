import React,{useState,useContext} from 'react';
import {View,StyleSheet, TouchableOpacity,ScrollView,Text,Alert} from 'react-native';
import { IconComp,head,parcelIdComp,addParcelHead} from '../WorkerComp/ExternalFunction';
import { AppColor } from '../WorkerComp/AppColor';
import InputComp from '../WorkerComp/InputComp';
import LoaderComp from '../WorkerComp/LoaderComp';
import {api,apiRequest} from '../WorkerComp/Api';
import { UserContext } from '../DataProvider/UserContext';
export default function ViewPickup({pickup}){
    const usercontext=useContext(UserContext);
    const{user,authUser}=usercontext;

    const [parcel,setParcel]=useState(null);
    const[appDetails,setAppDetails]=useState({
        edit:false,
        load:false,
    })

    const removeParcelFromPickup=(e)=>{
      Alert.alert("Caution",`Remove parcel with id ${e} from pickup?`,[
        {
        text:'Yes',
        onPress:()=>removeParcel(e),
      },
      {
        text:'Cancel',
        onPress:()=>console.log("Cancle Clicked")
      }
    ]);
    }

    const addParcelToPickup=(e)=>{
      Alert.alert("Add Parcel",`Add Parcel with code ${e} to Pickup?`,[
        {
          text:'Yes',
          onPress:()=>addParcel(e),
        },
        {
          text:'Cancle',
          onPress:()=>console.log("Cancel"),
        }
      ])
    }
      const removeParcelPayload=(e)=>{
       console.log(e);
      }

      const addParcelPayload=(e)=>{
        console.log(e)
      }

      const addParcel=(c)=>{
        var addParcelObject={
          method:"put",
         url:`${api.localUrl}${api.addParcelToPickup}${pickup.id}`,
         headers:{
          Authorization:' Bearer ' + authUser.token,
          'Cache-Control': 'no-cache',
        },
        data:{
       pmlParcel:`${c}`
        },
  
       }
       console.log(addParcelObject);
     apiRequest(addParcelObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>addParcelPayload(e));
  
      }

    const removeParcel=(c)=>{
      var removeParcelObject={
        method:"put",
       url:`${api.localUrl}${api.removeParcelFromPickup}${pickup.id}`,
       headers:{
        Authorization:' Bearer ' + authUser.token,
        'Cache-Control': 'no-cache',
      },
      data:{
     pmlParcel:`${c}`
      },

     }
     console.log(removeParcelObject);
   apiRequest(removeParcelObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>removeParcelPayload(e));

    }

    const succFunc=(e)=>{
     console.log(e);
    }

    const failFunc=(e)=>{
      console.log(e);
    }

    const getUserParcelPayload=(e)=>{
    if(e.data.payload.length!=0){
    setParcel(e.data.payload);
    }else{
      Alert.alert("Empty Parcel","No parcels created yet!",[
        { 
          text:"Create Parcel",
          onPress:()=>console.log("Create Parcel"),

        },
        {
          text:"Cancel",
          onPress:()=>console.log("Cancel"),

        }
      ]);
    }
    }

    const getUserParcels=()=>{
      var userParcelObect={
           method:"get",
          url:`${api.localUrl}${api.userParcels}${user.id}&pmlPickup=null`,
          headers:{
           Authorization:' Bearer ' + authUser.token,
           'Cache-Control': 'no-cache',
         }
        }
        console.log(userParcelObect);
        apiRequest(userParcelObect,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>getUserParcelPayload(e));
  
     }

    return (
        <View>
            <ScrollView>
              <View
                style={{
                  width: "25%",
                  marginBottom:20,
                  height: 50,
                  width: 50,
                  marginTop:25,
                }}
              > 
              <View style={{flexDirection:'row'}}>
                {IconComp("boxes",{width:70,height:70,textAlign:"center"},50,AppColor.third)}
            
                   </View>
              </View>
              <View style={{margin:10}}> 
        
        <View style={{marginTop:5}}>
        <InputComp
          inputType="Code:"
          value={pickup.code?pickup.code:''}
          mode="outlined"
          right={null}
          label="Pickup Code:"
          style={style.name}
          secureText={false}
          disabled={true} 
        />
       </View>

       <View style={{marginTop:5}}>
        <InputComp
          inputType="CreatedAt:"
          value={pickup.createdAt?pickup.createdAt.split("T")[0].toString():''}
          mode="outlined"
          right={null}
          label="Date:"
          style={style.name}
          secureText={false}
          disabled={true} 
        />
       </View>

       <View style={{marginTop:5}}>
        <InputComp
          inputType="Description:"
          value={pickup.description?pickup.description:''}
          mode="outlined"
          right={null}
          label="Description:"
          style={style.name}
          secureText={false}
          disabled={true} 
        />
       </View>

       <View style={{marginTop:5}}>
        <InputComp
          value={pickup.deliveryAddress?pickup.deliveryAddress:''}
          mode="outlined"
          right={null}
          label="Delivery Address:"
          placeholder="Input  Delivery Address"
          style={style.name}
          secureText={false}
          disabled={!appDetails.edit}
        />  
      </View>


      <View style={{marginTop:5}}>
        <InputComp
          value={pickup.locationFrom.address?pickup.locationFrom.address:''}
          mode="outlined"
          right={null}
          label="Sender Address:"
          placeholder="Input value"
          style={style.name}
          secureText={false}
          disabled={!appDetails.edit}
        />  
      </View>

      <View style={{marginTop:5}}>
        <InputComp
          value={pickup.recipientPhone?pickup.recipientPhone:''}
          mode="outlined"
          right={null}
          label="Recipient Phone:"
          placeholder="Input  phone"
          style={style.name}
          secureText={false}
          disabled={!appDetails.edit}
        />  
      </View>
      <View style={{marginTop:5}}>
        <InputComp
          value={pickup.senderPhone?pickup.senderPhone:''}
          mode="outlined"
          label="Sender Phone:"
          placeholder="Input  phone"
          style={style.name}
          secureText={false}
          disabled={!appDetails.edit}
        />  
      </View>

      <View style={{marginTop:5}}>
        <InputComp
          value={pickup.vehicleType?pickup.vehicleType:''}
          mode="outlined"
          right={null}
          label="Vehicle Type:"
          placeholder="Input Vehicle Type"
          style={style.name}
          secureText={false}
          disabled={!appDetails.edit}
        />  
      </View>
      <View style={{marginTop:10}}>
        {head("Parcels In Pickup")}
        {pickup.pmlParcels?pickup.pmlParcels.map((e,i)=>{
          return(
            parcelIdComp(e,i,(e)=>removeParcelFromPickup(e),"trash")
          )
        }):null}
      </View>
      <View style={{marginTop:10}}>
        {addParcelHead("Add Parcel To Pickup",()=>getUserParcels())}
        {parcel&&parcel.map((m,i)=>{
        return(
          parcelIdComp(m.name,i,(e)=>addParcelToPickup(e),"plus",m)
          )
       })}
      </View>
      
      </View>
      <View style={{height:80,flexDirection:'row',justifyContent:'space-evenly',padding:5}}>
          <TouchableOpacity style={style.acBtn}><Text style={style.actBtnText}>DELETE</Text></TouchableOpacity>
          <TouchableOpacity style={style.acBtn}><Text style={style.actBtnText}>PAY</Text></TouchableOpacity>     
      </View>

            </ScrollView>
          {appDetails.load&&(<LoaderComp size={25} color={AppColor.third}/>)}
        </View>
    )
}

const style=StyleSheet.create({
   name:{
    height:50,
    marginTop:15,
    width:'100%',
   },
   actBtnText:{
    textAlign:'center',
    fontWeight:'bold',
    color:'#fff'
   },
  acBtn:{
    width:'35%',
    height:40,
    borderRadius:5,
    justifyContent:'center',
    backgroundColor:`${AppColor.third}`,
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
  }
})
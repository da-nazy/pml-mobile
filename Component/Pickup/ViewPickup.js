import React,{useState,useContext} from 'react';
import {View,StyleSheet, TouchableOpacity,ScrollView,Text,Alert} from 'react-native';
import { IconComp,head,parcelIdComp,addParcelHead} from '../WorkerComp/ExternalFunction';
import { Picker } from "@react-native-community/picker";
import { AppColor } from '../WorkerComp/AppColor';
import InputComp from '../WorkerComp/InputComp';
import LoaderComp from '../WorkerComp/LoaderComp';
import {api,apiRequest,ngStates,symbols} from '../WorkerComp/Api';
import { UserContext } from '../DataProvider/UserContext';
import { TextInput } from 'react-native-paper';
export default function ViewPickup({pickup,onPickupChange}){
    const usercontext=useContext(UserContext);
    const{user,authUser,userWallet}=usercontext;
    // console.log(userWallet);
    const [parcel,setParcel]=useState(null);
    const[stateFrom,setStateFrom]=useState(null);
    const[stateTo,setStateTo]=useState(null);
    const[walletPin,setWalletPin]=useState({
      pin:'',
      pinSecure:true,
      pinError:false,
    });
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
       console.log(e.data.message);
       onPickupChange();
      }

      const addParcelPayload=(e)=>{
        console.log(e);
        onPickupChange();
            
      }
      
      const viewParcel=()=>{
        
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
      //console.log(e);
      Alert.alert("Error",e)
    }
   
    const makePaymentPayload=(e)=>{
     console.log(e);
     if(e.data.payload.status==='SUCCESS'){
      Alert.alert("Message","Transaction Successfull",[{
        text:'Ok',
        onPress:()=>confirmPayment()
      }])
     }
     
    }

    const confirmPaymentPayload=(e)=>{
      console.log(e);
      if(e.data.success){
        Alert.alert("Success","Payment Verified");
        onPickupChange();

      }
    }
   const removePickupCaution=()=>{
     Alert.alert("Caution:","Are you sure that you want to remove the pickup?",[
       {
       text:"Proceed",
       onPress:()=>{
         removePickup();
       }
     },
     {
       text:"Cancle",
       onPress:()=>{
         console.log("Don't remove pickup");
       }
     }
    ])
   }
    const pinCheck=()=>{
      
       if(!walletPin.pin){
         setWalletPin({...walletPin,pinError:true});
         console.log("check1")
       }
       else{
        console.log("check")
        setWalletPin({...walletPin,pinError:false},makePayement());
        
       }
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
    const deletePickupPayload=(e)=>{
      if(e.data.success){
        Alert.alert("Success",`Pickup has been removed ${e.data.message}`,[{
          text:"Okay",
          onPress:()=>{onPickupChange()}
        }])
      }
    }
    
    const deletePickup=()=>{
      //Alert.alert("")
      //check if parcels in the pickup
      if(pickup.pmlParcels.length>0){
        Alert.alert("Caution:","You can't delete pickup with parcels");
      }else{
        removePickupCaution();
      }
    }

    const removePickup=()=>{
       var deletePickupObject={
        method:'PATCH',
        url:`${api.localUrl}${api.deletePickup}${pickup.id?pickup.id:''}`,
        headers:{
          Authorization:' Bearer ' + authUser.token,
        }
      }
      console.log(deletePickupObject);
      apiRequest(deletePickupObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>deletePickupPayload(e));
 
    }

     const isRemovePickup=()=>{
       Alert.alert("Are you sure that you want delete the pickup",[
         {
           text:"Proceed",
           onPress:removePickup(),
         },
         {
           text:"Cancel",
           onPress:consle.log("Cancel Pickup")
         }
       ])
     }
    const pickUpPayment=()=>{
     // console.log(pickup.amount)
      try{
        if(pickup.amount.toString()){
         // console.log(Number.parseFloat(pickup.amount));
          Number.parseFloat(pickup.amount)==0?Alert.alert("Message","No parcel in the pickup!"):
          
      Alert.alert("Pickup Payment:",`The Pickup Cost is: ${symbols.naira}${pickup?pickup.amount:'0'} `,[
        {
          text:"Proceed",
          onPress:()=>pinCheck(),
      },
      {
        text:"Cancle",
        onPress:()=>console.log("Cancel")
      }
    ]);
        }else{
          console.log("nothing");
        }

      }catch(error){
        console.log(error.message);
      }

    }

     const confirmPayment=()=>{
       var confirmPaymentObject={
         method:'get',
         url:`${api.localUrl}${api.verifyPayment}/${pickup.code?pickup.code:""}`,
         headers:{
          Authorization:' Bearer ' + authUser.token,
          'Cache-Control': 'no-cache',
        }
       }
       console.log(confirmPaymentObject);
       apiRequest(confirmPaymentObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>confirmPaymentPayload(e));
   
     }

    const makePayement=()=>{
      var paymentObject={
        method:'post',
        url:`${api.localUrl}${api.makePayment}`,
        headers:{
         Authorization:' Bearer ' + authUser.token,
         'Cache-Control': 'no-cache',
       },
       data:{
        trxref:pickup.trxref?pickup.trxref:'',
        walletFrom:userWallet.wallet?userWallet.wallet:'',
        walletTo:api.pmlWallet,
        narration:"Customer Pickup",
        pin:walletPin.pin,
        type:"L",
        amount:pickup.amount?pickup.amount:'',
         }
       
      }
      console.log(paymentObject);
      apiRequest(paymentObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>makePaymentPayload(e));
  
  }

    const getUserParcels=()=>{
      var userParcelObect={
           method:"get",
          url:`${api.localUrl}${api.userParcels}${user.id}&pmlPickup=null&populate=stateFrom,stateTo`,
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

      

      <View style={{ borderWidth: 1, borderRadius: 2,borderColor:`${appDetails.edit?'#000':'#bbb'}`,marginTop:10 ,width:appDetails.edit?'90%':'100%'}}>
            <Picker
            
              enabled={appDetails.edit}
              selectedValue={stateFrom}
              onValueChange={(itemValue, itemIndex) =>
                //  setCategory({ ...category, stateId: itemValue })
                setStateFrom(itemValue)
              }
              style={{ borderWidth: 1, width: "100%",color:`${appDetails.edit?'#000':'#bbb'}`}}
            >
              <Picker.Item label={appDetails.edit?"StateFrom":pickup.stateFrom&&pickup.stateFrom.name} value="" />
              {ngStates &&
                ngStates.map((e, i) => {
                  return <Picker.Item key={i} label={e.name} value={e.id} />;
                })}
            </Picker>      
         </View>

       <View style={{ borderWidth: 1, borderRadius: 2,borderColor:`${appDetails.edit?'#000':'#bbb'}`,marginTop:10 ,width:appDetails.edit?'90%':'100%'}}>
            <Picker
            
              enabled={appDetails.edit}
              selectedValue={stateTo?stateTo:pickup.stateTo}
              onValueChange={(itemValue, itemIndex) =>
                //  setCategory({ ...category, stateId: itemValue })
                setStateTo(itemValue)
              }
              style={{ borderWidth: 1, width: "100%",color:`${appDetails.edit?'#000':'#bbb'}`}}
            >
              <Picker.Item label={appDetails.edit?"StateTo":pickup.stateTo&&pickup.stateTo.name} value="" />
              {ngStates &&
                ngStates.map((e, i) => {
                  return <Picker.Item key={i} label={e.name} value={e.id} />;
                })}
            </Picker>      
         </View>

      <View style={{marginTop:5}}>
        <InputComp
          mode="outlined"
          right={null}
          label="Wallet Pin:"
          placeholder="Input value"
          style={style.name}
          secureText={walletPin.pinSecure}
          setText={(e)=>setWalletPin({...walletPin,pin:e})}
          error={walletPin.pinError}
          right={<TextInput.Icon name="eye"  onPress={()=>setWalletPin({...walletPin,pinSecure:!walletPin.pinSecure})}/>}
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
          <TouchableOpacity onPress={()=>deletePickup()} style={style.acBtn}><Text style={style.actBtnText}>DELETE</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>pickUpPayment()} style={style.acBtn}><Text style={style.actBtnText}>PAY</Text></TouchableOpacity>     
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
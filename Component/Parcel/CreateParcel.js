import React, { useState, useEffect, useContext,useCallback,useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import { AppColor,numberCheck} from "../WorkerComp/AppColor";
import Icon from "react-native-vector-icons/FontAwesome5";
import InputComp from "../WorkerComp/InputComp";
import { Picker } from "@react-native-picker/picker";
import { UserContext } from "../DataProvider/UserContext";
import { IconComp, packaging,sortAlphabet,validatePhone,wait} from "../WorkerComp/ExternalFunction";
import DateTimePicker from "@react-native-community/datetimepicker";
import { api, apiRequest,ngStates,deliveryType,meansOfId} from "../WorkerComp/Api";
import LoaderComp from "../WorkerComp/LoaderComp";
import Custombtm from "../WorkerComp/Custombtm";
import AddItems from "./AddItems";
import { StackActions } from "@react-navigation/native";
import UserRegister from '../Register/UserRegister';

export default function CreateParcel({navigation}) {
 
  const usercontext = useContext(UserContext);
  const {
    userLoc,
    senderLoc,
    userPickupDetails,
    user,
    authUser,
   // setUserLoc,
   // setSenderLoc,
    //setuserPickupDetails,
  } = usercontext;
   
 
  const[uLoc,setULoc]=useState('');
  const[sLoc,setSLoc]=useState(null);
  const[uPickDetail,setUPickDetail]=useState('');
  const[u,setU]=useState('');
  const [aU,setAu]=useState('');
  
  useEffect(()=>{
    setULoc(userLoc);
    setSLoc(senderLoc);
    setUPickDetail(userPickupDetails);
    setU(user);
    setAu(authUser);
    return()=>{
      setULoc('');
      setSLoc('');
      setUPickDetail('');
      setU('');
      setAu('');
    }
  },[])

  const addItemRef=useRef(null);
  const regUser=useRef(null);
  const[item,setItem]=useState([]);
  const [dateshow, setDateShow] = useState(false);
  const [appDate, setAppDate] = useState(new Date(1598051730000));
  const [clean,setClean]=useState(false);
  var currentDate=new Date();
  const[terminals,setTerminals]=useState(null);

  const[deliveryTerminal,setDeliveryTerminal]=useState(null);
  const[pickupTerminal,setPickupTerminal]=useState(null);

  const[selectedTerminal,setSelectedTerminal]=useState({
    error:false,
    id:''
  });
  const[estimateBill,setEstimateBill]=useState({
    bill:null,
    error:false,
  })
  const [delivery_Type,setDelivery_Type]=useState({
     name:'',
     error:'',
  })
  const [vehicleType,setVehicleType]=useState({
       name:'',
       error:'',
  })
  const[worth,setWorth]=useState({
    worth:'',
    worthError:'',
  })
  const [appDetails, setAppDetails] = useState({
    load: false,
    categoryId: null,
    packageId: null,
    stateOp: "",
    userValid:null,
    receiverObjectId:'',
    refresh:false,

  });
  const[currentItem,setCurrentItem]=useState(null);

  const [category, setCategory] = useState(null);

  const [name, setName] = useState({
    name: "",
    nameError: false,
  });

  const [desc, setDesc] = useState({
    desc: "",
    descError: false,
  });

  const [stateFrom, setStateFrom] = useState({
    stateFromId: "",
  });

  const [stateTo, setStateTo] = useState({
    stateToId: "",
  });
 
  const [id, setId] = useState({
    id: "",
    idError: false,
  });
  const [expectedDate, setExpectedDate] = useState({
    date: "",
    dateError: false,
  });
  const [depatureDate, setDepatureDate] = useState({
    date: "",
    dateError: false,
  });

  const succFunc = (e) => {
    console.log(e);
  };
  const failFunc = (e) => {
    Alert.alert("Error", e);
  };
  const [terminalTo,setTerminalTo]=useState({
    error:false,
    id:''
  })

  useEffect(()=>{
 if(stateFrom.stateFromId){
  getPickupTerminals(stateFrom.stateFromId);
 }
  },[stateFrom.stateFromId]);

  useEffect(()=>{
  if(stateTo.stateToId){
    getDeliveryTerminals(stateTo.stateToId);
  }
  },[stateTo.stateToId]);


  const terminalPayLoad=(e)=>{
  var temp=[];
 if(e.data.payload.length){
    e.data.payload.map((e,i)=>{
     if(e.subsidiary==="PML"){
       
       temp.push({name:e.name,id:e.id})
     }
    })
    setTerminals(sortAlphabet(temp))
 }
  }

  const pickupTerminalPayLoad=(e)=>{
    var temp=[];
    if(e.data.payload.length){
       e.data.payload.map((e,i)=>{
        if(e.subsidiary==="PML"){
          
          temp.push({name:e.name,id:e.id})
        }
       })
       setPickupTerminal(sortAlphabet(temp))
    }
  }

  const deliveryTerminalPayLoad=(e)=>{
    var temp=[];
    if(e.data.payload.length){
       e.data.payload.map((e,i)=>{
        if(e.subsidiary==="PML"){
          
          temp.push({name:e.name,id:e.id})
        }
       })
       setDeliveryTerminal(sortAlphabet(temp))
    }
  }



     useEffect(()=>{
       return()=>{
         setWorth({...worth,worth:''});
          setCurrentItem(null);
          setClean(false)
       }
     },[])

     useEffect(()=>{
      getTerminals()
     },[])
  const userCheckPayload=(e)=>{
    
    if(e.data.payload.length!==0){
       setAppDetails({...appDetails,userValid:'check',receiverObjectId:e.data.payload.id});
    }else{
      setAppDetails({...appDetails,userValid:'times'});
      Alert.alert("USER NOT FOUND","Create user!",[
        {
          onPress:()=>regUser.current.open(),
          text:'Create',
        }
      ]);
    }
  }
  const CleanUp=()=>{
  return ( <ActivityIndicator animating={true} color={AppColor.third}
    size={"large"}
    style={{
      width:'120%',height:'120%',
       backgroundColor:'rgba(0,0,0, 0.5)',
       position:'absolute',
       zIndex:22,
      
      
    }}
   />)
  }
  const onRefresh=useCallback(()=>{
   setAppDetails({...appDetails,refresh:true});
   getCategory();
   getTerminals();
  wait(200).then(()=>setAppDetails({...appDetails,refresh:false}))
  })

  const getTerminals=()=>{
    var requestObject={
      method:'get',
      url:`${api.localUrl}${api.pmlTerminal}`,
      data:{}
    }
     apiRequest(requestObject,(e)=>(e),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>terminalPayLoad(e));
  }

  const getDeliveryTerminals=(deliveryState)=>{
    var requestObject={
      method:'get',
      url:`${api.localUrl}${api.pmlTerminal}?state=${deliveryState}`,
      data:{}
    }
     apiRequest(requestObject,(e)=>(e),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>deliveryTerminalPayLoad(e));
  }

  const getPickupTerminals=(pickupState)=>{
    var requestObject={
      method:'get',
      url:`${api.localUrl}${api.pmlTerminal}?state=${pickupState}`,
      data:{}
    }
     apiRequest(requestObject,(e)=>(e),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>pickupTerminalPayLoad(e));
  }



  const sortState=(nStates)=>{
  var states=[];
     nStates.map((e,i)=>{
       states.push({name:e.name,id:e.id});
     })
      return sortAlphabet(states);
  }
  sortState(ngStates);
  const getCategoryPayload = (e) => {
   // (e.data.payload.sort());
   var arr=[];
    e.data.payload.map((e,i)=>{
        //var obj={e.name,e.id}

         arr.push({name:e.name,id:e.id});

    }) 
    setCategory(sortAlphabet(arr));
  };
  const[recpientPhoneEmail,setRecipientPhoneEmail]=useState({
    emailPhone:'',
    emailPhoneError:false,
  })

  const ErrorMsg=({msg})=>{
    return<Text style={{marginLeft:10,color:'red'}}>{msg}</Text>
  }

  const userVerification=()=>{
    var check=true;
    if(!recpientPhoneEmail.emailPhone){
      setRecipientPhoneEmail({...recpientPhoneEmail,emailPhoneError:true});
      check=false;
    }else{
     // setRecipientPhoneEmail({...recpientPhoneEmail,emailPhoneError:false});
      if(validatePhone(recpientPhoneEmail.emailPhone)){
       
        setRecipientPhoneEmail({...recpientPhoneEmail,emailPhoneError:false});
      }else{
        check=false;
        setRecipientPhoneEmail({...recpientPhoneEmail,emailPhoneError:true});
      }
    }
    return check;
  }

  const isUserValid=()=>{
    setAppDetails({...appDetails,userValid:null});
    if(userVerification()){
      var userCheckObject={
        method:"get",
        url:`${api.localUrl}${api.checkUser}phone=${recpientPhoneEmail.emailPhone}`,
        headers:{
         Authorization:' Bearer ' + authUser.token,
       }
      }
   

      apiRequest(userCheckObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>userCheckPayload(e));

    }else{
    
    }
  }
    
  const compParcel=()=>{
   
      //setUserLoc({userLoc, lat:null, lng:null,address:null,type:1});
    //  setSenderLoc({senderLoc, lat:null, lng:null,address:null,type:1});
     // setuserPickupDetails({...userPickupDetails, pickupType:'',locType:1,operation:''} );
      navigation.dispatch(StackActions.replace('Dashboard'));
                                   
   // navigate('Parcel');
   
  }
    const onRegisterUser=()=>{
      regUser.current.close();
    }
  const inputCheck = () => {
    var check = true;
    if (!name.name) {
      check = false; 
      setName({ ...name, nameError: true });
    } else {
      setName({ ...name, nameError: false });
    }
    if (!desc.desc) {
      check = false;
      setDesc({ ...desc, descError: true });
    } else {

      if(desc.desc.length<10){
        setDesc({ ...desc, descError:true });
        check=false;
      }else{
        setDesc({ ...desc, descError: false });
      }
    }

    if (!stateFrom.stateFromId) {
      check = false;
    }
    if (!stateTo.stateToId) {
      check = false;
    }
   
    
    if (!appDetails.packageId) {
      check = false;
    }


    if (!id.id) {
      check = false;
     
      setId({ ...id, idError: true });
    } else {
      setId({ ...id, idError: false });
    }
    if(!expectedDate.date){
      check=false;
      setExpectedDate({...expectedDate,dateError:true})
   
    }else{
      setExpectedDate({...expectedDate,dateError:false})
    }

    if(!depatureDate.date){
      check=false;
      setDepatureDate({...depatureDate,dateError:true})
    }else{
     setDepatureDate({...depatureDate,dateError:false})
    }

    if(!appDetails.receiverObjectId){
      check=false;
     
  }
    if(!estimateBill.bill){
      check=false;
      setEstimateBill({...estimateBill,error:true});
    }else{
      
      setEstimateBill({...estimateBill,error:false});
    }

  if(!uLoc?.lat&&!uLoc?.lng){
    check=false;
  }
  if(!sLoc.lat&&!sLoc.lng){
    check=false;
  }
    if(!delivery_Type.name){
      check=false;
    }
     if(delivery_Type.name==="TERMINAL"){
       if(!selectedTerminal.id){
       check=false;
       setSelectedTerminal({...selectedTerminal,error:true})
       }else{
      setSelectedTerminal({...selectedTerminal,error:false})
       }

       if(!terminalTo.id){
         check=false;
         setTerminalTo({...terminalTo,error:true});
       }else{
         setTerminalTo({...terminalTo,error:false})
       }

     }
     if(!appDetails.userValid){
      setRecipientPhoneEmail({...recpientPhoneEmail,emailPhoneError:true});
      check=false;
     }
    return check;
  };
     
  const billingPayload=(e)=>{
   if(e.data.payload.payable<'1000'){
    setEstimateBill({...estimateBill,bill:1000});
   }else{
    setEstimateBill({...estimateBill,bill:e.data.payload.payable});
   }
 
  
  }

  const createParcelPayload=(e)=>{
    
    // set going back to false
    Alert.alert("Success","Parcel Created Successfully",[
      {
        text:'Ok',
      onPress:()=>{
        setClean(true);
        compParcel();
        
      }
     
      }
    ])
  }
  const estimateCheck=()=>{
     var check=true;
     if(!expectedDate.date){
        check=false;
        setExpectedDate({...expectedDate,dateError:true});
     }else{
      setExpectedDate({...expectedDate,dateError:false});
     }
     if(!depatureDate.date){
       check=false;
       setDepatureDate({...depatureDate,dateError:true});
     }else{
       setDepatureDate({...depatureDate,dateError:false});
     }
      
     if(item.length===0){
       check=false;
      // Alert.alert("Error","No item added to the parcel yet");
     }else{
     //  ("nop")
     //  (item.length)
     }

    
    if(!uLoc?.lat&&!uLoc?.lng&&!uLoc?.address){
        check=false;
    }
    if(!sLoc?.lat&&!sLoc?.lng&&!sLoc?.address){
      check=false;
    }

   
     return check;
  }

  const getEstimateBilling=()=>{
  
    if(estimateCheck()){
     var billingObject={
       method:'post',
       url:`${api.localUrl}${api.estimatedBilling}`,
       data:{
        items:[],
        locationFrom:{"coordinates":[uLoc?.lat,uLoc?.lng]},
        locationTo:{"coordinates":[sLoc.lat,sLoc.lng]},
        expectedDate:expectedDate.date,
        departureDate:depatureDate.date,
      },
     
      headers:{
        Authorization:' Bearer ' + authUser.token,
      } 
     }
     const temp=[...item];
     temp.map((e)=>{
      billingObject.data.items.push({worth:e.worth,quantity:e.quantity,volume:e.volume,name:e.name,category:e.category,mass:e.mass});
    })
        console.log(billingObject.data);
     apiRequest(billingObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>billingPayload(e));
    }else{
      Alert.alert("Error","Empty fields detected for estimated billing");
    }
  }
  
  const registerParcel=()=>{
    if(inputCheck()){
       var createParcelObject={
         method:'POST',
         url:`${api.localUrl}${api.createParcel}`,
      headers:{
        Authorization:' Bearer ' + authUser.token,
        'Cache-Control': 'no-cache',
      } ,
         data:{
          packaging:appDetails.packageId,
          name:name.name,
          sender:u.id,
          recipient:appDetails.receiverObjectId,
          items:[],
          description:desc.desc,
          locationFrom:{"coordinates":[uLoc?.lat,uLoc?.lng],"address":uLoc?.address},
          locationTo:{"coordinates":[sLoc?.lat,sLoc?.lng],"address":sLoc?.address}, 
          stateFrom:stateFrom.stateFromId,
          stateTo:stateTo.stateToId,
          expectedDate:expectedDate.date,
          departureDate:depatureDate.date,
          costPayable:estimateBill.bill,
          paymentGateway:"WALLET",
          identification:id.id,
          deliveryType:delivery_Type.name,
          vehicleType:uPickDetail.pickupType,

         }
       }
       item.map((e)=>{
        //image property isnt in the parcel payload prompt emmanuel or mr sam
           createParcelObject.data.items.push({worth:e.worth,quantity:e.quantity,volume:e.volume,name:e.name,category:e.category,mass:e.mass,image:e.image});
   
      })
       if(delivery_Type.name==="TERMINAL"){
         if(selectedTerminal.id){
           createParcelObject.data['terminalFrom']=selectedTerminal.id;
         }
         if(terminalTo.id){
           createParcelObject.data['terminalTo']=terminalTo.id
         }

       }
      apiRequest(createParcelObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>createParcelPayload(e));
    
    }else{
      Alert.alert("Error","Empty fields detected");
    }
  }

  const addToItem=(e)=>{
  setEstimateBill({...estimateBill,bill:null});
  setItem([...item,{name:e.name,mass:e.mass,worth:e.worth,quantity:e.quantity,volume:e.volume,category:e.category,image:e.imageUrl,id:e.id}]);
  }
   
  const updateItem=(e)=>{
   setEstimateBill({...estimateBill,bill:null});

  
    const tempItem=[...item];
     tempItem.map((m,i)=>{
       if(m.id===e.id){
         tempItem[i].name=e.name,
         tempItem[i].mass=e.mass,
         tempItem[i].worth=e.worth,
         tempItem[i].quantity=e.quantity,
         tempItem[i].volume=e.volume,
         tempItem[i].category=e.category,
         tempItem[i].image=e.imageUrl
       }
       setItem(tempItem);
     })
  }

  const onChange = (even, selectedDate) => {
    setDateShow(false);
    if (even.type == "set") {
      if (appDetails.stateOp == 1) {
       
        setAppDetails({ ...appDetails, stateOp: "" });
         setExpectedDate({
          ...expectedDate,
          date: selectedDate.toDateString(),
        });
      } else {
     
        setAppDetails({ ...appDetails, stateOp: "" });
        setDepatureDate({
          ...depatureDate,
          date: selectedDate.toDateString(),
        });
      }
    } else {
      //cancel Button
      return null;
    }
  };
  
  const onItemChange=()=>{
   
    addItemRef.current.close();

  }

  const selectDate = (op) => {
    if (op == 1) {
      // date from
      setDateShow(true);
      setAppDetails({ ...appDetails, stateOp: op });
    } else if (op == 2) {
      setDateShow(true);
      setAppDetails({ ...appDetails, stateOp: op });
      // date To
    }
  };
 
  useEffect(() => {
    if (!category) {
      getCategory();
    }
  }, [category]);

 
  const getCategory = () => {
    // state request object
    var stateObject = {
      method: "get",
      url: `${api.localUrl}${api.getCategory}`,
      headers: {
        Authorization: " Bearer " + authUser.token,
      },
    };
    apiRequest( stateObject, (e) => setAppDetails({ ...appDetails, load: e }),(e) => succFunc(e), (e) => failFunc(e),(e) => getCategoryPayload(e));
  };
  
  const editItem=(item)=>{
    console.log(item);
    setCurrentItem(item);
    addItemRef.current.open();
  }

  const deleteItem=(m)=>{
     
    Alert.alert("Caution","Do you want to remove the item?",[
      {
        text:"Cancel",
        onPress:()=>{("Cancle")}
      },
      {
        text:"Delete",
        onPress:()=>{
          setEstimateBill({...estimateBill,bill:null});
          setItem((prev)=>{
            return prev.filter(e=>e.id!=m.id);
          })
        }
      }
    ])
  }

  const addItem=()=>{
    setCurrentItem(null);
    addItemRef.current.open();
  }

  return (
    <View
      style={{
        backgroundColor: "#fff",
        height: Dimensions.get("screen").height/1.12,
        padding:10,
      }}
    >
      <StatusBar animated={true} backgroundColor={AppColor.third} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          padding: 15,
          borderBottomWidth: 1,
          borderBottomColor: `${AppColor.lightThird}`,
        }}
      >
        <Icon name="box" size={15} color={AppColor.third} />
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 15,
            marginLeft: 5,
          }}
        >
          Create Parcel
        </Text>
      </View>
      <ScrollView style={{ marginTop: 10 }}
         refreshControl={
          <RefreshControl refreshing={appDetails.refresh}
          onRefresh={()=>onRefresh()}
          />}
      >
        <View style={{ flexDirection: "column" }}>
          <View style={{width:"100%",height:70}}>
            <InputComp
              mode="outlined"
              right={null}
              label="Parcel Name:"
              style={style.name}
              error={name.nameError}
              secureText={false}
              setText={(e) => {
                setName({ ...name, name: e });
              }}
            />
          </View>
          <View style={{ width: "100%", minHeight:70 }}>
            <InputComp
              mode="outlined"
              right={null}
              label="Description:"
              style={style.name}
              error={desc.descError}
              secureText={false}
              setText={(e) => {
                setDesc({ ...desc, desc: e });
              }}
            />
            {desc.desc.length<10&&desc.descError&&<ErrorMsg msg={"Parcel Description should be more than 10 "}/>}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 2,
            marginLeft: 2,
          }}
        >
          <View style={{ width: "49%", borderWidth: 1, borderRadius: 2 }}>
            <Picker
              selectedValue={stateFrom.stateFromId}
              onValueChange={(itemValue, itemIndex) =>
                setStateFrom({ ...stateFrom, stateFromId: itemValue })
              }
              style={{ borderWidth: 1, width: "100%" }}
            >
              <Picker.Item label="State From " value="" />
              {sortState(ngStates).map((e, i) => {
                  return <Picker.Item key={i} label={e.name} value={e.id} />;
                })}
            </Picker>
          </View>

          <View style={{ width: "49%", borderWidth: 1, borderRadius: 2 }}>
            <Picker
              selectedValue={stateTo.stateToId}
              onValueChange={(itemValue, itemIndex) =>
                setStateTo({ ...stateTo, stateToId: itemValue })
              }
              style={{ borderWidth: 1, width: "100%" }}
            >
              <Picker.Item label="State To" value="" />
              {sortState(ngStates).map((e, i) => {
                  return <Picker.Item key={i} label={e.name} value={e.id} />;
                })}
            </Picker>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 2,
            marginLeft: 2,
            marginTop: 10,
          }}
        >

         <View style={{flexDirection:'column',display:'flex',width:'100%'}}>
         <View style={{ width: "100%", borderWidth: 1, borderRadius: 2 ,marginBottom:10,color:'#bbb'}}>
            <Picker
              selectedValue={appDetails.packageId}
              onValueChange={(itemValue, itemIndex) =>
                setAppDetails({ ...appDetails, packageId: itemValue })
              }
              style={{ borderWidth: 1, width: "100%" }}
            >
              <Picker.Item label="Packaging" value="" />
              {packaging &&
                packaging.map((e, i) => {
                  return <Picker.Item key={i} label={e.name} value={e.name} />;
                })}
            </Picker>
          </View>

          <View style={{ width: "100%", borderWidth: 1, borderRadius: 2,color:'#bbb'}}>
            <Picker
              selectedValue={delivery_Type.name}
              onValueChange={(itemValue, itemIndex) =>
                setDelivery_Type({...delivery_Type,name:itemValue})
              }
              style={{width: "100%" }}
            >
              <Picker.Item label="Delivery Type" value="" />
              <Picker.Item  label={deliveryType[0]} value={deliveryType[0]}/>
              <Picker.Item  label={deliveryType[1]} value={deliveryType[1]}/>
            </Picker>
          </View>
          
        {delivery_Type.name==="TERMINAL"? 
       <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{ width: "49%", borderWidth:selectedTerminal.error?2:1, borderRadius: 2,marginTop:5 ,borderColor:selectedTerminal.error?'#8E0505':'#bbb'}}>
            <Picker
              selectedValue={selectedTerminal.id}
              onValueChange={(itemValue, itemIndex) =>
               setSelectedTerminal({...selectedTerminal,id:itemValue})
           
              }
              style={{ width: "100%"}}
            >
              <Picker.Item label="TerminalFrom" value={""} />
              {pickupTerminal&&pickupTerminal.map((e,i)=>{
               return <Picker.Item key={i}  label={e.name} value={e.id}/>
              })}
              
            </Picker>
          </View>
          <View style={{ width: "49%", borderWidth:terminalTo.error?2:1, borderRadius: 2,marginTop:5 ,borderColor:terminalTo.error?'#8E0505':'#bbb'}}>
            <Picker
              selectedValue={terminalTo.id}
              onValueChange={(itemValue, itemIndex) =>
               setTerminalTo({...terminalTo,id:itemValue})
           
              }
              style={{ width: "100%"}}
            >
              <Picker.Item label="TerminalTo" value={""} />
              {deliveryTerminal&&deliveryTerminal.map((e,i)=>{
               return <Picker.Item key={i}  label={e.name} value={e.id}/>
              })}
              
            </Picker>
          </View>
       </View>
       :null}

         </View>

        </View>
        <View style={{ flexDirection: "row" }}>
          
         
        </View>
       
       <View style={{ flexDirection: "row",justifyContent:'space-between' }}>
          {appDetails.userValid&&<View style={{ width: "10%", justifyContent: "center" }}>
            { IconComp(
             appDetails.userValid,
              { textAlign: "center" },
              15,
              AppColor.third
            )}
          </View>}<InputComp
            label="Receipent Phone"
            mode="outlined"
            style={{ width: "80%",backgroundColor:'#fff'}}
            setText={(e)=>setRecipientPhoneEmail({...recpientPhoneEmail,emailPhone:e})}
            error={recpientPhoneEmail.emailPhoneError}
          />
          <TouchableOpacity onPress={()=>isUserValid()} style={{ justifyContent: "center", width: "10%" }}>
            {IconComp("search", { textAlign: "center" }, 15, AppColor.third)}
          </TouchableOpacity>
        </View>

      
          
        <View style={{ flexDirection: "column" }}>
         
          <View style={{ width: "100%", borderWidth: 1, borderRadius: 2,color:'#bbb',marginTop:10}}>
            <Picker
              selectedValue={id.id}
              onValueChange={(itemValue, itemIndex) =>
                setId({...id,id:itemValue})
              }
              style={{width: "100%" }}
            >
              <Picker.Item label="Identification" value="" />
              {meansOfId.map((e,i)=>{
                return <Picker.Item key={i}  label={e.name} value={e.name}/>
              })}
            </Picker>
          </View>

        </View>

        <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
            onPress={() => selectDate(2)}
            style={{ width: "50%", height: 70 }}
          >
            <InputComp
              mode="outlined"
              right={null}
              label="Depature Date:"
              style={style.name}
              error={depatureDate.dateError}
              value={depatureDate.date ? depatureDate.date : ""}
              secureText={false}
              editable={false}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => selectDate(1)}
            style={style.inputContainer}
          >
            <InputComp
              mode="outlined"
              right={null}
              label="Expected Date:"
              value={expectedDate.date? expectedDate.date : ""}
              style={style.name}
              error={expectedDate.dateError}
              secureText={false}
              editable={false}
            />
          </TouchableOpacity>

          
        </View>

        <View style={{ flexDirection: "column" }}>
          <View style={{ height: 70 }}>
            <InputComp
              mode="outlined"
              right={null}
              label="Pickup Address:"
              style={style.name}
              secureText={false}
              value={uLoc.address ? uLoc.address : ""}
              editable={false}
            />
          </View>
          <View style={{ height: 70 }}>
            <InputComp
              mode="outlined"
              right={null}
              label="Delivery Address:"
              style={style.name}
              value={sLoc?.address ? sLoc?.address : ""}
              secureText={false}
              editable={false}
            />
          </View>
        </View>
        <View style={style.itemCont}>
          <Text style={{ fontWeight:'bold',height:30,padding:5,paddingLeft:10,borderTopRightRadius:5,borderTopLeftRadius:5,backgroundColor:AppColor.lightThird}}>
            Delivery Items
          </Text>
          {item&&item.map((e,i)=>{
            return(
        <View 
         key={i} 
        style={{
         flexDirection:"row",
          marginTop:5,marginBottom:5 }}>
              <View   style={{flexDirection:'row',width:'80%',justifyContent:"space-between",paddingLeft:10}}>
              <Text style={{width:'40%'}}>{e.name}</Text>
              <Text style={{width:'20%'}}>{e.mass}kg</Text>
              <Text>{e.quantity}pieces(s)</Text>
           </View>
        <View style={{flexDirection:'row',width:'20%',justifyContent:'space-evenly'}}>
            <TouchableOpacity onPress={()=>editItem(e)}>
             {IconComp ("edit" ,null,15,AppColor.third)}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>deleteItem(e)}>
             { IconComp ("trash",null,15,AppColor.third)}
            </TouchableOpacity>
          </View>
        </View>
        )
      })}
     
        </View>
       
       <View>
         <TouchableOpacity stylel={{justifyContent:'center'}} onPress={()=>addItem()}>
          { IconComp ("plus-circle",{textAlign:'center'},40,AppColor.lightThird)}
          <Text style={{textAlign:'center'}}>Add item(s)</Text>
         </TouchableOpacity>
       </View>
       <View style={{ flexDirection: "row",justifyContent:'space-between' }}>
        <InputComp
            label="Estimated Billing "
            mode="outlined"
            editable={false}
            value={estimateBill.bill?estimateBill.bill.toString():''}
            style={{ width: "60%" ,backgroundColor:'#fff',height:40}}
            error={estimateBill.error}
          />
          <TouchableOpacity onPress={()=>getEstimateBilling()} style={{...style.estimateBtn}}>
            <Text style={{color:'#000',textAlign:'center'}}>Estimate</Text>
         
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => registerParcel()} style={style.createBtn}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            CREATE PARCEL
          </Text>
        </TouchableOpacity>

        {dateshow && (
          <DateTimePicker
            testID="dateTimePicker"
            minimumDate={currentDate.setDate(new Date().getDate()+1)}
            maximumDate={currentDate.setMonth(currentDate.getMonth()+3)}
            value={appDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
            onTouchCancel={() => ("error")}
          />
        )}
      </ScrollView>
       {appDetails.load&&<LoaderComp size={25} color={AppColor.third}/>}
       <Custombtm displayComp={()=><AddItems token={authUser.token} setCat={()=>getCategory()} cat={category} add={(e)=>addToItem(e)} onChange={()=>onItemChange()} item={currentItem} update={(e)=>updateItem(e)} />} height={Dimensions.get('screen').height} cod={true} btmRef={addItemRef}/>
       <Custombtm displayComp={()=><UserRegister navigation={navigation} onCreate={()=>onRegisterUser()}/>} height={Dimensions.get('screen').height/1.5} cod={true} btmRef={regUser}/>
      {clean&&<CleanUp/>}
    </View>
  );
}

const style = StyleSheet.create({
  estimateBtn:{
    justifyContent: "center",
     width: "27%" ,
    borderRadius:5,
    backgroundColor:AppColor.lightThird,
    height:40,
    alignSelf:'center'
  },
  itemCont:{
    backgroundColor:'#fff',
    borderTopRightRadius:5,
    borderTopLeftRadius:5,
    marginTop:10,
    marginBottom:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  name: {
    height: 55,
    margin: 2,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },

  inputContainer: {
    width: "50%",
    height: 80,
  },

  createBtn: {
    marginTop:10,
    marginBottom:10,
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    backgroundColor: `${AppColor.third}`,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

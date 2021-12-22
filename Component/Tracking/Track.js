import React,{useContext, useState,useEffect} from "react";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import { IconComp } from "../WorkerComp/ExternalFunction";
import { AppColor } from "../WorkerComp/AppColor";
import trackIcon from "../Assets/trackIcon.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import { api,apiRequest} from "../WorkerComp/Api";
import { UserContext } from "../DataProvider/UserContext";
export default function Track({route}) {
  const usercontext=useContext(UserContext);
  const{authUser}=usercontext;
  
    const[track,setTrack]=useState();
     const[trackEm,setTrackEm]=useState(null);
    const[tracknumber,setTracknumber]=useState({
        error:false,
        number:""
    })
  const [appDetails,setAppDetails]=useState({
      load:false,

  })
  useEffect(()=>{
    return ()=>setTracknumber({...tracknumber,number:null})
  },[])

  //Should get the code from route params
  const trackComp=(desc,value,active,icon)=>{
   return <View style={{ paddingLeft: 10 }}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {IconComp(icon?icon:"egg", { marginBottom: 20 }, 20,`${active?AppColor.third:"#C4C4C4"}`)}
      <View>
        <Text style={{ ...style.trackText }}>{desc}</Text>
        <Text style={{ marginLeft: 10 }}>{value} </Text>
      </View>
    </View>
  </View>  
  }

  const checkTrack=()=>{
      var check=true;
      if(!tracknumber.number){
        
          setTracknumber({...tracknumber,error:true});
          check=false;
      }else{
        setTracknumber({...tracknumber,error:false});
      }
      return check
  }

  const succFunc=(e)=>{
   console.log(e);
  }
  const failFunc=(e)=>{
  
    if(e.includes("not found")){
   setTrackEm(e);
   setTrack(null);
    }
  }
  const trackPayload=(e)=>{
    console.log(e.data.payload);
    setTrack(e.data.payload);
  }

   const getTrack=()=>{
      if(checkTrack()){
        var trackObject={
            method:'get',
            url:`${api.localUrl}${api.trackParcel}${tracknumber.number}`,
                headers:{
                    Authorization:' Bearer ' + authUser.token,
                    'Cache-Control': 'no-cache',
                    Pragma: 'no-cache',
                  }
            
        }

        console.log(trackObject);
    
      apiRequest(trackObject,(e)=>{setAppDetails({...appDetails,load:e})},(e)=>{succFunc(e)},(e)=>{failFunc(e)},(e)=>{trackPayload(e)})
       
      }
   
   }
  return (
    <ScrollView style={{display:'flex'}}> 
      <Text style={{ ...style.tInfo }}>Tracking Information</Text>
      <View style={{ ...style.searchCont }}>
        <Text style={{ ...style.tShip }}>Track your shipment</Text>
        <View style={{ ...style.searchInputContainer }}>
        
          <TextInput
            value={tracknumber.number?tracknumber.number:route.params&&route.params.number.toString()}
            placeholder="Search by track number"
            style={{paddingLeft:5, width: "80%",height:'80%',borderColor:`${tracknumber.error?'red':"#fff"}`,borderWidth:1 }}
            keyboardType="numeric"
            onChangeText={(e)=>{setTracknumber({...tracknumber,number:e})}}
          />
            <TouchableOpacity style={{ marginRight: 5 }} onPress={()=>getTrack()}>
            {IconComp("search", null, 20, `${AppColor.fifth}`)}
          </TouchableOpacity>
        </View>
        <View style={{ ...style.imgContainaer }}>
          <Image
            source={trackIcon}
            height={200}
            width={230}
            style={{ borderWidth: 2 }}
          />
        </View>
      </View>
      
     {track?  <View style={{ margin: 10, height:500 }}>
        <Text style={{ ...style.tHistory }}>History</Text> 
        {track.terminalFrom&&trackComp("From",track.terminalFrom.address,false)}
        {track.terminalTo&&trackComp("Current Position",track.terminalStore.address,true)}
        {track.terminalStore&&trackComp("Destination",track.terminalStore.address,false)}
        {trackComp("Expected Date",track.expectedDate.split('T')[0],false)}
        {trackComp("Delivery Status",track.deliveryStatus)}
        {trackComp("Routing",track.routing,true,"route")}
      </View>:<View style={{ ...style.noTrack }}>
        <Text style={{ ...style.trackText, textAlign: "center" }}>
         {trackEm?trackEm:"Track your parcel here!"}
        </Text>
      </View>}  
       {appDetails.load&&<ActivityIndicator animating={true} size={35} color={AppColor.third}/>
   }
    
  
  

    </ScrollView>
  );
}

const style = StyleSheet.create({
  noTrack: {
    width: "80%",
    backgroundColor: "#fff",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom:10,
    marginTop:20
  },
  imgContainaer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "70%",
    alignSelf: "center",
    marginTop: 5,
  },
  trackText: {
    fontWeight: "700",
    fontSize: 15,
    fontStyle: "normal",
    color: `${AppColor.fifth}`,
    margin: 10,
  },
  tHistory: {
    fontWeight: "700",
    fontSize: 20,
    fontStyle: "normal",
    color: `${AppColor.fifth}`,
    margin: 10,
  },
  searchInputContainer: {
    marginTop: 12,
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "#fff",
    paddingLeft: 15,
  },
  searchInput: {
    height: "80%",
    borderWidth: 1,
    width: "70%",
  },
  tShip: {
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginTop: 12,
  },
  tInfo: {
    fontWeight: "700",
    fontSize: 20,
    fontStyle: "normal",
    textAlign: "center",
    color: `${AppColor.fifth}`,
    margin: 10,
  },
  searchCont: {
    marginTop: 38,
    height: 342,
    borderRadius: 20,
    backgroundColor: `${AppColor.lightThird1}`,
    width: "85%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  searchInput: {},
  image: {
    width: "100%",
    height: 200,
  },
});

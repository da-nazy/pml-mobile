import React,{useState,useContext} from 'react';
import { View,Text, ScrollView,StyleSheet, TouchableOpacity,Alert} from 'react-native';
import { AppColor } from '../WorkerComp/AppColor';
import InputComp from '../WorkerComp/InputComp';
import { packaging ,IconComp} from '../WorkerComp/ExternalFunction';
import {api,apiRequest,ngStates} from '../WorkerComp/Api';
import { Picker } from "@react-native-community/picker";
import LoaderComp from '../WorkerComp/LoaderComp';
import { UserContext } from '../DataProvider/UserContext';
export default function ViewParcel({parcel}){
  const usercontext=useContext(UserContext);
  const {authUser,user,userWallet}=usercontext;
    //console.log(userWallet);
    // should only update pickup not added to a parcel

 

    const viewComp=(name,description)=>{
        return(
            <View style={{margin:5}}>
        <Text
          style={style.nameText}
        >
         {name}
        </Text>
        <View
          style={style.descText}
        >
          <Text>{description}</Text>
        </View>
      </View>
        )
    }

    const[costPayable,setCostPayable]=useState({
      cost:'',
      costError:false,
    })
    const[ngState,setNgState]=useState(null);
    
    const[parcelState,setParcelState]=useState({
      stateFrom:parcel.stateFrom.name?parcel.stateFrom.name:null,
      stateTo:parcel.stateTo.name?parcel.stateTo.name:null,
    })



    const [appDetails,setAppDetails]=useState({
      edit:false,
      userValid:'',
      locToValid:'',
      locFromValid:'',
      load:false,

    })

     const [name,setName]=useState({
       name:'',
       nameError:false,
       
     });

     const[desc,setDesc]=useState({
       desc:'',
       descError:false,
     })

     const[locationTo,setLocationTo]=useState({
       address:'',
       coordinates:[{
       }]
     })
     const[locationFrom,setLocationFrom]=useState({
      address:'',
      coordinates:[{
      }]
    })
    const[quantity,setQuantity]=useState({
      quantity:'',
      quantityError:false,
    })

    const[receipientPhone,setReceipientPhone]=useState({
      phone:'',
      phoneError:false,
    })

    const[worth,setWorth]=useState({
      worth:'',
      worthError:false,
    })

    const[mass,setMass]=useState({
      mass:'',
      massError:false,
    })
    const[volume,setVolume]=useState({
      volume:'',
      volumeError:false,
    })
    const [category,setCategory]=useState({
      catId:'',
     category:[],
    })
    const [packageId,setPackageId]=useState({
      packageId:parcel.packaging?parcel.packaging:'',
    })

    const getCategory=()=>{
     
    }

    const isUserValid=()=>{

    }
    const userEdit=()=>{

    }

    const succFunc=(e)=>{
      console.log(e.data.message);
     // Alert.alert("Success",e.data.message);
    }
    const failFunc=(e)=>{
      Alert.alert("Error",e);
    }
    
    const editUser=()=>{
      
      console.log(appDetails.edit);
      if(appDetails.edit){
        // run the  edit 
        // after which set edit false
        console.log(appDetails.edit);
      }else{
        // set edit true
        setAppDetails({...appDetails,edit:true});
       console.log(appDetails.edit);
      }
    }
    
    const getGeocode=(e)=>{
    console.log(e);
    }

    const getCost=()=>{

    }

    const removeParcel=(id)=>{
      var deleteParcelObject={
        method:'PATCH',
        url:`${api.localUrl}${api.deleteParcel}${id?id:parcel.id}`,
        headers:{
          Authorization:' Bearer ' + authUser.token,
        }
      }

      console.log(deleteParcelObject);
      apiRequest(deleteParcelObject,(e)=>setAppDetails({...appDetails,load:e}),(e)=>succFunc(e),(e)=>failFunc(e),(e)=>deleteParcelPayload(e));
 
 }
 const deleteParcelPayload=(e)=>{
  console.log(e);
 // Alert.alert("Success",e.data.message);
}

    const deleteParcel=()=>{
      console.log(parcel.id);
      Alert.alert("Caution",`Are you sure you want to delete the parcel with code ${parcel.code}?`,[
        {
        text:"Cancle",
        onPress:()=>console.log("cancle"),
        style:style.cancel,
      },
      {
        text:"Okay",
        onPress:()=>removeParcel(),
        style:style.okay,
      },
    ])
    }
    return(
        <View>
            <Text style={{fontWeight:'bold',textAlign:'center',fontSize:18}}> View Parcel</Text>
            <ScrollView style={{height:500,margin:10}}>
                {parcel&&(
                <View>
              <View
                style={{
                  width: "25%",
                  marginBottom:20,
                  height: 50,
                  width: 50,
                  marginTop:25,
                }}
              >
                {parcel.imgUrl ? (
                  <Image
                    style={{width: 70,
                        height: 70,
                        borderWidth: 1,}}
                    source={{
                      uri: parcel.imgUrl,
                    }}
                  />
                ) : 
              <View style={{flexDirection:'row'}}>
                {IconComp("box",{width:70,height:70,textAlign:"center"},50,AppColor.third)}
                
               {appDetails.edit&&(
                <TouchableOpacity style={{borderRadius:8,backgroundColor:'#fff',left:-30,top:8,borderWidth:1,borderColor:`${AppColor.third}`,alignSelf:'center'}}>
                {IconComp("pen",{width:20,height:20,textAlign:"center",padding:3},10,AppColor.third)}
               </TouchableOpacity>
               )}
                   </View>
              }
                 
              </View>
              
        <View style={{marginTop:5}}>
        <InputComp
          inputType="name"
          value={parcel.name}
          mode="outlined"
          right={null}
          label="Product Name:"
          placeholder="Input value"
          style={style.name}
          error={name.nameError}
          secureText={false}
          disabled={!appDetails.edit}
          setText={(e) => {
            setName({ ...name, name: e });
          }}
        /> 
      </View>

      <View style={{marginTop:5}}>
        <InputComp
          inputType="Code:"
          value={parcel.code}
          mode="outlined"
          right={null}
          label="Product Code:"
          placeholder="Input value"
          style={style.name}
          error={name.nameError}
          secureText={false}
          disabled={true}
          setText={(e) => {
            setName({ ...name, name: e });
          }}
        />
      </View>
      
      <View style={{marginTop:5,flexDirection:'row'}}>
      <View style={{width:`${appDetails.edit?'80%':'100%'}`}}>
      <InputComp
          inputType="CostPayable:"
          value={parcel.costPayable.toString()}
          mode="outlined"
          right={null}
          label="Product CostPayable:"
          placeholder="Input value"
          style={style.name}
          error={name.nameError}
          secureText={false}
          disabled={true}
          setText={(e) => {
            setName({ ...name, name: e });
          }}
        />
        </View>
        {appDetails.edit&&(<TouchableOpacity onPress={()=>getCost()} style={{ justifyContent: "center", width: "10%" }}>
            {IconComp("sync-alt", { textAlign: "center" }, 15, AppColor.third)}
          </TouchableOpacity>)}
      </View>

      <View style={{marginTop:5}}>
        <InputComp
          inputType="Description:"
          value={parcel.description}
          mode="outlined"
          right={null}
          label="Product Description:"
          placeholder="Input value"
          style={style.name}
          error={name.nameError}
          secureText={false}
          disabled={!appDetails.edit}
          setText={(e) => {
            setName({ ...name, name: e });
          }}
        />
       
      </View>

      <View style={{marginTop:5}}>
        <InputComp
          inputType="Identification:"
          value={parcel.identification}
          mode="outlined"
          right={null}
          label="Product Identification:"
          placeholder="Input value"
          style={style.name}
          error={name.nameError}
          secureText={false}
          disabled={!appDetails.edit}
          setText={(e) => {
            setName({ ...name, name: e });
          }}
        />
       
      </View>

      <View style={{marginTop:5,flexDirection:'row'}}>
      {appDetails.locToValid?(
      <View style={{width:"10%",justifyContent:"center"}}>
        {IconComp(appDetails.locToValid,{textAlign:"center"},15,AppColor.third)}
        </View>):null}
        <View style={{width:appDetails.edit?'80%':'100%'}}>
        <InputComp
          inputType="LocationTo:"
          value={parcel.locationTo.address}
          mode="outlined"
          right={null}
          label="Product LocationTo:"
          placeholder="Input value"
          style={style.name}
          error={name.nameError}
          secureText={false}
          disabled={!appDetails.edit}
          setText={(e) => {
            setName({ ...name, name: e });
          }}
        />
          </View>
        {appDetails.edit&&<TouchableOpacity onPress={()=>getGeocode()} style={{ justifyContent: "center", width: "10%" }}>
            {IconComp("sync-alt", { textAlign: "center" }, 15, AppColor.third)}
          </TouchableOpacity>}
      </View>
      <View style={{marginTop:5,flexDirection:'row'}}>
      {appDetails.locFromValid?(
      <View style={{width:"10%",justifyContent:"center"}}>
        {IconComp(appDetails.locFromValid,{textAlign:"center"},15,AppColor.third)}
        </View>):null}
     <View style={{width:appDetails.edit?'80%':'100%'}}>
     <InputComp
          inputType="LocationFrom:"
          value={parcel.locationFrom.address}
          mode="outlined"
          right={null}
          label="Product LocationFrom:"
          placeholder="Input value"
          style={style.name}
          error={name.nameError}
          secureText={false}
          disabled={!appDetails.edit}
          setText={(e) => {
            setName({ ...name, name: e });
          }}
        />
     </View>
        {appDetails.edit&&<TouchableOpacity onPress={()=>getGeocode()} style={{ justifyContent: "center", width: "10%" }}>
            {IconComp("sync-alt", { textAlign: "center" }, 15, AppColor.third)}
          </TouchableOpacity>}
      </View>
      <View style={{marginTop:5}}>
        <InputComp
          inputType="Quantity:"
          value={parcel.quantity.toString()}
          mode="outlined"
          right={null}
          label="Product Quantity:"
          placeholder="Input value"
          style={style.name}
          error={name.nameError}
          secureText={false}
          disabled={!appDetails.edit}
          setText={(e) => {
            setName({ ...name, name: e });
          }}
        />
       
      </View>
     
      <View style={{ flexDirection: "row",justifyContent:'space-between',marginTop:5}}>
      {appDetails.userValid?(
      <View style={{width:"10%",justifyContent:"center"}}>
        {IconComp(appDetails.userValid,{textAlign:"center"},15,AppColor.third)}
        </View>):null}
          <View style={{width:appDetails.edit?'80%':'100%'}}>
          <InputComp
          inputType="Phone:"
          value={parcel.recipientPhone}
          mode="outlined"
          right={null}
          label="Receipient Phone:"
          placeholder="Input value"
          style={style.name}
          error={name.nameError}
          secureText={false}
          disabled={!appDetails.edit}
          setText={(e) => {
            setName({ ...name, name: e });
          }}
        />
            </View>
         {appDetails.edit&&<TouchableOpacity onPress={()=>isUserValid()} style={{ justifyContent: "center", width: "10%" }}>
            {IconComp("sync-alt", { textAlign: "center" }, 15, AppColor.third)}
          </TouchableOpacity>}
   </View>

      <View style={{marginTop:5}}>
        <InputComp
          inputType="Routing:"
          value={parcel.routing}
          mode="outlined"
          right={null}
          label="Product Routing:"
          placeholder="Input value"
          style={style.name}
          error={name.nameError}
          secureText={false}
          disabled={true}
          setText={(e) => {
            setName({ ...name, name: e });
          }}
        />
       
      </View>
      <View style={{marginTop:5}}>
        <InputComp
          inputType="Worth:"
          value={parcel.worth.toString()}
          mode="outlined"
          right={null}
          label="Product Worth:"
          placeholder="Input value"
          style={style.name}
          error={name.nameError}
          secureText={false}
          disabled={!appDetails.edit}
          setText={(e) => {
            setName({ ...name, name: e });
          }}
        />
       
      </View>
      <View style={{marginTop:5}}>
        <InputComp
          inputType="Volume:"
          value={parcel.volume.toString()}
          mode="outlined"
          right={null}
          label="Product Volume:"
          placeholder="Input value"
          style={style.name}
          error={name.nameError}
          secureText={false}
          disabled={!appDetails.edit}
          setText={(e) => {
            setName({ ...name, name: e });
          }}
        />  
      </View>
      <View style={{marginTop:5}}>
        <InputComp
          inputType="Mass:"
          value={`${parcel.mass}kg`}
          mode="outlined"
          right={null}
          label="Product Mass:"
          placeholder="Input value"
          style={style.name}
          error={name.nameError}
          secureText={false}
          disabled={!appDetails.edit}
          setText={(e) => {
            setName({ ...name, name: e });
          }}
        />  
      </View>
      <View style={{marginTop:5,marginBottom:10}}>
        <InputComp
          inputType="Date:"
          value={parcel.updatedAt.split("T")[0]}
          mode="outlined"
          right={null}
          label="Product Date:"
          placeholder="Input value"
          style={style.name}
          error={name.nameError}
          secureText={false}
          disabled={true}
          setText={(e) => {
            setName({ ...name, name: e });
          }}
        />  
      </View>   

      <View style={{ marginTop:10, borderWidth: 1, borderRadius: 2,borderColor:`${appDetails.edit?'#000':'#bbb'}`,marginBottom:10 }}>
            <Picker
              selectedValue={packageId.packageId}
              onValueChange={(itemValue, itemIndex) =>
                setPackageId({ ...packageId, packageId: itemValue })
              }
              style={{ borderWidth: 1, width: "100%",color:'#bbb' }}
            >
              <Picker.Item label="Packaging" value="" />
              {packaging &&
                packaging.map((e, i) => {
                  return <Picker.Item key={i} label={e.name} value={e.name} />;
                })}
            </Picker>
          </View>


         <View style={{flexDirection:'row'}}> 
         <View style={{ borderWidth: 1, borderRadius: 2,borderColor:`${appDetails.edit?'#000':'#bbb'}`,marginTop:10 ,width:appDetails.edit?'90%':'100%'}}>
            <Picker
              selectedValue={category.catId}
              onValueChange={(itemValue, itemIndex) =>
                //  setCategory({ ...category, stateId: itemValue })
                setCategory({ ...category, catId: itemValue })
              }
              style={{ borderWidth: 1, width: "100%",color:`${appDetails.edit?'#000':'#bbb'}` }}
            >
              <Picker.Item label="Category " value="" />
              {category.category &&
                category.category.map((e, i) => {
                  return <Picker.Item key={i} label={e.name} value={e.id} />;
                })}
            </Picker>      
          </View>
          {appDetails.edit&&(<TouchableOpacity onPress={()=>isUserValid()} style={{ justifyContent: "center", width: "10%" }}>
            {IconComp("sync-alt", { textAlign: "center" }, 15, AppColor.third)}
          </TouchableOpacity>)}

         </View>
         <View style={{flexDirection:'row'}}> 
         <View style={{ borderWidth: 1, borderRadius: 2,borderColor:`${appDetails.edit?'#000':'#bbb'}`,marginTop:10 ,width:appDetails.edit?'90%':'100%'}}>
            <Picker
            
              enabled={false}
              selectedValue={parcelState.stateFrom}
              onValueChange={(itemValue, itemIndex) =>
                //  setCategory({ ...category, stateId: itemValue })
                setCategory({ ...category, catId: itemValue })
              }
              style={{ borderWidth: 1, width: "100%",color:`${appDetails.edit?'#000':'#bbb'}`}}
            >
              <Picker.Item label="StateFrom " value="" />
              {ngStates &&
                ngStates.map((e, i) => {
                  return <Picker.Item key={i} label={e.name} value={e.id} />;
                })}
            </Picker>      
          </View>
          {appDetails.edit&&(<TouchableOpacity onPress={()=>isUserValid()} style={{ justifyContent: "center", width: "10%" }}>
            {IconComp("sync-alt", { textAlign: "center" }, 15, AppColor.third)}
          </TouchableOpacity>)}

         </View>
         <View style={{flexDirection:'row'}}> 
         <View style={{ borderWidth: 1, borderRadius: 2,borderColor:`${appDetails.edit?'#000':'#bbb'}`,marginTop:10 ,width:appDetails.edit?'90%':'100%'}}>
            <Picker
            enabled={false}
              selectedValue={category.catId}
              onValueChange={(itemValue, itemIndex) =>
                //  setCategory({ ...category, stateId: itemValue })
                setCategory({ ...category, catId: itemValue })
              }
              style={{ borderWidth: 1, width: "100%",color:`${appDetails.edit?'#000':'#bbb'}` }}
            >
              <Picker.Item label="stateTo " value="" />
              {ngStates &&
                ngStates.map((e, i) => {
                  return <Picker.Item key={i} label={e.name} value={e.id} />;
                })}
            </Picker>      
          </View>
          {appDetails.edit&&(<TouchableOpacity onPress={()=>isUserValid()} style={{ justifyContent: "center", width: "10%" }}>
            {IconComp("sync-alt", { textAlign: "center" }, 15, AppColor.third)}
          </TouchableOpacity>)}

         </View>
    

                {/** Edit Delete */}
                <View style={{flexDirection:'row',margin:15,justifyContent:"space-evenly",marginBottom:25}}>
                  <TouchableOpacity onPress={()=>editUser()} style={style.actionBtn}>
                    <Text style={style.actionBtnText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>deleteParcel()} style={style.actionBtn}>
                    <Text style={style.actionBtnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
                </View>)}
                {appDetails.load&&<LoaderComp size={25} color={AppColor.third}/>}
            </ScrollView>
            </View>
    )
}

const style=StyleSheet.create({
    nameText:{
        color: `${AppColor.third}`,
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 10,
    },
    descText:{
        paddingLeft: 5,
        height: 35,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        paddingTop: 2,
        backgroundColor: "#f1f1f1",
        justifyContent:'center'
    },
    actionBtn:{
      width:120,
      height:40,
      justifyContent:'center',
      borderRadius:5,
      backgroundColor:`${AppColor.third}`,
      shadowColor: "#000",
      shadowOffset: {
	width: 0,
	height: 3,
},
shadowOpacity: 0.27,
shadowRadius: 4.65,

elevation: 6,
    },
    name:{
      height:50,
      marginTop:15,
      width:'100%',
    },
    actionBtnText:{
      textAlign:'center',
      fontWeight:'bold',
      color:'#fff'
    },
    cancel:{
       backgroundColor:'#000'
    },
    okay:{
      backgroundColor:'#000'
    }
})
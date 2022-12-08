import React, { useState,useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet,Image,ActivityIndicator, InteractionManager} from "react-native";
import { Picker } from "@react-native-picker/picker";
import InputComp from "../WorkerComp/InputComp";
import { AppColor} from "../WorkerComp/AppColor";
import { IconComp,isNumber } from "../WorkerComp/ExternalFunction";
import LoaderComp from "../WorkerComp/LoaderComp";
import { api, apiRequest } from "../WorkerComp/Api";
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import PickImage from "../WorkerComp/PickImage";

export default function AddItems({ token,add,update,onChange,item,cat,setCat,getCat}) {
  const [pickImage,setPickImage]=useState(false);

  const [itemName, setItemName] = useState({
    name: "",
    error: false,
  });
  const [itemKg, setItemKg] = useState({
    value: null,
    error: false,
  });
  const [itemWorth, setItemWorth] = useState({
    value: null,
    error: false,
  });
  const [itemQuantity, setItemQuantity] = useState({
    value: null,
    error: false,
  });
  const [itemVolume, setItemVolume] = useState({
    value: null,
    error: false,
  });

  const [category, setCategory] = useState({
    category: null,
    selectedCateory: "",
    value: [
      {
        name: "1",
        id: 1,
      },
      { name: "2", id: 2 },
    ],
  });
  const [itemDetails, setItemDetails] = useState({
    name: '',
    mass: '',
    worth: '',
    quantity: '',
    volume: '',
    category: '',
  });
  const [appDetails, setAppDetails] = useState({
    load:false,
  });
  const succFunc = (e) => {

  };
  const failFunc = (e) => {
  
  };
  const getCategoryPayload = (e) => {
  
  };
      useEffect(()=>{
        if(item){
          setItemImage({...itemImage,value:item.image});
          setItemName({...itemName,name:item.name})
          console.log(item)
        }
      },[item])

  const [itemImage,setItemImage]=useState({
    value:'',
    error:false,
    type:null,
  })

  const getCategory = () => {
    // state request object
    var stateObject = {
      method: "get",
      url: `${api.localUrl}${api.getCategory}`,
      headers: {
        Authorization: " Bearer " + token,
      },
    };
   
    apiRequest(
      stateObject,
      (e) => setAppDetails({ ...appDetails, load: e }),
      (e) => succFunc(e),
      (e) => failFunc(e),
      (e) => getCategoryPayload(e)
    );
  };

  const imageSuccFunc=(e)=>{
    console.log(e)
  }

  const imageFailFunc=(e)=>{
     console.log(e)
  }
  
  const imageUploadPayload=(e)=>{
     setItemImage({...itemImage,value:e.data.payload.url,error:false})
  }

  const uploadImage=(img,type)=>{
    var uploadObject = {
      method: "post",
      url: `${api.localUrl}${api.imageUpload}`,
      headers: {
        Authorization: " Bearer " + token,
      },
      data:{
        name:itemName?.name+"_"+type+"_"+img.length+'_'+uuidv4(),
        description:itemName?.name+"_"+type+"_"+img.length,
        folder: "pmt-logistic",
        tags: ["parcel"],
        type: "IMG",
        base64String:`data:image/${type};base64,${img}`
    }

    }
      
    apiRequest(  uploadObject,(e) => setAppDetails({ ...appDetails, load: e }),(e) => imageSuccFunc(e),  (e) => imageFailFunc(e), (e) => imageUploadPayload(e));

}

 
  const itemCheck = () => {
    var check = true;
    if (!itemName.name) {
      check = false;
      setItemName({ ...itemName, error: true });
    } else {
      setItemName({ ...itemName, error: false });
    }

    if (!itemKg.value) {
      check = false;
      setItemKg({ ...itemKg, error: true });
    } else {
      if(itemKg.value<1){
        check=false;
        setItemKg({ ...itemKg, error: true });
      }else{
       if(isNumber(itemKg.value)){
        setItemKg({ ...itemKg, error: false });
       }else{
         check=false;
        setItemKg({ ...itemKg, error: true });
       }
      }
     
    }

    if (!itemWorth.value) {
      check = false;
      setItemWorth({ ...itemWorth, error: true });
    } else {

      if(itemWorth.value<1){
        check=false;
        setItemWorth({ ...itemWorth, error:true});
      }else{
      if(isNumber(itemWorth.value)){
        setItemWorth({ ...itemWorth, error: false });
        
      }else{
        check=false;
        setItemWorth({...itemWorth,error:true})
      }
      }
     
    }

    if (!itemQuantity.value){
      check = false;
      setItemQuantity({...itemQuantity, error:true});
    } else {
      if(itemQuantity.value<1){
        check=false;
        setItemQuantity({...itemQuantity,error:true});
      }else{
        if(isNumber(itemQuantity.value)){
          setItemQuantity({ ...itemQuantity, error:false});
          
        }else{
          check=false;
          setItemQuantity({...itemQuantity,error:true});
         
        }
        
      }
    }


    if (!itemVolume.value) {
      check = false;
      setItemVolume({ ...itemVolume, error: true });
    } else {
     if(itemVolume.value<1){
       check=false;
       setItemVolume({ ...itemVolume, error:true});
     }else{
       if(isNumber(itemVolume.value)){
        setItemVolume({ ...itemVolume, error: false });
       }else{
         check=false;
        setItemVolume({ ...itemVolume, error: true });
       }
     }
    }

    if (!category.category) {
      check = false; 
    }
   if(!itemImage.value){
     check=false;
     setItemImage({...itemImage,error:true})
   }else{
     setItemImage({...itemImage,error:false})
   }
    return check;
  };
  const items=()=>{
    console.log(itemImage.value)
    if(item){
      // Means to update on proceed
      var itemDetails={
       name:itemName.name?itemName.name:item.name,
       mass:itemKg.value?itemKg.value:item.mass,
       worth:itemWorth.value?itemWorth.value:item.worth,
       quantity:itemQuantity.value?itemQuantity.value:item.quantity,
       volume:itemVolume.value?itemVolume.value:item.volume,
       category:category.category?category.category:item.category,
       imageUrl:itemImage.value,
       id:item.id,
      }
    
      update(itemDetails);
      onChange();

      }else if(itemCheck()){
        var itemDetails={
          name:itemName.name,
          mass:itemKg.value,
          worth:itemWorth.value,
          quantity:itemQuantity.value,
          volume:itemVolume.value,
          category:category.category,
          imageUrl:itemImage.value,
          id:uuidv4(),
         }
          
        
         add(itemDetails);
         onChange();
       } else{
    
       }

    
  }

  const imageOperation=(img,op,type)=>{
    setPickImage(false);
    uploadImage(img,type);
 }
 
 const imageFunc=()=>{
   // picks image if empty
   if(itemImage.value){
     setItemImage({...itemImage,value:'',error:false,type:null})
   }else{
 
     setPickImage(true);
   }
   // clears image if availabe

 }
  return (
    <View>
      <View style={style.itemCont}>
        <View
          style={{
            height: 35,
            justifyContent: "center",
            backgroundColor: AppColor.third,
          }}
        >
          <Text style={{ fontWeight: "bold", paddingLeft: 15, color: "#fff" }}>
       
            ITEM{" "}
          </Text>
        </View>
        <View>
          <InputComp
            mode="outlined"
            label="Item Name"
            error={itemName.error}
            setText={(e) => setItemName({ ...itemName, name: e })}
            style={style.inputComp}
            value={itemName.name?itemName.name:item&&item.name}
          />
          <InputComp
            mode="outlined"
            label="Item mass(kg)"
            error={itemKg.error}
            style={style.inputComp}
            keyboardType={"numeric"}
            value={itemKg.value?itemKg.value:item&&item.mass}
            setText={(e) => setItemKg({ ...itemKg, value: e })}
          />
        </View>
        <View>
          <InputComp
            mode="outlined"
            label="Volume"
            error={itemVolume.error}
            style={style.inputComp}
            keyboardType={"numeric"}
            value={itemVolume.value?itemVolume.value:item&&item.volume}
            setText={(e) => setItemVolume({ ...itemVolume, value: e })}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <InputComp
            mode="outlined"
            label="Quantity"
            error={itemQuantity.error}
            style={{ margin: 10, width: "43%",backgroundColor:'#fff' }}
            keyboardType={"numeric"}
            value={itemQuantity.value?itemQuantity.value:item&&item.quantity}
            setText={(e) => setItemQuantity({ ...itemQuantity, value: e })}
          />
          <InputComp
            mode="outlined"
            label="Worth"
            error={itemWorth.error}
            style={{ margin: 10, width: "43%",backgroundColor:'#fff' }}
            keyboardType={"numeric"}
            value={itemWorth.value?itemWorth.value:item&&item.worth}
            setText={(e) => setItemWorth({ ...itemWorth, value: e })}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          {!cat&&<TouchableOpacity style={{ alignSelf: "center", width: "15%" }}>
            {IconComp("sync-alt", null, 15, AppColor.third)}
          </TouchableOpacity>}
          <View
            style={{
              //
              width:`${cat?"95%":"75%"}`,
              borderWidth: 1,
              borderRadius: 5,
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <Picker
              selectedValue={category.category}
              onValueChange={(itemValue, itemIndex) =>
                //  setCategory({ ...category, stateId: itemValue })
                setCategory({...category, category: itemValue })
              }
              style={{ borderWidth: 1 }}
            >
              <Picker.Item label={'Category'} value="" />
              {cat&&cat.map((e, i) => {
                  return <Picker.Item key={i} label={e.name} value={e.id} />;
                })}
            </Picker>
          </View>
        </View>

       <View style={{...style.imgRow}}>
      {itemName.name?<TouchableOpacity onPress={()=>imageFunc()}>
          {IconComp(
            itemImage.value? "times":"image",
            { marginLeft: 10, marginBottom: 10 },
            25,
             itemImage.error? AppColor.error:AppColor.third
          )}
        </TouchableOpacity>:null}
        <View style={{...style.imgCont}}>
        <Image
          style={{...style.img}}
          resizeMode={'contain'}
          
          source={{uri:itemImage.value?itemImage.value:'noImage'}}
        />
        </View>
       </View>

      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity style={style.procBtn} onPress={() =>items()}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", color: "#fff" }}
          >
            Procced
          </Text>
        </TouchableOpacity>
      </View>
      {appDetails.load&& <ActivityIndicator animating={true} size={40} color={AppColor.third} />}
      {pickImage&&<PickImage setImageUri={(img,op)=>setPickImage(false)} setError={()=>setPickImage(false)} setImageBase64={(img,op,type)=>imageOperation(img,op,type)}/>}
    </View>
  );
}
const style = StyleSheet.create({
  imgRow:{
   flexDirection:'row',
    alignItems:'center',
  },
  img:{
   width:'100%',
   height:'100%',
   

  },
  imgCont:{
    width:'50%',
    height:100,
    borderRadius:5,
    marginLeft:10,
    marginBottom:10,
  },
  inputComp: {
    margin: 10,
    backgroundColor:'#fff',
  },
  itemCont: {
    backgroundColor: "#fff",
    margin: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  procBtn: {
    width: "75%",
    height: 40,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    color: "#fff",
    backgroundColor: AppColor.third,
  },
});

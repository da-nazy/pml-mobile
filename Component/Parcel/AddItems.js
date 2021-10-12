import React,{useState} from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import { Picker } from "@react-native-community/picker";
import InputComp from '../WorkerComp/InputComp';
import { AppColor } from '../WorkerComp/AppColor';
import { IconComp } from '../WorkerComp/ExternalFunction';
export default function  AddItems(){
    const[itemName,setItemName]=useState({
        name:'',
        error:false,
    });
    const[itemKg,setItemKg]=useState({
        value:null,
        error:false,
    })
    const[itemWorth,setItemWorth]=useState({
        value:null,
        error:false,
    })
    const[itemQuantity,setItemQuantity]=useState({
        value:null,
        error:false,
    })
    const[itemVolume,setItemVolume]=useState({
        value:null,
        error:false,
    })

   const[category,setCategory]=useState({
       categoryId:null,
       selectedCateory:'',
       value:null,
   })
   const[itemDetails,setItemDetails]=useState({
        name:null,
        mass:null,
        worth:null,
        quantity:null,
        volume:null,
        categoryId:null,
   })
   const[appDetails,setAppDetails]=useState({
       load:false,

   })

    return(
     <View>
         <View style={style.itemCont}>
      <View style={{height:35,justifyContent:'center',backgroundColor:AppColor.third}}><Text style={{fontWeight:'bold',paddingLeft:15,color:'#fff'}}> ITEM </Text></View>
       <View>
           <InputComp
           mode="outlined"
           label="Item Name"
           placeholder="Enter Item Name"
           error={itemName.error}
           setText={(e)=>setItemName({...itemName,name:e})}
           style={style.inputComp}
           />
            <InputComp
           mode="outlined"
           label="Item Weight"
           placeholder="Enter Item Kg"
           error={itemKg.error}
           style={style.inputComp}
           keyboardType={"numeric"}
           setText={(e)=>setItemKg({...itemKg,value:e})}
           />
       </View>
       <View>
       <InputComp
           mode="outlined"
           label="Volume"
           placeholder="Enter Item Volume"
           error={itemVolume.error}
           style={style.inputComp}
           keyboardType={"numeric"}
           setText={(e)=>setItemVolume({...itemVolume,value:e})}
           />
       </View>
       <View style={{flexDirection:'row',justifyContent:'space-between'}}>
       <InputComp
           mode="outlined"
           label="Quantity"
           placeholder="Item quantity"
           error={itemName.error}
           style={{margin:10,width:'43%'}}
           keyboardType={"numeric"}
           />
           <InputComp
           mode="outlined"
           label="Worth"
           placeholder="Item worth"
           error={itemName.error}
           style={{margin:10,width:'43%'}}
           keyboardType={"numeric"}
           setText={(e)=>setItemWorth({...itemWorth,value:e})}
           />
           
       </View>
       

       <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
           <TouchableOpacity style={{alignSelf:'center',width:'15%'}}>
           {IconComp ("sync-alt" ,null,15,AppColor.third)}  
           </TouchableOpacity>
       <View style={{width:'75%',borderWidth:1,borderRadius:5,marginTop:10,marginBottom:10}}>   
       <Picker
              selectedValue={category.categoryId}
              onValueChange={(itemValue, itemIndex) =>
                //  setCategory({ ...category, stateId: itemValue })
                setCategory({ ...category, categoryId: itemValue })
              }
              style={{ borderWidth: 1}}
            >
              <Picker.Item label="Category " value="" />
              {category.value &&
                category.value.map((e, i) => {
                  return <Picker.Item key={i} label={e.name} value={e.id} />;
                })}
            </Picker>
       </View>
       </View>

       <View>
       {IconComp("images", { marginLeft:10,marginBottom:10}, 25, AppColor.third)}
        
       </View>
       
  </View>
   <View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
   <TouchableOpacity style={style.procBtn}>
      <Text style={{textAlign:'center',fontWeight:'bold'}}>Procced</Text>
  </TouchableOpacity>
   </View>
     </View>
    )
}
const style=StyleSheet.create({
    inputComp:{
      margin:10
    },
    itemCont:{
        backgroundColor:'#fff',
        margin:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    }
,
procBtn:{

    width:'75%',
    height:40,
    justifyContent:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    color:'#fff',
    backgroundColor:AppColor.third,
}
})
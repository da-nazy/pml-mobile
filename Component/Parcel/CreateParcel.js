import React, { useState } from 'react';
import { View,Text, ScrollView,StyleSheet,
  StatusBar,Dimensions, TouchableOpacity} from 'react-native';
import { AppColor } from '../WorkerComp/AppColor';
import Icon from 'react-native-vector-icons/FontAwesome5';
import InputComp from '../WorkerComp/InputComp';
import { Picker } from "@react-native-community/picker";
import { IconComp } from '../WorkerComp/ExternalFunction';
export default function CreateParcel(){

  const [ngState,setNgState]=useState(null);
    const [name,setName]=useState({
        name:'',
        nameError:false,
    });
    const [desc,setDesc]=useState({
            desc:'',
            descError:false,

    })
    const [weight,setWeight]=useState({
        weight:'',
        weightError:false,
    })
    const[stateFrom,setStateFrom]=useState({
      stateId:'',
    })

    const[stateTo,setStateTo]=useState({
      stateId:'',
    })

    return(
        <View style={{backgroundColor:'#fff',height:Dimensions.get('screen').height}}>
          <StatusBar animated={true} backgroundColor={AppColor.third} />
    
            <View style={{flexDirection:'row',justifyContent:'center',padding:15,borderBottomWidth:1,borderBottomColor:`${AppColor.third}`}}><Icon name="box" size={15} color={AppColor.third} /><Text style={{fontWeight:'bold',textAlign:'center',fontSize:15,marginLeft:5}}>Create Parcel</Text></View>
            <ScrollView>
            <View style={{flexDirection:'row'}}>
            <View style={{width:'50%',height:70}}>
         <InputComp
          mode="outlined"
          right={null}
          label="Name:"
          placeholder="Enter Item Name"
          style={style.name}
          error={name.nameError}
          secureText={false}
          setText={(e) => {
            setName({ ...name, name: e });
          }}
        />
        {name.nameError?( <Text style={{ marginLeft: 25, color: "red" }}>Invalid input.</Text>):null}
      
             </View>
             <View style={{width:'50%',height:70}}>
             <InputComp
          mode="outlined"
          right={null}
          label="Description:"
          placeholder="Enter Item Description"
          style={style.name}
          error={name.nameError}
          secureText={false}
          setText={(e) => {
            setName({ ...name, name: e });
          }}
        />
        {name.nameError?(<Text style={{ marginLeft: 25, color: "red" }}>Invalid input.</Text>):null}
      
             </View>
            </View>

           <View style={{flexDirection:'row',justifyContent:'space-between',marginRight:2,marginLeft:2}}>
           <View style={{width:'49%',borderWidth:1,borderRadius:2}}>
            <Picker
            selectedValue={stateFrom.stateId}
            onValueChange={(itemValue, itemIndex) =>
              setStateFrom({...stateFrom,stateId:itemValue})
            }
            style={{ borderWidth: 1, width: "100%" }}
          >
              <Picker.Item label="State From " value="" />
            {ngState&&(ngState.map((e,i)=>{
              return(
                <Picker.Item key={i} label={e.name} value={e.id} />
              )
            }))}
          
          </Picker>
            </View>

            <View style={{width:'49%',borderWidth:1,borderRadius:2}}>
            <Picker
            selectedValue={stateTo.stateId}
            onValueChange={(itemValue, itemIndex) =>
              setStateTo({...stateTo,stateId:itemValue})
            }
            style={{ borderWidth: 1, width: "80%" }}
          >
              <Picker.Item label="State To" value="" />
            {ngState&&(ngState.map((e,i)=>{
              return(
                <Picker.Item key={i} label={e.name} value={e.id} />
              )
            }))}
          
          </Picker>
            </View>

           </View>

           <View style={{flexDirection:'row',justifyContent:'space-between',marginRight:2,marginLeft:2,marginTop:10}}>
           <View style={{width:'49%',borderWidth:1,borderRadius:2}}>
            <Picker
            selectedValue={stateFrom.stateId}
            onValueChange={(itemValue, itemIndex) =>
              setStateFrom({...stateFrom,stateId:itemValue})
            }
            style={{ borderWidth: 1, width: "100%" }}
          >
              <Picker.Item label="Category " value="" />
            {ngState&&(ngState.map((e,i)=>{
              return(
                <Picker.Item key={i} label={e.name} value={e.id} />
              )
            }))}
          
          </Picker>
            </View>

            <View style={{width:'49%',borderWidth:1,borderRadius:2}}>
            <Picker
            selectedValue={stateTo.stateId}
            onValueChange={(itemValue, itemIndex) =>
              setStateTo({...stateTo,stateId:itemValue})
            }
            style={{ borderWidth: 1, width: "80%" }}
          >
              <Picker.Item label="Packaging" value="" />
            {ngState&&(ngState.map((e,i)=>{
              return(
                <Picker.Item key={i} label={e.name} value={e.id} />
              )
            }))}
          
          </Picker>
            </View>

           </View>
           <View style={{flexDirection:'row'}}>
            <View style={{width:'50%',height:70}}>
         <InputComp
          mode="outlined"
          right={null}
          label="Mass:"
          placeholder="Enter Item Mass:"
          style={style.name}
          error={name.nameError}
          secureText={false}
          setText={(e) => {
            setName({ ...name, name: e });
          }}
        />
        {name.nameError?( <Text style={{ marginLeft: 25, color: "red" }}>Invalid input.</Text>):null}
      
             </View>
             <View style={{width:'50%',height:70}}>
             <InputComp
          mode="outlined"
          right={null}
          label="Volume:"
          placeholder="Enter Item Volume"
          style={style.name}
          error={name.nameError}
          secureText={false}
          setText={(e) => {
            setName({ ...name, name: e });
          }}
        />
        {name.nameError?(<Text style={{ marginLeft: 25, color: "red" }}>Invalid input.</Text>):null}
      
             </View>
            </View>
            <View style={{flexDirection:'row'}}>
            <View style={{width:'50%',height:70}}>
         <InputComp
          mode="outlined"
          right={null}
          label="Quantity:"
          placeholder="Enter Item Quantity:"
          style={style.name}
          error={name.nameError}
          secureText={false}
          setText={(e) => {
            setName({ ...name, name: e });
          }}
        />
        {name.nameError?( <Text style={{ marginLeft: 25, color: "red" }}>Invalid input.</Text>):null}
      
             </View>
             <View style={{width:'50%',height:70}}>
             <InputComp
          mode="outlined"
          right={null}
          label="Identification:"
          placeholder="Identification Means"
          style={style.name}
          error={name.nameError}
          secureText={false}
          setText={(e) => {
            setName({ ...name, name: e });
          }}
        />
        {name.nameError?(<Text style={{ marginLeft: 25, color: "red" }}>Invalid input.</Text>):null}
      
             </View>
            </View>
            <View style={{flexDirection:'column'}}>
            <View style={{height:70}}>
         <InputComp
          mode="outlined"
          right={null}
          label="Location From :"
          placeholder="Enter Item Name"
          style={style.name}
          error={name.nameError}
          secureText={false}
          setText={(e) => {
            setName({ ...name, name: e });
          }}
        />
        {name.nameError?( <Text style={{ marginLeft: 25, color: "red" }}>Invalid input.</Text>):null}
      
             </View>
             <View style={{height:70}}>
             <InputComp
          mode="outlined"
          right={null}
          label="Location To:"
          placeholder="Enter Item Description"
          style={style.name}
          error={name.nameError}
          secureText={false}
          setText={(e) => {
            setName({ ...name, name: e });
          }}
        />
        {name.nameError?(<Text style={{ marginLeft: 25, color: "red" }}>Invalid input.</Text>):null}
      
             </View>
            </View>
            <TouchableOpacity>
              {IconComp ("images" ,{marginLeft:10},25,AppColor.third)}
            </TouchableOpacity>
             <TouchableOpacity style={{margin:10,borderRadius:5,height:50,justifyContent:'center',backgroundColor:`${AppColor.third}`}}>
               <Text style={{textAlign:'center',fontSize:15,fontWeight:'bold',color:'#fff'}}>CREATE PARCEL</Text>
             </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const style=StyleSheet.create({
    name:{
    height:50,
    margin:2, 
    },
})
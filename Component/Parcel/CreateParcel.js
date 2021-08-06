import React, { useState } from 'react';
import { View,Text, ScrollView,StyleSheet} from 'react-native';
import { AppColor } from '../WorkerComp/AppColor';
import Icon from 'react-native-vector-icons/FontAwesome5';
import InputComp from '../WorkerComp/InputComp';

export default function CreateParcel(){
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
    return(
        <View>
            <View style={{flexDirection:'row',justifyContent:'center',padding:15,borderBottomWidth:1,borderBottomColor:`${AppColor.third}`}}><Icon name="box" size={15} color={AppColor.third} /><Text style={{fontWeight:'bold',textAlign:'center',fontSize:15,marginLeft:5}}>Create Parcel</Text></View>
            <ScrollView>
             <View>
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
        {name.nameError?(
          <Text style={{ marginLeft: 25, color: "red" }}>Invalid input.</Text>):null}
      
             </View>
             <View>
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
        {name.nameError?(
          <Text style={{ marginLeft: 25, color: "red" }}>Invalid input.</Text>):null}
      
             </View>
             <View>
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
        {name.nameError?(
          <Text style={{ marginLeft: 25, color: "red" }}>Invalid input.</Text>):null}
      
             </View>
            </ScrollView>
        </View>
    )
}

const style=StyleSheet.create({
    name:{

    },
})
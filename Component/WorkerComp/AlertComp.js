import React from 'react';
import {View,TouchableOpacity,StyleSheet} from 'react-native';
import { IconComp } from './ExternalFunction';
import BtnComp from './BtnComp';
export default function AlertComp({name,description,btn1,btn2}){
   
    return(
        <View>
            <View>
            <View>
                <TouchableOpacity>
                {IconComp("check",{},25,"#000")}
                </TouchableOpacity>

                <Text>{name}</Text>
                <TouchableOpacity>
                {IconComp("check",{},25,"#000")}
                </TouchableOpacity>
            </View>
            <View>
                <Text>{description}</Text>
                <View>
                    <BtnComp mode="outlined" func={()=>console.log("test")} name={btn1.name}/>
                    <BtnComp mode="outlined" func={()=>console.log("test")} name={btn2.name}/>
                </View>
            </View>
            </View>
        </View>
    )
}

const style=StyleSheet.create({

})
import React from 'react';
import {View,StyleSheet,ImageBackground,ScrollView,TouchableOpacity} from 'react-native';
import package from '../Assets/package.jpg';
export default function VehicleType(){
    return(
        <View>
         <ImageBackground 
         source={package}
         resizeMode="cover"
         blurRadius={2}
         >
            <Text> Hello  Ani</Text> 
            <Text>Please select the most suitable vehicle to pickup your items(s).</Text>
         </ImageBackground>
         <ScrollView>
          <TouchableOpacity>
            
          </TouchableOpacity>
         </ScrollView>
        </View>
    )
}

const style=StyleSheet.create({
   image:{
       flex:1,
       justifyContent:'center',
   }
})
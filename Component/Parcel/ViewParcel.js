import React from 'react';
import { View,Text, ScrollView,StyleSheet} from 'react-native';
import { AppColor } from '../WorkerComp/AppColor';
import { IconComp} from '../WorkerComp/ExternalFunction';
export default function ViewParcel({parcel}){
    console.log(parcel);
   
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
    return(
        <View>
            <Text style={{fontWeight:'bold',textAlign:'center',fontSize:18}}> View Parcel</Text>
            <ScrollView style={{height:500}}>
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
                IconComp("box",{width:70,height:70,textAlign:"center"},50,AppColor.third)}
                 
              </View>
                {viewComp("Name:",parcel.name)}
                {viewComp("Code:",parcel.code)}
                {viewComp("CostPayable:",parcel.costPayable)}
                {viewComp("Description:",parcel.description)}
                {viewComp("Identification:",parcel.identification)}
                {viewComp("Location To:",parcel.locationTo.address)}
                 {viewComp("Quantity:",parcel.quantity)}
                {viewComp("Receipient Phone:",parcel.recipientPhone)}
                {viewComp("Routing:",parcel.routing)}
                {viewComp("Worth:",parcel.worth)}
                {viewComp("Date:",parcel.updatedAt.splitt(":")[0])}
                {/** Edit Delete */}
                </View>)}
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
    }
})
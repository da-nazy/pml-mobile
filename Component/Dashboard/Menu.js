import React,{useState} from 'react';
import { TextInput,Dimensions,View,Text,TouchableOpacity,StyleSheet,StatusBar,ImageBackground,Image,ScrollView,ActivityIndicator} from 'react-native';
import { AppColor } from '../WorkerComp/AppColor';
import menu_bg from '../Assets/menu_bg.png';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default function Menu({navigation}){
  const {navigate}=navigation;
    const [wallet,setWallet]=useState({
        walletLodaded:true,
    })
    const [menuItem,setMenuItem]=useState([
      {
        icon: "box",
        name: "Parcels",
        callAction: 'Create  Items',
        // To pass pickup param
        func: () => {
           navigate('Parcel');
        },
        id: 1,
      },
      {
        icon: "boxes",
        name: "Pickups",
        callAction: "Request Pickups",
        // To pass pickup param
        func: () => {
         navigate('Pickup');
        },
        id: 2,
      },
      {
        icon: "ship",
        name: "Ship",
        callAction: "Shipped Items",
        // To pass pickup param
        func: () => {
         navigate('Ship');
        },
        id: 3,
      },
      {
        icon: "wallet",
        name: "Transactions",
        callAction: "Customer Transactions",
        // To pass pickup param
        func: () => {
         navigate('Transaction');
        },
        id: 4,
      },
      {
        icon: "shipping-fast",
        name: "Xpress Pickup",
        callAction: "Fast Track Pickup",
        // To pass pickup param
        func: () => {
        navigate('XpressPickup')
        },
        id: 4,
      },
    ])
    return (

        <View>
        <StatusBar animated={true} backgroundColor={AppColor.third} />
        <View style={{ backgroundColor: "#000", height: 240 }}>
          <ImageBackground
            source={menu_bg}
            resizeMode="cover"
            style={style.image}
            blurRadius={3}
          >
            <View
              style={{ top: -45, justifyContent: "center", alignItems: "center" }}
            >
              <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>
                PMT
              </Text>
              <Text style={{ fontSize: 6, fontWeight: "bold", color: "#fff" }}>
                LOGISTICS
              </Text>
            </View>
            <Text
              style={{
                fontSize: 25,
                top: -20,
                textAlign: "center",
                color: "#fff",
              }}
            >
              Hello!, Ani
            </Text>
           
            <View style={{flexDirection:'row',justifyContent:"center"}}><TextInput style={{width:160,height:40,marginLeft:10,borderRadius:5,backgroundColor:'#fff',padding:5}}/><TouchableOpacity style={{height:40,width:75,marginLeft:5,borderRadius:5,justifyContent:'center',backgroundColor:`${AppColor.third}`}}><Text style={{fontWeight:'bold',textAlign:'center',color:'#fff'}}>Track</Text></TouchableOpacity></View>
            <TouchableOpacity
              style={{ top: 40 }}
              onPress={() => navigate("Profile")}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize:15,
                  marginBottom:10,
                  color: "#fff",
                }}
              >
                View Profile
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        {/** Can be in a scroll view for swipe referesh of account */}
        <ScrollView style={style.menu_bdy}>
          <View
            style={{
              margin: 10,
              marginTop: 15,
              height: 80,
              borderRadius: 5,
              backgroundColor: "#F0F0F0",
              padding: 5,
            }}
          >
            <Text style={{ marginLeft: 15 }}>Wallet Balance</Text>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 15,
                marginTop: 5,
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    marginRight: 10,
                    backgroundColor: "#FCE1D0",
                    height: 40,
                    borderWidth: 1,
                    borderColor: "#F8B890",
                    width: 40,
                    justifyContent: "center",
                    borderRadius: 20,
                  }}
                >
                  <Icon
                    style={{ textAlign: "center" }}
                    name="wallet"
                    size={15}
                    color={AppColor.third}
                  />
                </View>
                {wallet.walletLodaded ? (
                  <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
                    {"\u20A6"} 0.0
                  </Text>
                ) : (
                  <ActivityIndicator size="small" color={AppColor.third} />
                )}
              </View>
              <TouchableOpacity
                style={{
                  borderColor: `${AppColor.third}`,
                  backgroundColor: `${AppColor.third}`,
                  flexDirection: "row",
                  borderWidth: 1,
                  height: 35,
                  width: 90,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 15,
                }}
              >
                <Text
                  style={{ fontWeight: "bold", marginRight: 5, color: "#fff" }}
                >
                  Wallet
                </Text>
                <Icon name="eye" size={15} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: 450,
              margin: 5,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
          >
            {menuItem &&
              menuItem.map((e, i) => {
                return (
                  <TouchableOpacity
                    onPress={() => e.func()}
                    key={i}
                    style={{
                      width: "47%",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 5,
                      height: 130,
                      borderRadius: 5,
                      backgroundColor: "#F0F0F0",
                    }}
                  >
                    <Icon name={e.icon} size={40} color="#000" />
                    <Text style={{ fontWeight: "bold",color:`${AppColor.third}` }}>{e.name}</Text>
                    {e.callAction ? <Text>{e.callAction}</Text> : null}
                  </TouchableOpacity>
                );
              })}
          </View>
        </ScrollView>
      </View>
      )
}
 const style=StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center",
      },
      menu_bdy: {
        height: Dimensions.get("screen").height/1.62,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        top: -20,
        backgroundColor: "#fff",
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
      },
 })
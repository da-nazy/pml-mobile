import React from "react";
import {FAB} from "react-native-paper";
import { View, StyleSheet, Dimensions } from "react-native";
export default function CustomFab({ fabFunc,iconName }) {

  return (
   
<View>
  {iconName?<FAB style={style.fab} small icon={iconName} onPress={() => fabFunc()} />
  :<FAB style={style.fab} small icon="plus" onPress={() => fabFunc()} />
}
</View>
  );
}
const style = StyleSheet.create({
  fab: {
    backgroundColor: "#9A1D93",
    position: "absolute",
    right: 0,
    bottom:0,
    right: 15,
    marginBottom:-35,
  
  },
});

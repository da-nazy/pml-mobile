import React from "react";
import {FAB} from "react-native-paper";
import { View, StyleSheet, Dimensions } from "react-native";
import { AppColor } from "./AppColor";
export default function CustomFab({ fabFunc,iconName }) {

  return (
   
<View>
  {iconName?<FAB style={style.fab} small icon={iconName} color="#fff" onPress={() => fabFunc()} />
  :<FAB style={style.fab} small icon="plus"  color="#fff" onPress={() => fabFunc()} />}
</View>
  );
}
const style = StyleSheet.create({
  fab: {
    backgroundColor:`${AppColor.third}`,
    position: "absolute",
    right: 0,
    bottom:0,
    right: 15,
    marginBottom:-35,
   
  },
});

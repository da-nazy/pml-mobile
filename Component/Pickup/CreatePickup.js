import React from "react";
import { View, Text } from "react-native";
import { AppColor } from "../WorkerComp/AppColor";
import Icon from "react-native-vector-icons/FontAwesome5";
export default function CreatePickup() {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          padding: 15,
          borderBottomWidth: 1,
          borderBottomColor: `${AppColor.third}`,
        }}
      >
        <Icon name="boxes" size={15} color={AppColor.third} />
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 15,
            marginLeft: 5,
          }}
        >
          Create Pickups
        </Text>
      </View>
    </View>
  );
}

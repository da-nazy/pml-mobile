import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { IconComp } from './ExternalFunction';
import { AppColor } from './AppColor';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function Header({ text, iconName, size, iconFunc }) {
	return (
		<View style={{ ...style.contHd }}>
			<TouchableOpacity onPress={() => iconFunc()}>
				{IconComp('bars', null, 25, AppColor.third)}
			</TouchableOpacity>
			<View
				style={[
					style.iconText,
					iconName
						? { width: '85%' }
						: {
								justifyContent: 'center',
								marginRight: '15%',
						  },
				]}
			>
				{IconComp(iconName, null, size ? size : 20, AppColor.third)}
				<Text style={style.contTxtHd}>{text}</Text>
			</View>
		</View>
	);
}

const style = StyleSheet.create({
	iconText: {
		flexDirection: 'row',
		width: '80%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	contHd: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: `${AppColor.third}`,
	},
	contTxtHd: {
		fontWeight: 'bold',
		fontSize: 15,
		marginLeft: 5,
	},
});

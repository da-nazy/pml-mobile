import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AppColor } from './AppColor';
import {
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { UserContext } from '../DataProvider/UserContext';
import { removeToken } from './ExternalFunction';
import { StackActions } from '@react-navigation/native';

export const UserDrawerContent = (props) => {
	const [appDetails, setAppDetails] = useState({
		name: '',
	});
	const usercontext = useContext(UserContext);
	const { user, authUser, setAuthUser, setUser } = usercontext;

	const logOut = () => {
		removeToken()
			.then((check) => {
				setAuthUser(
					{ ...authUser, token: null },
					setUser(
						null,
						props.navigation.dispatch(StackActions.replace('Login'))
					)
				);
			})
			.catch((err) => {});
	};
	const [currentIndex, setCurrentIndex] = useState(0);
	const [sideBar] = useState([
		{
			icon: 'bars',
			name: 'Menu',
			func: (e) => setCurrentIndex(e, props.navigation.navigate('Menu')),
		},
		{
			icon: 'phone-volume',
			name: 'Support',
			func: (e) => setCurrentIndex(e, props.navigation.navigate('Support')),
		},
		{
			icon: 'box',
			name: 'Parcels',
			func: (e) => setCurrentIndex(e, props.navigation.navigate('Parcel')),
		},
		{
			icon: 'thumbtack',
			name: 'Track Parcel',
			func: (e) => setCurrentIndex(e, props.navigation.navigate('Track')),
		},
		{
			icon: 'wallet',
			name: 'Wallet',
			func: (e) => setCurrentIndex(e, props.navigation.navigate('Wallet')),
		},
		{
			icon: 'clipboard-check',
			name: 'Delivery History',
			func: (e) => setCurrentIndex(e, props.navigation.navigate('History')),
		},

		{
			icon: 'sign-out-alt',
			name: 'Logout',
			// need to disable going back
			func: (e) => setCurrentIndex(e, logOut()),
			/*props.navigation.navigate('Login'),*/
		},
	]);
	useEffect(() => {
		if (user) {
			setAppDetails({ ...appDetails, name: user.name ? user.name : 'PMT' });
		}
	}, [user]);

	return (
		<DrawerContentScrollView {...props}>
			<View>
				<View
					style={{
						paddingLeft: 20,
						borderBottomColor: `${AppColor.third}`,
						borderBottomWidth: 1,
						margin: 5,
						paddingBottom: 10,
					}}
				>
					<View style={{ flexDirection: 'row', marginTop: 30 }}>
						<TouchableOpacity
							style={{
								backgroundColor: '#bbbbbb',
								height: 70,
								width: 70,
								justifyContent: 'center',
								borderRadius: 35,
							}}
							onPress={() => props.navigation.navigate('Profile')}
						>
							<Icon
								style={{ textAlign: 'center' }}
								name='user'
								color='#3F3F3F'
								size={30}
							/>
						</TouchableOpacity>
					</View>
					<Text style={{ marginTop: 10, marginLeft: 15, fontWeight: '600' }}>
						{user ? `${user.surname} ${user.otherName}` : 'Ani Daniel'}
					</Text>
				</View>
				<View style={{ marginTop: 35, marginLeft: 15 }}>
					{sideBar &&
						sideBar.map((e, i) => {
							return (
								<TouchableOpacity
									key={i}
									onPress={() => e.func(i)}
									style={
										i === currentIndex
											? { ...style.activTab }
											: { ...style.actTab }
									}
								>
									<Icon
										name={e.icon}
										size={20}
										color={i === currentIndex ? '#fff' : AppColor.third}
										style={{ ...style.actIcon }}
									/>
									<Text style={{ fontSize: 15 }}>{e.name}</Text>
								</TouchableOpacity>
							);
						})}
				</View>
			</View>
		</DrawerContentScrollView>
	);
};

const style = StyleSheet.create({
	actIcon: {
		marginRight: 15,
		fontSize: 15,
		marginTop: 4,
	},
	actTab: {
		flexDirection: 'row',
		marginBottom: 15,
		height: 40,
		alignItems: 'center',
		paddingLeft: 10,
		borderBottomLeftRadius: 10,
	},
	activTab: {
		backgroundColor: `${AppColor.transThird}`,
		flexDirection: 'row',
		marginBottom: 15,
		height: 40,
		alignItems: 'center',
		paddingLeft: 10,
		borderBottomLeftRadius: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
});

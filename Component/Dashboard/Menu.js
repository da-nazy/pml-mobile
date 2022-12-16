import React, { useState, useContext, useEffect } from 'react';
import {
	TextInput,
	Dimensions,
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	StatusBar,
	ImageBackground,
	Image,
	ScrollView,
	ActivityIndicator,
} from 'react-native';
import { AppColor } from '../WorkerComp/AppColor';
import menu_bg from '../Assets/menu_bg.png';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { UserContext } from '../DataProvider/UserContext';
import { api, apiRequest } from '../WorkerComp/Api';
import { IconComp } from '../WorkerComp/ExternalFunction';
import { useToast } from 'react-native-styled-toast';
export default function Menu({route, navigation }) {
	const {toast}=useToast();
	const usercontext = useContext(UserContext);
	const { user, userWallet, setUserWallet, authUser } = usercontext;
	const { navigate } = navigation;
     const [appDetails,setAppDetails]=useState({
		firstTime:false
	 })
	
	const [trackNumber, setTrackNumber] = useState({
		number: '',
		error: false,
	});
	const checkTrackNumber = () => {
		if (!trackNumber.number) {
			setTrackNumber({ ...trackNumber, error: true });
		} else {
			setTrackNumber(
				{ ...trackNumber, error: false },
				navigate('Track', { number: trackNumber.number })
			);
		}
	};



	


	useEffect(
		() => {
			if (!userWallet) {
				
				getUserWallet();
			}
		},

		// eslint-disable-next-line
		[userWallet]
	);

	

	const [wallet, setWallet] = useState({
		walletLodaded: true,
		amount: '',
	});
	const menuItem = [
		{
			icon: 'box',
			name: 'Parcels',
			callAction: 'Create  Items',
			// To pass pickup param
			func: () => {
				navigate('Parcel');
			},
			id: 1,
		},

		{
			icon: 'ship',
			name: 'Shipment',
			callAction: 'Outbound Items',
			// To pass pickup param
			func: () => {
				navigate('Ship');
			},
			id: 3,
		},
		{
			icon: 'money-bill-wave',
			name: 'Transactions',
			callAction: 'Payment',
			// To pass pickup param
			func: () => {
				navigate('Transaction');
			},
			id: 4,
		},
		{
			icon: 'map-pin',
			name: 'Track',
			callAction: 'Items on transit',
			// To pass pickup param
			func: () => {
				navigate('Track');
			},
			id: 5,
		},
	];

	const failReq = (e) => {
		//(e);
	};
	const succReq = (e) => {
		// (e);
	};
	const userWalletPayload = (e) => {
		
		if (e.data.payload.length !== 0) {
			if (e.data.payload[0].balance) {
				setUserWallet(e.data.payload[0]	);
			//	setWallet({ ...wallet, amount: e.data.payload[0].balance });
			}
		} else {
		}
	};
	const getUserWallet = () => {
		var walletObject = {
			method: 'get',
			url: `${api.localUrl}${api.userWallet}`,
			headers: {
				Authorization: ' Bearer ' + authUser.token,
				'Cache-Control': 'no-cache',
			},
		};
		
		apiRequest(
			walletObject,
			(e) => setWallet({ ...wallet, walletLodaded: !e }),
			(e) => succReq(e),
			(e) => failReq(e),
			(e) => userWalletPayload(e)
		);
	};
	return (
		<ScrollView
			style={{
				height: Dimensions.get('screen').height,
				backgroundColor: '#fff',
				
			}}
		>
			<StatusBar animated={true} backgroundColor={AppColor.third} />
			<View style={{ backgroundColor: '#000', height: 240 }}>
				<TouchableOpacity
					onPress={() => navigation.toggleDrawer()}
					style={{
						...style.navBar,
					}}
				>
					{IconComp('bars', null, 25, '#fff')}
				</TouchableOpacity>
				<ImageBackground
					source={menu_bg}
					resizeMode='cover'
					style={style.image}
					blurRadius={3}
				>
					<View
						style={{ top: -45, justifyContent: 'center', alignItems: 'center' }}
					>
						<Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff' }}>
							PMT
						</Text>
						<Text style={{ fontSize: 6, fontWeight: 'bold', color: '#fff' }}>
							LOGISTICS
						</Text>
					</View>
					<Text
						style={{
							fontSize: 25,
							top: -20,
							textAlign: 'center',
							color: '#fff',
						}}
					>
						Hello!, {user?.surname ? user.surname : ''}
					</Text>

					<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
						<TextInput
							placeholder='Parcel Code'
							placeholderTextColor={AppColor.third}
							keyboardType='numeric'
							onChangeText={(e) =>
								setTrackNumber({ ...trackNumber, number: e })
							}
							style={{
								...style.trackInput,
							}}
						/>
						<TouchableOpacity
							onPress={() => checkTrackNumber()}
							style={{
								height: 40,
								width: 75,
								marginLeft: 5,
								borderRadius: 5,
								justifyContent: 'center',
								backgroundColor: `${AppColor.third}`,
							}}
						>
							<Text
								style={{
									fontWeight: 'bold',
									textAlign: 'center',
									color: '#fff',
								}}
							>
								Track
							</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						style={{ top: 40 }}
						onPress={() => navigate('Profile')}
					>
						<Text
							style={{
								textAlign: 'center',
								fontWeight: 'bold',
								fontSize: 15,
								marginBottom: 10,
								color: '#fff',
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
						backgroundColor: '#F0F0F0',
						padding: 5,
					}}
				>
					<Text style={{ marginLeft: 15 }}>Wallet Balance</Text>
					<View
						style={{
							flexDirection: 'row',
							marginLeft: 15,
							marginTop: 5,
							justifyContent: 'space-between',
						}}
					>
						<View style={{ flexDirection: 'row' }}>
							<View
								style={{
									marginRight: 10,
									backgroundColor: '#FCE1D0',
									height: 40,
									borderWidth: 1,
									borderColor: '#F8B890',
									width: 40,
									justifyContent: 'center',
									borderRadius: 20,
								}}
							>
								<Icon
									style={{ textAlign: 'center' }}
									name='wallet'
									size={15}
									color={AppColor.third}
								/>
							</View>
							{wallet.walletLodaded ? (
								<Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>
									{'\u20A6'}
									{userWallet? userWallet.balance:'0'}
								</Text>
							) : (
								<ActivityIndicator size='small' color={AppColor.third} />
							)}
						</View>
						<TouchableOpacity
							onPress={() => setUserWallet(null, navigate('Wallet'))}
							style={{
								...style.walletBtn,
							}}
						>
							<Text
								style={{ fontWeight: 'bold', marginRight: 5, color: '#fff' }}
							>
								Wallet
							</Text>
							<Icon name='eye' size={15} color='#fff' />
						</TouchableOpacity>
					</View>
				</View>
				<View
					style={{
						height: 500,
						margin: 5,
						flexDirection: 'row',
						flexWrap: 'wrap',
						justifyContent: 'space-evenly',
					}}
				>
					{menuItem &&
						menuItem.map((e, i) => {
							return (
								<TouchableOpacity
									onPress={() => e.func()}
									key={i}
									style={{
										...style.walletComp,
									}}
								>
									<Icon name={e.icon} size={40} color={AppColor.third} />
									<Text
										style={{ fontWeight: 'bold', color: `${AppColor.primary}` }}
									>
										{e.name}
									</Text>
									{e.callAction ? <Text>{e.callAction}</Text> : null}
								</TouchableOpacity>
							);
						})}
				</View>
			</ScrollView>
		</ScrollView>
	);
}
const style = StyleSheet.create({
	navBar: {
		marginBottom: -40,
		zIndex: 10,
		paddingLeft: 15,
		paddingTop: 8,
	},
	walletBtn: {
		borderColor: `${AppColor.third}`,
		backgroundColor: `${AppColor.third}`,
		flexDirection: 'row',
		borderWidth: 1,
		height: 35,
		width: 90,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 15,
	},
	trackInput: {
		width: 160,
		height: 40,
		marginLeft: 10,
		borderRadius: 5,
		backgroundColor: '#fff',
		padding: 5,
		borderRadius: 1,
	},
	image: {
		flex: 1,
		justifyContent: 'center',
	},
	menu_bdy: {
		height: '100%',
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
		top: -20,
		backgroundColor: '#fff',
	},
	walletCont: {},
	walletComp: {
		width: '47%',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 5,
		height: 130,
		borderRadius: 5,
		backgroundColor: '#F0F0F0',
	},
});

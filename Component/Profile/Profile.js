import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppColor, emailCheck, phoneCheck } from '../WorkerComp/AppColor';
import InputComp from '../WorkerComp/InputComp';
import { UserContext } from '../DataProvider/UserContext';
import LoaderComp from '../WorkerComp/LoaderComp';
import { api, apiRequest } from '../WorkerComp/Api';
import { StackActions } from '@react-navigation/native';
export default function Profile({ navigation }) {
	const usercontext = useContext(UserContext);
	const { navigate } = navigation;
	const { user, authUser, setUser } = usercontext;

	const [appDetails, setAppDetails] = useState({
		load: false,
	});
	const [profile, setProfile] = useState({
		image: null,
		edit: false,
	});

	const [firstName, setFirstName] = useState({
		name: '',
		fnError: false,
	});

	const [lastName, setLastName] = useState({
		name: '',
		lnError: false,
	});

	const [emailAddress, setEmailAddress] = useState({
		address: '',
		emError: false,
	});

	const [phoneNumber, setPhoneNumber] = useState({
		number: '',
		pnError: false,
	});

	const updateCleanUp = () => {
		setProfile({ ...profile, edit: false });
	};

	useEffect(() => {
		return () => {
			updateCleanUp();
		};
	}, []);

	const checkInput = () => {
		var check;
		var updateObject = {};

		if (firstName.name) {
			updateObject['surname'] = firstName.name;
			check = true;
		} else {
			///delete updateObject['surname']
		}
		if (lastName.name) {
			updateObject['otherName'] = lastName.name;
			check = true;
		} else {
			// do nothing for now
		}
		if (emailAddress.address) {
			if (!emailCheck(emailAddress.address)) {
				setEmailAddress({ ...emailAddress, emError: true });
				check = false;
			} else {
				setEmailAddress({ ...emailAddress, emError: false });
				updateObject['email'] = emailAddress.address;
			}
		}

		if (phoneNumber.number) {
			if (!phoneCheck(phoneNumber.number)) {
				setPhoneNumber({ ...phoneNumber, pnError: true });
				check = false;
			} else {
				setPhoneNumber({ ...phoneNumber, pnError: false });
				updateObject['phone'] = phoneNumber.number;
			}
		}
		updateObject['check'] = check;

		return updateObject;
	};
	const updateProfile = () => {
		if (checkInput().check === 'undefined') {
			Alert.alert('Message', 'No update made!');
		}
		if (checkInput().check === false) {
		}
		if (checkInput().check === true) {
			updateCustomer(checkInput());
		}
	};

	const updateCustomer = (e) => {
		// to remove the check property in e
		delete e.check;

		var updateObject = {
			method: 'put',
			url: `${api.localUrl}${api.editCustomer}/${user.id}`,
			data: { ...e },
			headers: {
				Authorization: ' Bearer ' + authUser.token,
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
			},
		};

		apiRequest(
			updateObject,
			(e) => setAppDetails({ ...appDetails, load: e }),
			(e) => succ(e),
			(e) => fail(e),
			(e) => {
				updatePayload(e);
			}
		);
	};
	const succ = (e) => {};
	const fail = (e) => {};
	const updatePayload = (e) => {
		if (e.data.success) {
			setProfile({ ...profile, edit: false });
			// setFirstName({...firstName,name:null});
			// setLastName({...lastName,name:null});
			// setEmailAddress({...emailAddress,address:null});
			// setPhoneNumber({...phoneNumber,number:null});
			// getProfile();
		}
	};

	const getProfile = () => {
		var userObject = {
			method: 'get',
			url: `${api.localUrl}${api.userProfile}`,
			headers: {
				Authorization: ' Bearer ' + authUser.token,
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
			},
		};

		apiRequest(
			userObject,
			(e) => {
				setAppDetails({ ...appDetails, load: e });
			},
			(e) => {
				succ(e);
			},
			(e) => {
				fail(e);
			},
			(e) => {
				userProfilePayload(e);
			}
		);
	};

	const userProfilePayload = (e) => {
		setUser(e.data.payload);
	};

	return (
		<View style={{ margin: 15 }}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<View
					style={{
						marginTop: 40,
						justifyContent: 'center',
						flexDirection: 'row',
						alignItems: 'center',
						marginBottom: 40,
					}}
				>
					<Icon name='user' size={65} color='#3F3F3F' />
					{profile.edit && (
						<TouchableOpacity
							style={{
								height: 25,
								width: 25,
								borderRadius: 15,
								justifyContent: 'center',
								marginTop: 50,
								marginLeft: -10,
								backgroundColor: '#fff',
							}}
						>
							<Icon
								style={{ textAlign: 'center' }}
								name='camera'
								size={15}
								color={AppColor.third}
							/>
						</TouchableOpacity>
					)}
				</View>
				<View style={{ flexDirection: 'row', marginTop: 40 }}>
					<TouchableOpacity onPress={() => navigate('ResetPassword')}>
						<Text
							style={{
								textDecorationLine: 'underline',
								marginRight: 10,
								marginLeft: 10,
								color: `${AppColor.third}`,
							}}
						>
							Change Password{' '}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setProfile({ ...profile, edit: !profile.edit })}
					>
						<Icon color='#000' size={15} name='edit' />
					</TouchableOpacity>
				</View>
			</View>
			<View>
				<InputComp
					inputType='name'
					value={firstName.name ? firstName.name : user.surname && user.surname}
					mode='outlined'
					right={null}
					label='First Name'
					style={style.name}
					error={firstName.fnError}
					secureText={false}
					disabled={!profile.edit}
					setText={(e) => {
						setFirstName({ ...firstName, name: e });
					}}
				/>
				{firstName.fnError ? (
					<Text style={{ marginLeft: 25, color: 'red' }}>
						Invalid First Name
					</Text>
				) : null}
			</View>
			<View>
				<InputComp
					value={lastName.name ? lastName.name : user && user.otherName}
					inputType='name'
					mode='outlined'
					right={null}
					label='Last Name'
					style={style.name}
					error={lastName.lnError}
					secureText={false}
					disabled={!profile.edit}
					setText={(e) => {
						setLastName({ ...lastName, name: e });
					}}
				/>
				{lastName.lnError ? (
					<Text style={{ marginLeft: 25, color: 'red' }}>
						Invalid Last Name
					</Text>
				) : null}
			</View>
			<View>
				<InputComp
					value={
						emailAddress.address ? emailAddress.address : user && user.email
					}
					inputType='name'
					mode='outlined'
					right={null}
					label='Email Address'
					style={style.name}
					error={emailAddress.emError}
					secureText={false}
					disabled={!profile.edit}
					setText={(e) => {
						setEmailAddress({ ...emailAddress, address: e });
					}}
				/>
				{emailAddress.emError ? (
					<Text style={{ marginLeft: 25, color: 'red' }}>Invalid Email</Text>
				) : null}
			</View>
			<View>
				<InputComp
					value={phoneNumber.number ? phoneNumber.number : user && user.phone}
					inputType='telephoneNumber'
					mode='outlined'
					right={null}
					label='phone'
					style={style.name}
					error={phoneNumber.pnError}
					secureText={false}
					disabled={!profile.edit}
					setText={(e) => {
						setPhoneNumber({ ...phoneNumber, number: e });
					}}
				/>
				{phoneNumber.pnError ? (
					<Text style={{ marginLeft: 25, color: 'red' }}>
						Invalid Phone Number
					</Text>
				) : null}
			</View>
			<View style={{ flexDirection: 'row', marginTop: 10 }}>
				<Text style={style.dcText}>Dispatcher Code: </Text>
				<Text style={{ color: '#000', fontSize: 11 }}>{profile.id}</Text>
			</View>
			<View
				style={{
					flexDirection: 'row',
					marginTop: 20,
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				{profile.edit && (
					<TouchableOpacity
						style={style.updateBtn}
						onPress={() => updateProfile()}
					>
						<Text
							style={{
								textAlign: 'center',
								fontSize: 15,
								fontWeight: 'bold',
								color: '#fff',
							}}
						>
							Update
						</Text>
					</TouchableOpacity>
				)}
				<TouchableOpacity
					onPress={() => navigation.dispatch(StackActions.replace('Login'))}
					style={{ justifyContent: 'center', marginRight: 5 }}
				>
					<Text style={{ fontWeight: 'bold', color: '#bbbbbb' }}>Logout</Text>
				</TouchableOpacity>
			</View>
			{appDetails.load && <LoaderComp size={40} color={AppColor.third} />}
		</View>
	);
}

const style = StyleSheet.create({
	name: { height: 45, marginTop: 15 },
	dcText: {
		fontWeight: 'bold',
		color: '#000',
	},

	updateBtn: {
		height: 40,
		width: 100,
		borderRadius: 5,
		backgroundColor: `${AppColor.third}`,
		justifyContent: 'center',
		shadowColor: `${AppColor.third}`,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
});

import React, { useState, useContext, useRef } from 'react';
import {
	StatusBar,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	ScrollView,
	Alert,
	Switch,
} from 'react-native';
import InputComp from '../WorkerComp/InputComp';
import { AppColor, regX } from '../WorkerComp/AppColor';
import { apiRequest, api } from '../WorkerComp/Api';
import LoaderComp from '../WorkerComp/LoaderComp';
import { UserContext } from '../DataProvider/UserContext';
import ResetPassword from '../ResetPassword/ResetPassword';
import { StackActions } from '@react-navigation/native';
import Custombtm from '../WorkerComp/Custombtm';
import { TextInput } from 'react-native-paper';
import { useToast } from 'react-native-styled-toast';
import useNetworkState from '../WorkerComp/networkState';
import { storeToken,validateEmail,validatePhone } from '../WorkerComp/ExternalFunction';
export default function Login({ navigation }) {
	const btmRef = useRef(null);
	const {toast}=useToast();
	const netState=useNetworkState();

	const usercontext = useContext(UserContext);
	const { authUser, setAuthUser, user, setUser } = usercontext;
	const { navigate } = navigation;
	const [isOtpEnabled, setOtpIsEnabled] = useState(false);

	const toggleSwitch = () => setOtpIsEnabled((previousState) => !previousState);
	
	const [appOp, setAppOp] = useState({
		load: false,
		token: '',
		userid: '',
	});
   
	const netcheck=()=>{

		if(netState=true){
			// network is available
		}else{
			//not network
		}
	}
	const pwdAlert = (e, m) => {
		return Alert.alert(e, m);
	};
	const [appUser, setAppUser] = useState({
		type: '',
		emailPhone: '',
		password: '',
		emailPhoneError: false,
		passwordError: false,
		passwordSecure: true,
	});
	  
	
	

	
	const resetpwdFail = (e) => {
		Alert.alert('Error', e);
	};
	const resetPwdSucc = (e) => {
		//Alert.alert('Success', e);
       toast({
		message:'Password Reset Successful',
		intent:'SUCCESS'
	   })
		btmRef.current.close();
	};
	const userProfilePayload = (e) => {
		if (e.data.success) {
			setUser(
				e.data.payload,
				setAppOp({ ...appOp, userid: e.data.payload.id })
			);
			if (isOtpEnabled) {
				// request for the btm
				btmRef.current.open();
			} else {
				// ("No otp");
				// should login
				navigation.dispatch(StackActions.replace('Dashboard'));
			}
		}
	};

	const userProfileSuc = (e) => {
		toast({
			message:'Login  Successful',
			intent:'SUCCESS'
		   })
	
	};
	const userProfileFail = (e) => {
		return Alert.alert('Error', e);
	};
	const getUser = (e) => {
		// To get the user
		// check if network exist
		if(netState){
			var userObject = {
				method: 'get',
				url: `${api.localUrl}${api.userProfile}`,
				headers: {
					Authorization: ' Bearer ' + e,
					'Cache-Control': 'no-cache',
					Pragma: 'no-cache',
				},
			};
			 
			
			apiRequest(
				userObject,
				(a) => {
					setAppOp({ ...appOp, load: a });
				},
				(a) => {
					userProfileSuc(a);
				},
				(a) => {
					userProfileFail(a);
				},
				(a) => {
					userProfilePayload(a);
				}
			);
		}else{
           toast({
			duration:0,
			message:'Network not found!',
			intent:'ERROR'
		   })
		}
	};
	const requestSuccess = (e) => {
		//console.log(e);
	};
	const requestFailure = (e) => {
		return Alert.alert('Error', e ? e : 'Nothing returned');
	};

	const payload = (e) => {
		if (e.data.payload.token) {
			storeToken(e.data.payload.token)
				.then((check) => {
					//  (check);
					setAuthUser({ ...authUser, token: e.data.payload.token });
					getUser(e.data.payload.token);
					setAppOp({ ...appOp, token: e.data.payload.token });
				})
				.catch((err) => {
					// (err);
				});
		}
	};

	const check = () => {
		var inputcheck = true;
		if (!appUser.emailPhone) {
			inputcheck = false;
			setAppUser({ ...appUser, emailPhoneError: true });
		} else {
			
			if (validateEmail(appUser.emailPhone.trim())) {
				setAppUser({ ...appUser, emailPhoneError: false });
				// (user);
				if (!appUser.password) {
					inputcheck = false;
					setAppUser({ ...appUser, passwordError: true });
				} else {
					setAppUser((prevState) => ({
						...prevState,
						passwordError: false,
						emailPhoneError: false,
					}));
				}
			} else if (validatePhone(appUser.emailPhone.trim())) {
				setAppUser((prevState) => ({ ...prevState, emailPhoneError: false }));
				// (user.emailPhoneError,'phone');
				if (!appUser.password) {
					inputcheck = false;
					setAppUser({ ...appUser, passwordError: true });
				} else {
					setAppUser((prevState) => ({
						...prevState,
						passwordError: false,
						emailPhoneError: false,
					}));
				}
			} else {
				inputcheck = false;
				setAppUser({ ...appUser, emailPhoneError: true });
				
			}
		}

		return inputcheck;
	};

	const loginUser=()=>{
		var loginObject = {
			method: 'post',
			url: `${api.localUrl}${api.login}`,
			data: {},
		};
		// loginObject[`${user.type}`]=user.emailPhone;
		var type;
		if (validateEmail(appUser.emailPhone.trim())) {
			type = 'email';
		}
		if (validatePhone(appUser.emailPhone.trim())) {
			type = 'phone';
		}

		if (isOtpEnabled) {
			loginObject.data['otp'] = appUser.password;
		} else {
			loginObject.data['password'] = appUser.password;
		}
		// This section adds the property type to the loginObject
		// loginObject[type]=user.emailPhone;

		loginObject.data[type] = appUser.emailPhone;
		
		apiRequest(
			loginObject,
			(e) => {
				setAppOp({ ...appOp, load: e });
			},
			(e) => {
				requestSuccess(e);
			},
			(e) => {
				requestFailure(e);
			},
			(e) => {
				payload(e);
			}
		);
	}
	const checkInput = () => {
		if (check()) {
			//   Alert.alert("Success","Values correct")
		 
		  if(netState){
			loginUser();
		  }else{
			toast({
				duration:0,
				message:'Network not found!',
				intent:'ERROR'
			   })
		  }
		}
		//  navigate('AppSection');
	};
	return (
		<ScrollView style={{ ...style.scrollCont }}>
			<StatusBar animated={true} backgroundColor={AppColor.third} />
			<View style={{ alignSelf: 'center', marginBottom: 20 }}>
				<Text
					style={{
						fontSize: 40,
						fontWeight: 'bold',
						color: `${AppColor.third}`,
					}}
				>
					PMT
				</Text>
				<Text style={{ textAlign: 'center' }}>LOGISTICS</Text>
			</View>
			<View>
				<InputComp
					mode='outlined'
					right={null}
					label='Email or Phone number'
					style={style.emailPhone}
					error={appUser.emailPhoneError}
					secureText={false}
					setText={(e) => {
						setAppUser({ ...appUser, emailPhone: e });
					}}
				/>
				{appUser.emailPhoneError && (
					<Text style={{ marginLeft: 25, color: 'red' }}>Invalid input.</Text>
				)}
			</View>
			<View>
				<InputComp
					label={isOtpEnabled ? 'Enter OTP' : 'Enter Password'}
					mode='outlined'
					secureText={appUser.passwordSecure}
					style={style.emailPhone}
					error={appUser.passwordError}
					right={
						<TextInput.Icon
							name='eye'
							onPress={() =>
								setAppUser({
									...appUser,
									passwordSecure: !appUser.passwordSecure,
								})
							}
						/>
					}
					setText={(e) => {
						setAppUser({ ...appUser, password: e });
					}}
				/>
				{appUser.passwordError && (
					<Text style={{ marginLeft: 25, color: 'red' }}>Empty Password</Text>
				)}
			</View>

			<View
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
				}}
			>
				<TouchableOpacity
					onPress={() => checkInput()}
					style={{
						backgroundColor: `${AppColor.third}`,
						width: Dimensions.get('screen').width / 1.2,
						alignSelf: 'center',
						marginTop: 40,
						height: 45,
						justifyContent: 'center',
						borderRadius: 3,
					}}
				>
					<Text
						style={{
							textAlign: 'center',
							color: `${AppColor.forth}`,
							fontSize: 15,
							fontWeight: 'bold',
						}}
					>
						Login
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigate('ForgotPassword')}>
					<Text
						style={{
							marginTop: 20,
							textAlign: 'center',
							color: `${AppColor.third}`,
						}}
					>
						Forgot password?
					</Text>
				</TouchableOpacity>
			</View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					marginTop: 35,
				}}
			>
				<Text style={{ color: '#7F7F7F', marginRight: 10 }}>
					Don't have an account?
				</Text>
				<TouchableOpacity onPress={() => navigate('UserRegister')}>
					<Text style={{ color: `${AppColor.third}` }}>Sign up</Text>
				</TouchableOpacity>
			</View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					marginTop: 10,
				}}
			>
				<TouchableOpacity onPress={() => toggleSwitch()}>
					<Text
						style={{
							...style.otpBtn
						}}
					>
					{isOtpEnabled?"Login with Password":"Login With OTP"}	
					</Text>
				</TouchableOpacity>
			</View>
			{appOp.load && <LoaderComp size={25} color={AppColor.third} />}
			<Custombtm
				displayComp={() => (
					<ResetPassword
						token={authUser.token}
						showText={true}
						id={appOp.userid}
						setAlert={(e, m) => pwdAlert(e, m)}
						succ={(e) => resetPwdSucc(e)}
						load={(e) => setAppOp({ ...appOp, load: e })}
						fail={(e) => resetpwdFail(e)}
					/>
				)}
				btmRef={btmRef}
				height={390}
			/>
		</ScrollView>
	);
}

const style = StyleSheet.create({
	otpBtn:{
		color: `${AppColor.third}`,
							textDecorationStyle: 'solid',
							textDecorationLine: 'underline',
							textShadowColor: 'rgba(0, 0, 0, 0.2)',
							textShadowOffset: { width: -1, height: 1 },
							textShadowRadius: 10,
	},
	scrollCont:{
		paddingTop: 100,backgroundColor:'#fff'
	},
	emailPhone: {
		margin: 10,
	},
});

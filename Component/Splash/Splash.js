import React, { useState, useEffect, useContext } from 'react';
import {
	View,
	Text,
	ImageBackground,
	StyleSheet,
	Dimensions,
	Image,
	ScrollView,
} from 'react-native';
import splashImg from '../Assets/splashImg.png';
import pmllog from '../Assets/pmllog.png';
import { StackActions } from '@react-navigation/native';
import LoaderComp from '../WorkerComp/LoaderComp';
import { AppColor } from '../WorkerComp/AppColor';
import { getToken } from '../WorkerComp/ExternalFunction';
import {
	api,
	apiRequest,
	requestApi,
	symbols,
	currentDate,
} from '../WorkerComp/Api';
import { UserContext } from '../DataProvider/UserContext';
import useNetworkState from '../WorkerComp/networkState';
import { useToast } from 'react-native-styled-toast';
export default function Splash({ navigation }) {
	const { navigate } = navigation;
	const {toast}=useToast();

	const usercontext = useContext(UserContext);
	const { user, setUser, setAuthUser, authUser } = usercontext;
	const netState=useNetworkState();
	const [appOp, setAppOp] = useState({
		load: false,
		token: '',
	});

	const netcheck=()=>{
		if(netState===true){
			navigation.dispatch(StackActions.replace('Login'));
		  }else{
			toast({
				duration:0,
				message: 'Network not found!',
				intent:'ERROR'
			  })
		  }
	}

     
       
	useEffect(() => {
		if (appOp.token) {
			setAuthUser({ ...authUser, token: appOp.token });
			if (!user) {
				getProfile(appOp.token);
			}
		}
	}, [appOp.token]);

	useEffect(() => {
		console.log(api.localUrl)
		checkAppVersion();
	}, []);

	const userProfileFail = (e) => {
		console.log(e, 'something happened');
		// check if the payload has expired and send the user to the login section
	    // navigation.dispatch(StackActions.replace('Login'));
	   netcheck();
	};
	
	const versionFail = (e) => {
		console.log(e);
		//navigation.dispatch(StackActions.replace('Login'));
		netcheck();
	};

	const userProfileSuc = (e) => {
		console.log(e);
	};

	const versionSuc = (e) => {
		console.log(e);
	};

	const userPayload = (e) => {
		if (Array.isArray(e.payload) && e.payload.length === 0) {
			// its empty
			navigation.dispatch(StackActions.replace('Login'));
		} else {
			setUser(
				e.payload,
				navigation.dispatch(StackActions.replace('Dashboard',{firstTime:true}))
			);
		}
	};

	const appVersionPayload = (e) => {
		if (e) {
			if (e.data.payload.value) {
				if (e.data.payload.value !== api.versionKey) {
					navigation.dispatch(
						StackActions.replace('Upgrade', { payload: e.data.payload })
					);
				} else {
					checkAppToken();
				}
			} else {
				checkAppToken();
			}
		}
	};
	const getProfile = async (token) => {
		var userObject = {
			method: 'get',
			url: `${api.localUrl}${api.userProfile}`,
			headers: {
				Authorization: ' Bearer ' + token,
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
			},
		};
		
		requestApi(
			userObject,
			(e) => setAppOp({ ...appOp, load: e }),
			(e) => userProfileFail(e),
			(e) => userPayload(e)
		);
	};

	//
	const checkAppVersion = () => {
		var checkObject = {
			method: 'get',
			url: `${api.localUrl}${api.appVersion}`,
			headers: {
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
			},
		};
		

		apiRequest(
			checkObject,
			(e) => {
				setAppOp({ ...appOp, load: e });
			},
			(e) => {
				versionSuc(e);
			},
			(e) => {
				versionFail(e);
			},
			(e) => {
				appVersionPayload(e);
			}
		);
	};
	const checkAppToken = () => {
		setAppOp({...appOp,load:true});
		getToken('token')
			.then((check) => {
				if (check) {
					// token exists
					// check if token is still active
					// check if the user logout
					//if user logout it should set token to null
					// set to the state token
					//(check);
					// console.log(check)
					setAppOp({...appOp,load:false});
					if (!appOp.token) {
						setAppOp({ ...appOp, token: check });
					}else{
						
					}
				} else {
					setAppOp({...appOp,load:false});
					navigation.dispatch(StackActions.replace('Login'));
				}
			})
			.catch((err) => {});
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={{ ...styles.headCont }}>
				<View style={{ ...styles.cont1 }}>
					<Text style={{ ...styles.pmtTxt }}>PMT {'\n'}LOGISTICS</Text>
					<View style={{ ...styles.logoCont }}>
						<Image source={pmllog} style={{ ...styles.logo }} />
					</View>
				</View>
			</View>
			<View style={{ ...styles.splashCont }}>
				<Image source={splashImg} resizeMode='contain' height={270} />
			</View>
			<View style={{ ...styles.cpCont }}>
				<Text style={{ ...styles.ctTxt }}>
					{symbols.copyright}PMT {currentDate()}
				</Text>
			</View>
			{appOp.load && <LoaderComp size={40} color='#433E91' />}
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	cpCont: {
		marginBottom: 20,
	},
	ctTxt: {
		fontSize: 20,
		color: `${AppColor.secondary}`,
		fontWeight: '500',
		textAlign: 'center',
	},
	splashCont: {
		height: 270,
	},
	headCont: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	logoCont: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,

		elevation: 7,
	},
	logo: {
		height: 37,
		width: 40,
	},
	cont1: {
		marginTop: 96,
		width: '85%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		display: 'flex',
	},
	imgCont: {
		height: 37,
		width: 40,
	},
	pmtTxt: {
		fontWeight: '700',
		fontSize: 24,
		color: `${AppColor.secondary}`,
		textShadowRadius: 5,
	},
	image: {
		flex: 1,
		justifyContent: 'center',
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'space-between',
		height: Dimensions.get('screen').height,
	},
	txt: {
		color: '#fff',
		height: 100,
		width: 100,
		borderWidth: 1,
		borderColor: '#fff',
		borderRadius: 5,
		alignSelf: 'center',
		textAlign: 'center',
	},
});

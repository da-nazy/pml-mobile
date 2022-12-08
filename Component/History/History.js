import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions, Alert } from 'react-native';
import { api, apiRequest } from '../WorkerComp/Api';
import { UserContext } from '../DataProvider/UserContext';
import LoaderComp from '../WorkerComp/LoaderComp';
import { AppColor } from '../WorkerComp/AppColor';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ParcelComp from '../Ship/ParcelComp';
import Header from '../WorkerComp/Header';
import Pagination from '../WorkerComp/pagination';
export default function History({navigation}) {
  
	const [page,setPage]=useState('0');
	const [totalPageItems,setTotalPageItems]=useState('');  
	const usercontext = useContext(UserContext);
	const { user, authUser } = usercontext;
	const [history, setHistory] = useState(null);
	const [appDetails, setAppDetails] = useState({
		load: false,
	});

	useEffect(() => { 
		getCompletedPickup();
		return () => setHistory(null);
	}, []);

	const noHistory = () => {
		return (
			<View>
				<Text style={{...style.nhr}}>
					No History Records Found!
				</Text>
			</View>
		);
	};
	const succFunc = (e) => {
		//console.log(e);
	};
	const failFunc = (e) => {
		//  (e)
	};

	const parcelPayload = (e) => {
		if(e.data.payload.length>0){
			setHistory(e.data.payload);
		    setTotalPageItems(e.data.metadata.total);
		}
	};

	const getCompletedPickup = () => {
		var pickupObject = {
			method: 'get',
			url: `${api.localUrl}${api.userParcels}${user.id}&paymentStatus=SUCCESSFUL&populate=items.category,assignment&deliveryStatus=CONFIRMED&skip=${page}&limit=10`,
			headers: {
				Authorization: ' Bearer ' + authUser.token,
				'Cache-Control': 'no-cache',
			},
		};
		apiRequest(
			pickupObject,
			(e) => setAppDetails({ ...appDetails, load: e }),
			(e) => succFunc(e),
			(e) => failFunc(e),
			(e) => parcelPayload(e)
		);
	};
	return (
		<View style={{...style.cont}}>
			<Header iconFunc={()=>navigation.toggleDrawer()} iconName='clipboard-check' size={25} text={'History'} />

			<ScrollView>
				{history
					? history.map((e, i) => {
							return (
								<ParcelComp
									key={i}
									catIcon='boxes'
									parcel={e}
									pickOp={() => null}
									display={true}
								/>
							);
					  })
					: noHistory()}
			{totalPageItems&&<Pagination currentPage={page} setCurrentPage={(e)=>setPage(e)} limit={10} total={totalPageItems} />}
  </ScrollView>

			{appDetails.load && <LoaderComp size={25} color={AppColor.third} />}
		</View>
	);
}

const style = StyleSheet.create({
	nhr:{
		textAlign: 'center', fontWeight: 'bold',marginTop:10
	},
	contHd: {
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: `${AppColor.third}`,
	},
	contTxtHd: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 15,
		marginLeft: 5,
	},
    cont:{
        backgroundColor:'#fff',
        height:Dimensions.get('window').height,
    }
});

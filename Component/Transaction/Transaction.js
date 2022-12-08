import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
import { AppColor } from '../WorkerComp/AppColor';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SearchByComp from '../WorkerComp/SearchByComp';
import TransComp from './TransComp';
import { api, apiRequest } from '../WorkerComp/Api';
import { UserContext } from '../DataProvider/UserContext';
import LoaderComp from '../WorkerComp/LoaderComp';
import Header from '../WorkerComp/Header';
import Pagination from '../WorkerComp/pagination';
import { NavigationContainer } from '@react-navigation/native';
export default function Transaction({ navigation }) {
	const usercontext = useContext(UserContext);
	const { authUser } = usercontext;
	const [transactions, setTransactions] = useState(null);
	const [page,setPage]=useState('0');
	const [totalPageItems,setTotalPageItems]=useState('');
	const [appDetails, setAppDetails] = useState({
		load: false,
	});
	useEffect(() => {
		if (!transactions) {
			getTransactions();
		}
		return()=>setTransactions(null);
	}, []);

	const transSuc = (e) => {
		//(e)
	};
	const transFail = (e) => {};
	const transPayload = (e) => {
		
		// (e.data.payload.payload);
		if(e.data.payload.payload.length>0){
			setTransactions(e.data.payload.payload);
			setTotalPageItems(e.data.payload.total);
			
		}
	};
	const getTransactions = () => {
		var transObject = {
			method: 'get',
			url: `${api.localUrl}${api.transaction}&skip=${page}&limit=10`,
			headers: {
				Authorization: 'Bearer ' + authUser.token,
				'Cache-Control': 'no-cache',
				Pragma: 'no-cache',
			},
		};

		apiRequest(
			transObject,
			(e) => {
				setAppDetails({ ...appDetails, load: e });
			},
			(e) => {
				transSuc(e);
			},
			(e) => {
				transFail(e);
			},
			(e) => {
				transPayload(e);
			}
		);
	};

	return (
		<View
			style={{
				backgroundColor: '#fff',
				height:'100%',
			}}
		>
			<Header
				iconName='money-bill-wave'
				iconFunc={() => navigation.toggleDrawer()}
				text={'Transactions'}
			/>
			{false && <SearchByComp func={() => 'okay'} />}
			<ScrollView style={{ height: Dimensions.get('screen').height / 1.31 }}>
				{transactions ? (
					transactions.map((e, i) => {
						//console.log(transactions);
						if (e.type === 'D') {
							return (
								<TransComp
									key={i}
									iconName='long-arrow-alt-down'
									color={AppColor.green}
									transText='Cash deposit'
									transTime={e.createdAt.split('T')[0]}
									transAmount={e.amount}
									func={() => 'Okay'}
								/>
							);
						} else if (e.type === 'T') {
							return (
								<TransComp
									key={i}
									iconName='long-arrow-alt-up'
									color='red'
									transText={e.narration}
									transTime={e.createdAt.split('T')[0]}
									transAmount={`-${e.amount}`}
									func={() => 'Okay'}
								/>
							);
						}
					})
				) : (
					<View style={{ margin: 10 }}>
						<Text style={{ ...style.noTrax }}>
							No Transaction Records Found!
						</Text>
					</View>
				)}

				{totalPageItems&&<Pagination currentPage={page} setCurrentPage={(e)=>setPage(e)} limit={10} total={totalPageItems} />}
			</ScrollView>
			{appDetails.load && <LoaderComp size={30} color={AppColor.third} />}
		</View>
	);
}

const style = StyleSheet.create({
	noTrax: {
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop:10,
	},
});

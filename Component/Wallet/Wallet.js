import React,{useEffect,useContext,useRef,useState} from 'react';
import {UserContext} from '../DataProvider/UserContext';
import {WebView} from 'react-native-webview';
import { api } from '../WorkerComp/Api';
import LoaderComp from '../WorkerComp/LoaderComp';
import { AppColor } from '../WorkerComp/AppColor';
import { Alert ,Text,View,KeyboardAvoidingView,StyleSheet} from 'react-native';
import ErrorPage from './ErrorPage';
export default function Wallet(){
    const usercontext=useContext(UserContext);
    const{userWallet,setUserWallet}=usercontext;
    const[error,setError]=useState(false);
    const webViewRef=useRef(null);
    const reload=()=>{
        webViewRef.current.reload()
    }
  
    return(
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <WebView 
         source={{uri:`${api.ewallet}`}}
         ref={(ref) => webViewRef.current = ref} 
           
           startInLoadingState={true}
          renderLoading={()=><LoaderComp size={30} color={AppColor.third}/>}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn(
              'WebView received error status code: ',
              nativeEvent.statusCode,
            );
          }}
        renderError={()=><ErrorPage func={()=>reload()}/>}
        onError={(e)=>{console.log(e)}}
         />
      </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#666',
    },
  });
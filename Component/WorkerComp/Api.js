// Should house the url Api for the application 
import axios from 'axios';

/**
 *   method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
 */
export const api={
    login:'api/crm/customers/Login',
    register:'api/crm/customers',
    userProfile:'api/erp/staff/me',
    createPickup:'',
    viewPickup:'',
    viewParcel:'',
    createParcel:'',
    editProfile:'',
    recoverPassword:'api/erp/staff/otp',
    localUrl:'http://172.16.17.30/',
    remoteUrl:'',  

}
/**
 * object should be passed in to the axios call 
 * containing the following 
 * method,url,data , and authoriztion if need be .head
 * 
 */
 // Generic request call 

export const apiRequest=(requestObject,load,succFunc,errorFun,getPayload)=>{
    console.log(requestObject.url);   
    load(true);
    axios(
        requestObject
      ).then(function (response){
          load(false);
          if(response.data.success){
              // check the response data payload is not null
              succFunc(response.data.message);
              if(response.data.payload.lenght!=0){
                  // payload isn't null
                  //console.log(response.data.payload);
                  getPayload(response.data.payload);
              }
             // console.log(response.data.message);
          }
       //   console.log(response);
      }).catch(function (error){
          load(false);
         // errorFun(error.response.data.message);
         // console.log(error.response.data);
         // typeof keyword is used to check the datatype

         if(typeof error.response!=='undefined'){
            
            if(error.response.data.message){
                errorFun(error.response.data.message);
            }
            console.log(error.response);
         }else{
             errorFun("Something happend retry again later.");
         }
           console.log(error);
        
     
      });
}

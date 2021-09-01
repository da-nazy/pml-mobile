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
export const pinColor={
  color1:'red', 
  color2:'tomato',
  color3:'orange',
  color4:'yellow',
  color5:'gold',
  color6:'wheat',
  color7:'tan',
  color8:'linen',
  color9:'green',
  color10:'blue',
  color11:'navy',
  color12:'aqua',
  color13:'teal',
  color14:'turquoise',
  color14:'violet',
  color15:'purple',
  color16:'plum',
  color17:'indigo',
}

export const api={
    login:'api/crm/customers/Login',
    register:'api/crm/customers',
    userProfile:'api/crm/customers/me',
    editCustomer:'api/crm/customers',
    checkUser:'api/crm/customers/any?',
    userParcels:'api/pml/pml-parcels?createdBy=',
    createPickup:'api/pml/pml-pickups/public',
    userPickup:'api/pml/pml-pickups?createdBy=',
    viewParcel:'',
    removeParcelFromPickup:'api/pml/pml-pickups/parcel/REMOVE/',
    addParcelToPickup:'api/pml-pickups/parcel/ADD/',
    deleteParcel:'api/pml/pml-parcels/',
    createParcel:'api/pml/pml-parcels/public',
    getCategory:'api/pml/categories',
    getState:'api/erp/states',
    recoverPassword:'api/crm/customers/otp',
    localUrl:'http://172.16.17.227/',
    remoteUrl:'',  
    googleReversGeoCodeUrl:'https://maps.googleapis.com/maps/api/geocode/json?latlng=',
    googleApiKey:'AIzaSyCE41gWBv1AfHzJNsyvCQe6FIPpYHLKcrs',
    estimatedBilling:'api/pml/pml-parcels/estimate-billing'
}

//https://maps.googleapis.com/maps/api/geocode/json?latlng=6.4637031,7.5515096&key=AIzaSyCE41gWBv1AfHzJNsyvCQe6FIPpYHLKcrs
/**
 * object should be passed in to the axios call 
 * containing the following 
 * method,url,data , and authoriztion if need be .head
 * 
 */
 // Generic request call 

export const apiRequest=(requestObject,load,succFunc,errorFun,getPayload)=>{
   
    console.log(requestObject);   
    load(true);
    axios(
        requestObject
      ).then(function (response){
        //console.log("danny");
          load(false);
          if(response.data.success){
              // check the response data payload is not null
             // console.log(response);
              succFunc(response.data.message);
              if(response.data.payload.lenght!=0){
                load(false);
                  // payload isn't null
                  //console.log(response.data.payload);
                 // console.log("danny")
              //   getPayload(response.data.payload);
              }
              load(false);
            //  console.log(response.data.message);
            
          }
          // Should run the check on your own
          getPayload(response);
        
      // console.log(response);
      }).catch(function (error){
          load(false);
       //   console.log("danny");
       //   console.log(error.response.data);
       //   console.log(error.response.status);
       //   console.log(error.response.headers);
         // errorFun(error.response.data.message);
         // console.log(error.response.data);
         // typeof keyword is used to check the datatype
       //  console.log(error.response);
         if(typeof error.response!=='undefined'){
            
            if(error.response.data.message){
                errorFun(error.response.data.message);
            }
            console.log(error.response);
         }else{
             console.log("Something happend retry again later.");
             errorFun("Something happend retry again later.");
         }
           console.log(error);
      });
}

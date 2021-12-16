// Should house the url Api for the application
import axios from "axios";

/**
 *   method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
  
 */
export const pinColor = {
  color1: "red",
  color2: "tomato",
  color3: "orange",
  color4: "yellow",
  color5: "gold",
  color6: "wheat",
  color7: "tan",
  color8: "linen",
  color9: "green",
  color10: "blue",
  color11: "navy",
  color12: "aqua",
  color13: "teal",
  color14: "turquoise",
  color14: "violet",
  color15: "purple",
  color16: "plum",
  color17: "indigo",
};
export const ngStates = [
  {
    id: "5851bc91860d8b5a70000022",
    name: "Kebbi State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.373Z",
    updatedAt: "2019-02-06T19:08:18.373Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000009",
    name: "Cross River State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.372Z",
    updatedAt: "2019-02-06T19:08:18.372Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000023",
    name: "Kogi State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.374Z",
    updatedAt: "2019-02-06T19:08:18.374Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000030",
    name: "Osun State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.375Z",
    updatedAt: "2019-02-06T19:08:18.375Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000007",
    name: "Benue State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.372Z",
    updatedAt: "2019-02-06T19:08:18.372Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000021",
    name: "Katsina State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.373Z",
    updatedAt: "2019-02-06T19:08:18.373Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000001",
    name: "Abia State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.365Z",
    updatedAt: "2019-02-10T01:36:36.582Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    updatedBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000003",
    name: "Akwa Ibom State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.368Z",
    updatedAt: "2019-02-06T19:08:18.368Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000002",
    name: "Adamawa State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.368Z",
    updatedAt: "2019-02-06T19:08:18.368Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000008",
    name: "Borno State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.372Z",
    updatedAt: "2019-07-10T06:34:26.831Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    updatedBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000033",
    name: "Rivers State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.375Z",
    updatedAt: "2019-02-06T19:08:18.375Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000011",
    name: "Ebonyi State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.372Z",
    updatedAt: "2019-02-06T19:08:18.372Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000027",
    name: "Niger State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.374Z",
    updatedAt: "2019-02-06T19:08:18.374Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000037",
    name: "Zamfara State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.376Z",
    updatedAt: "2019-02-06T19:08:18.376Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000005",
    name: "Bauchi State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.369Z",
    updatedAt: "2019-02-06T19:08:18.369Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000016",
    name: "Gombe State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.373Z",
    updatedAt: "2019-02-06T19:08:18.373Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000029",
    name: "Ondo State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.375Z",
    updatedAt: "2019-02-06T19:08:18.375Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000019",
    name: "Kaduna State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.373Z",
    updatedAt: "2019-02-06T19:08:18.373Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000031",
    name: "Oyo State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.375Z",
    updatedAt: "2019-02-06T19:08:18.375Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000035",
    name: "Taraba State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.376Z",
    updatedAt: "2019-02-06T19:08:18.376Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000028",
    name: "Ogun State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.374Z",
    updatedAt: "2019-02-06T19:08:18.374Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000006",
    name: "Bayelsa State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.372Z",
    updatedAt: "2019-02-06T19:08:18.372Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000036",
    name: "Yobe State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.376Z",
    updatedAt: "2019-02-06T19:08:18.376Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000012",
    name: "Edo State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.372Z",
    updatedAt: "2019-02-06T19:08:18.372Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000004",
    name: "Anambra State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.368Z",
    updatedAt: "2019-02-06T19:08:18.368Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000032",
    name: "Plateau State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.375Z",
    updatedAt: "2019-02-06T19:08:18.375Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000014",
    name: "Enugu State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.373Z",
    updatedAt: "2019-02-06T19:08:18.373Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000024",
    name: "Kwara State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.374Z",
    updatedAt: "2019-02-06T19:08:18.374Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000020",
    name: "Kano State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.373Z",
    updatedAt: "2019-02-06T19:08:18.373Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000026",
    name: "Nasarawa State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.374Z",
    updatedAt: "2019-02-06T19:08:18.374Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000017",
    name: "Imo State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.373Z",
    updatedAt: "2019-02-06T19:08:18.373Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000018",
    name: "Jigawa State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.373Z",
    updatedAt: "2019-02-06T19:08:18.373Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000025",
    name: "Lagos State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.374Z",
    updatedAt: "2019-02-06T19:08:18.374Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000010",
    name: "Delta State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.372Z",
    updatedAt: "2019-02-06T19:08:18.372Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000013",
    name: "Ekiti State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.373Z",
    updatedAt: "2019-02-06T19:08:18.373Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000015",
    name: "FCT",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.373Z",
    updatedAt: "2019-02-06T19:08:18.373Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
  {
    id: "5851bc91860d8b5a70000034",
    name: "Sokoto State",
    __v: 0,
    country: "ng",
    createdAt: "2019-02-06T19:08:18.376Z",
    updatedAt: "2019-02-06T19:08:18.376Z",
    createdBy: "5a51bc91860d8b5ba0000001",
    deleted: false,
  },
];

export const symbols = {
  naira: "\u20A6",
};
   
 export const  deliveryType=[
    "HOME","TERMINAL"
   ]
export const api = {
  pickupStatus: [
    "RELEASED",
    "DECLINE",
    "CANCEL",
    "DISPATCH",
    "DELIVERED",
    "CONFIRMED",
    "ACCEPTED",
    
  ],
  login: "api/crm/customers/Login",
  register: "api/crm/customers",
  userProfile: "api/crm/customers/me",
  editCustomer: "api/crm/customers",
  checkUser: "api/crm/customers/any?",
  userParcels: "api/pml/pml-parcels?createdBy=",
  createPickup: "api/pml/pml-pickups/public",
  userPickup: "api/pml/pml-pickups?createdBy=",
  removeParcelFromPickup: "api/pml/pml-pickups/parcel/REMOVE/",
  addParcelToPickup: "api/pml/pml-pickups/parcel/ADD/",
  deleteParcel: "api/pml/pml-parcels/",
  deletePickup: "api/pml/pml-pickups/",
  createParcel: "api/pml/pml-parcels/public",
  getCategory: "api/pml/categories",
  getState: "api/erp/states",
  recoverPassword: "api/crm/customers/otp",
  // localUrl:' itmain http://172.16.17.30/ online api.pmt.com.ng  palm:192.168.43.122',172.16.17.174 ,
  localUrl: "https://api.pmt.com.ng/",
 // localUrl:'http://172.16.17.27/',
  googleReversGeoCodeUrl:
    "https://maps.googleapis.com/maps/api/geocode/json?latlng=",
  googleApiKey: "AIzaSyD1gihWTJzSjIyCT-2zil_tWgGltUZTbMQ",
  estimatedBilling: "api/pml/pml-parcels/estimate-billing",
  userWallet: "api/ewallet/accounts/me",
  makePayment: "api/ewallet/transfers",
  transaction:'api/ewallet/transactions/user?sort=-_id&populate=deposits',
  //verifyPayment: "api/pml/pml-pickups/verify",
  verifyPayment: "api/pml/pml-parcels/payment",
  pmlWallet: "1234567894",
  pmlPickups: "api/pml/pml-pickups",
  pickupOperation: "api/pml/assignments/operation/customer",
  pmlTerminal:'api/erp/terminals',

};

//https://maps.googleapis.com/maps/api/geocode/json?latlng=6.4637031,7.5515096&key=AIzaSyCE41gWBv1AfHzJNsyvCQe6FIPpYHLKcrs
/**
 * object should be passed in to the axios call
 * containing the following
 * method,url,data , and authoriztion if need be .head
 *
 */
// Generic request call

export const apiRequest = (
  requestObject,
  load,
  succFunc,
  errorFun,
  getPayload
) => {
  console.log(requestObject);
  load(true);
  axios(requestObject)
    .then(function (response) {
      //console.log("danny");
      load(false);
      if (response.data.success) {
        // check the response data payload is not null
        // console.log(response);
        succFunc(response.data.message);
        if (response.data.payload.lenght != 0) {
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
    })
    .catch(function (error) {
      load(false);
      //   console.log("danny");
      //   console.log(error.response.data);
      //   console.log(error.response.status);
      //   console.log(error.response.headers);
      // errorFun(error.response.data.message);
      // console.log(error.response.data);
      // typeof keyword is used to check the datatype
      console.log(error.response);
      if (typeof error.response !== "undefined") {
        if (error.response.data.message) {
          errorFun(error.response.data.message);
        }
        console.log(error.response);
      } else {
        console.log("Something happend retry again later.");
        errorFun("Something happend retry again later.");
      }
      console.log(error);
    });
};


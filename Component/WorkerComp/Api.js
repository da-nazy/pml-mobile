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
    "COLLECTION",
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
  //localUrl: "https://api.pmt.com.ng/",
  localUrl:'http://172.16.17.28/',
  googleReversGeoCodeUrl:
    "https://maps.googleapis.com/maps/api/geocode/json?latlng=",
  googleApiKey: "AIzaSyCE41gWBv1AfHzJNsyvCQe6FIPpYHLKcrs",
  estimatedBilling: "api/pml/pml-parcels/estimate-billing",
  userWallet: "api/ewallet/accounts/me",
  makePayment: "api/ewallet/transfers",
  verifyPayment: "api/pml/pml-pickups/verify",
  pmlWallet: "1234567894",
  pmlPickups: "api/pml/pml-pickups",
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

export const pmlTerminalCord = {
  coord: [
    [7.0527042, 4.8496123],
    [5.634286899999999, 6.3429578],
    [7.492579000000001, 6.386812],
    [7.6190802, 12.9706998],
    [7.0593808, 4.851133799999999],
    [3.4205293, 6.7393534],
    [8.107396999999999, 6.314120399999999],
    [3.5177323, 6.6450958],
    [8.492047399999999, 12.0228791],
    [3.6363484, 6.923585600000001],
    [3.3034194, 6.5518506],
    [3.2409805, 6.7026596],
    [8.107396999999999, 6.314120399999999],
    [6.916392999999999, 6.0219478],
    [7.407044300000001, 6.427358099999999],
    [-93.076326, 44.8940186],
    [7.4406072, 9.068232499999999],
    [3.3427613, 6.454992],
    [7.406644399999999, 6.4268982],
    [7.4829726, 6.438010299999999],
    [8.321505799999999, 4.957635499999999],
    [4.5418141, 7.7826709],
    [6.791565899999999, 6.1328954],
    [7.3203298, 9.150549999999999],
    [7.0453725, 5.5123614],
    [6.3441592, 4.9550322],
    [7.494016999999999, 5.5319211],
    [8.321505799999999, 4.957635499999999],
    [6.3441592, 4.9550322],
    [7.482466, 6.4382576],
    [6.3441592, 4.9550322],
    [6.733343, 7.8023204],
    [7.3655366, 5.1050282],
    [5.7550599, 5.5159743],
    [5.6037465, 6.334986],
    [3.9060194, 7.4317142],
    [3.5176611, 6.6483057],
    [8.107396999999999, 6.314120399999999],
    [7.181067499999999, 9.1764912],
    [6.829740300000001, 6.1462401],
    [3.3738863, 6.5300207],
    [7.092945800000001, 8.9350334],
    [3.3789, 6.5880233],
    [3.3847014, 6.4816024],
    [6.297582999999999, 4.9282739],
    [7.520990799999999, 6.507384699999999],
    [7.3653438, 5.1239206],
    [7.5463885, 6.4583661],
    [7.3967588, 6.849839599999999],
    [3.5177323, 6.6450958],
    [4.5795004, 8.5095385],
    [7.5494773, 9.0278256],
    [3.5104537, 6.6194131],
    [8.3408448, 4.952406799999999],
    [3.5773339, 6.4698394],
    [7.083231199999999, 8.954792399999999],
    [7.6190802, 12.9706998],
    [7.3655366, 5.1050282],
    [4.5443923, 7.455464099999999],
    [7.064297499999999, 4.8556272],
    [6.792344099999999, 6.1182853],
    [3.5177323, 6.6450958],
    [7.3655366, 5.1050282],
    [7.883118199999999, 5.0546731],
    [7.0453725, 5.5123614],
    [7.4165053, 10.5104642],
    [7.516444799999999, 6.9169954],
    [6.7923994, 6.1329419],
    [6.5672641, 9.6169539],
    [6.6958939, 6.2059295],
    [5.6037465, 6.334986],
    [3.3633264, 6.5022366],
    [8.7205877, 5.9616504],
    [7.447972699999999, 6.9859085],
    [7.3817567, 9.280610399999999],
    [3.2860709, 6.461256199999999],
    [7.611377500000001, 9.0296889],
    [7.9402993, 5.8870903],
    [7.090186699999999, 6.240353499999999],
    [7.5114043, 9.0464931],
    [3.344075, 6.4783116],
    [5.219325599999999, 7.594363800000001],
    [8.890348099999999, 9.916548299999999],
    [3.2377972, 6.464684099999999],
    [3.3402885, 6.5953922],
    [7.3701346, 5.1181063],
    [8.3417006, 4.9757165],
  ],
};

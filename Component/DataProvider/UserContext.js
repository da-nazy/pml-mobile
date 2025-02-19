import React,{useState,createContext} from 'react';

export const UserContext=createContext();

export default UserProvider=props=>{

    const[user,setUser]=useState(null);
    const[userLoc,setUserLoc]=useState({
        lat:null,
        lng:null,
        address:null,
        type:1,
       
    })

    const[senderLoc,setSenderLoc]=useState({
        lat:null,
        lng:null,
        address:null,
        type:2,
        
    })
     const [userWallet,setUserWallet]=useState(null);
    // locType:1 for user 2: for sender
    // operation should be null pickup or parcel

    const[userPickupDetails,setuserPickupDetails]=useState({
        pickupType:'',
        locType:1,
        operation:null,
    })
    const[authUser,setAuthUser]=useState({
        token:'',
    });
    const[dispatcher,setDispatcher]=useState(null);
     const [isOnline,setIsOnline]=useState(true);
    return(
        <UserContext.Provider value={{
          userWallet,setUserWallet,isOnline,setIsOnline,
          user,setUser,authUser,setAuthUser,userPickupDetails,setuserPickupDetails,senderLoc,setSenderLoc,userLoc,setUserLoc
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
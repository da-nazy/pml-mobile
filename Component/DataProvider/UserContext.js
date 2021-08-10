import React,{useState,createContext} from 'react';

export const UserContext=createContext();

export default UserProvider=props=>{
    const[user,setUser]=useState(null);
    const[userLoc,setUserLoc]=useState({
        lat:'',
        lng:'',
        address:'',
    })
    const[authUser,setAuthUser]=useState(null);
    const[dispatcher,setDispatcher]=useState(null);

    return(
        <UserContext.Provider value={{
            user,setUser,authUser,setAuthUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
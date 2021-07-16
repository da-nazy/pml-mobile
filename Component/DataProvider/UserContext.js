import React,{useState} from 'react';

export const UserContext=crateContext();

export default UserProvider=props=>{
    const[user,setUser]=useState(null);
    const[authUser,setAuthUser]=useState(null);

    return(
        <UserContext.Provider value={{
            user,setUser,authUser,setAuthUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
'use client'

import { createContext, useContext, useState, Dispatch } from "react"

let user = null;
if(typeof window !== 'undefined'){
  user = JSON.parse(localStorage.getItem('user'));
}

/*
export const UserContext = createContext({
  user: userSession ? userSession : null,
});*/

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(user ? user : null);

  return(
    <UserContext.Provider value={{userSession, setUserSession}}>
      {children}
    </UserContext.Provider>
  )
}

//export const useUserContext = () => useContext(UserContext); 
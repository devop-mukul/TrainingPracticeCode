import React, {useState} from 'react'
import UserContext from './UserContext'

const UserContextProvider = ({children}) => { //div hi hai, children bas generic naam hai, isse hum kisi bhi component ko wrap kar sakte hai, jise hum context provide karna chahte hai
    const [user, setUser] = useState(null)
    return (
        <UserContext.Provider value = {{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
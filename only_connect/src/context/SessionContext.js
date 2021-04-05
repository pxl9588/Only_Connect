import React, {useState, createContext} from 'react'
//import GameIDState from '../Components/hooks/GameIDState'

export const SessionContext = createContext(null);

export function SessionContextProvider(props){
    const URLParam = window.location.pathname !== '/' ? window.location.pathname : 'Default';
    const [sessionId, setSessionId] = useState(URLParam);
    const [authUser, setAuthUser] = useState(null);

    return (
        <SessionContext.Provider value ={{sessionId, setSessionId, authUser, setAuthUser}}>
            {props.children}
        </SessionContext.Provider>
    )
}
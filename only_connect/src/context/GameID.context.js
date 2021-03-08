import React, {useState, createContext} from 'react'
import GameIDState from '../Components/hooks/GameIDState'
export const GameIDContext = createContext();

export function GameIDProvider(props){
    const [GameID, setGameID] = useState('/Home')
    return (
        <GameID.Provider value ={{GameID, setGameID}}>
            {props.children}
        </GameID.Provider>
    )
}
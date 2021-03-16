import { useState } from "react";

export default function GameIDState(id){
    const [gameID, setGameID] = useState(id)
    return {
        gameID,
        setGameID
    }
}
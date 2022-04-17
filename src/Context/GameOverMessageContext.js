import { useState } from "react";
import { createContext } from "react";

export const MessageContext = createContext()

export const MessageContextProvider = ({children})=>{
    const [gameOverData,setGameOverData] = useState({message:"",count:0,word:''})

    return(
        <MessageContext.Provider value={{gameOverData,setGameOverData}}>{children}</MessageContext.Provider>
    )
}


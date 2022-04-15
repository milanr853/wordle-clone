import { useState } from "react";
import { createContext } from "react";

export const DisplayContext = createContext()

export const DisplayContextProvider = ({children})=>{
    const [Display,setDisplay] = useState('none')

    return(
        <DisplayContext.Provider value={{Display,setDisplay}}>{children}</DisplayContext.Provider>
    )
}


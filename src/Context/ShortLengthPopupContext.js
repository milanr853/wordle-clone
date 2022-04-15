import { useState } from "react";
import { createContext } from "react";

export const ShortPopupContext = createContext()

export const ShortPopupProvider = ({children})=>{
    const [showShortPopup,setShowShortPopup] = useState(0)

    return(
        <ShortPopupContext.Provider value={{showShortPopup,setShowShortPopup}}>{children}</ShortPopupContext.Provider>
    )
}


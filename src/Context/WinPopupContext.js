import { useState } from "react";
import { createContext } from "react";

export const WinPopupContext = createContext()

export const WinPopupProvider = ({children})=>{
    const [showWinPopup,setShowWinPopup] = useState(0)

    return(
        <WinPopupContext.Provider value={{showWinPopup,setShowWinPopup}}>{children}</WinPopupContext.Provider>
    )
}


import { useState } from "react";
import { createContext } from "react";

export const WordNotPresentPopupContext = createContext()

export const WordNotPresentPopupProvider = ({ children }) => {
    const [showNoWordPopup, setShowNoWordPopup] = useState(0)

    return (
        <WordNotPresentPopupContext.Provider value={{ showNoWordPopup, setShowNoWordPopup }}>{children}</WordNotPresentPopupContext.Provider>
    )
}


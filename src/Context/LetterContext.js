import { useState } from "react";
import { createContext } from "react";


const LetterMatrixContext = createContext()

const LetterMatrixProvider = ({children})=>{
    const [getLetterMatrix,setLetterMatrix] = useState([
        [],
        [],
        [],
        [],
        [],
        []
    ])

    return(
        <LetterMatrixContext.Provider value={{getLetterMatrix,setLetterMatrix}}>{children}</LetterMatrixContext.Provider>
    )
}


export {LetterMatrixContext,LetterMatrixProvider}





import { useState } from "react";
import { createContext } from "react";


const LetterArrayContext = createContext()

const LetterArrayProvider = ({children})=>{
    const [getLetterArray,setLetterArray] = useState([])

    return(
        <LetterArrayContext.Provider value={{getLetterArray,setLetterArray}}>{children}</LetterArrayContext.Provider>
    )
}


export {LetterArrayContext,LetterArrayProvider}






const BoolContext = createContext()

const BoolProvider = ({children})=>{
    const [bool,setBool] = useState(true)

    return(
        <BoolContext.Provider value={{bool,setBool}}>{children}</BoolContext.Provider>
    )
}


export {BoolContext,BoolProvider}
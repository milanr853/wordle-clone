import { useState } from "react";
import { createContext } from "react";


const RowContext = createContext()

const RowProvider = ({children})=>{
    const [rowNum,setRowNum] = useState(0)

    return(
        <RowContext.Provider value={{rowNum,setRowNum}}>{children}</RowContext.Provider>
    )
}


export {RowContext,RowProvider}





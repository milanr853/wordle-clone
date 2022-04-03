import "./details.css"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"


export const Details = ()=>{
    const {id} = useParams()
    const Data = useSelector(store=>store.getCoinsDataReducer.dataObj.coins)
    if(Data && Data.length != 0){
        Data.forEach((currency)=>{
            if(currency.uuid===id){
                // console.log(currency)
            }
        })
    }
    return(
        <h1>Details</h1>
    )
}
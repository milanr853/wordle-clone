const initialNewsDataState = []


const initialDataObj = {}

export const getNewsData_Reducer = (state=initialNewsDataState,{type,newsArray})=>{
    // console.log(newsArray)
    if(type==="GET_NEWS_DATA"){
        return [...newsArray]
    }
    else return state
}


export const getCoinsAndStats_Reducer = (state=initialDataObj,{type,dataObj})=>{
    if(type==="GET_COINS_AND_STATS_DATA"){
        return {...dataObj}
    }
    else return state
}


export const displayCryptosOverPage_Reducer = (state={},{type})=>{
if(type==="GET_UPDATED"){
    return {display:"block",limit:100}
}
if(type==="GET_DEFAULT"){
    return {display:"none",limit:10}
}
return state
}


export const getNewsCountReducer = (state={},{type})=>{
if(type==="GET_NEWS_VALUES"){
    return {count:100,display:"block"}
}
if(type==="GET_NEWS_DEFAULT"){
    return {count:3,display:"none"}
}
return state
}


// export const getDefaultReducer = (state={display:"none",limit:10},{type})=>{
//     if(type==="GET_DEFAULT"){
//         return {...state}
//     }
//     else return state
// }
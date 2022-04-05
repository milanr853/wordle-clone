
export const getNewsData_Action = (newsArray)=>{
    const GET_NEWS_DATA = "GET_NEWS_DATA"
    return{
        type: GET_NEWS_DATA,
        newsArray
    }
}







export const getCoinsAndStats_Action = (dataObj)=>{
    const GET_COINS_AND_STATS_DATA = "GET_COINS_AND_STATS_DATA"
    return{
        type: GET_COINS_AND_STATS_DATA,
        dataObj
    }
}







export const getUpdatedValues_Actions = ()=>{
    const GET_UPDATED = "GET_UPDATED"
    return{
        type: GET_UPDATED,
    }
}







export const getDefaultValues_Action = ()=>{
    const GET_DEFAULT = "GET_DEFAULT"
    return{
        type: GET_DEFAULT,
    }
}







export const getNewsUpdatedValues_Actions = ()=>{
    const GET_NEWS_VALUES = "GET_NEWS_VALUES"
    return{
        type: GET_NEWS_VALUES,
    }
}







export const getNewsDefault_Action = ()=>{
    const GET_NEWS_DEFAULT = "GET_NEWS_DEFAULT"
    return{
        type: GET_NEWS_DEFAULT,
    }
}




export const changeToLight = ()=>{
    const CHANGE_TO_LIGHT = "CHANGE_TO_LIGHT"
    return {
        type: CHANGE_TO_LIGHT
    }
}
export const changeToDark = ()=>{
    const CHANGE_TO_DARK = "CHANGE_TO_DARK"
    return {
        type: CHANGE_TO_DARK
    }
}

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







export const getNewsValuesActions = ()=>{
    const GET_NEWS_VALUES = "GET_NEWS_VALUES"
    return{
        type: GET_NEWS_VALUES,
    }
}







export const getNewsDefault = ()=>{
    const GET_NEWS_DEFAULT = "GET_NEWS_DEFAULT"
    return{
        type: GET_NEWS_DEFAULT,
    }
}





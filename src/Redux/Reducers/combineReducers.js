import { combineReducers } from "redux";
import {getNewsData_Reducer,getCoinsAndStats_Reducer,displayCryptosOverPage_Reducer,displayNewsOverPage_Reducer,changeColorReducer} from "./Reducers";


const allReducers = combineReducers({getNewsData_Reducer,getCoinsAndStats_Reducer,displayCryptosOverPage_Reducer,displayNewsOverPage_Reducer,changeColorReducer})

export default allReducers
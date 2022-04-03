import { combineReducers } from "redux";
import {getNewsData_Reducer,getCoinsAndStats_Reducer,displayCryptosOverPage_Reducer,displayNewsOverPage_Reducer} from "./Reducers";


const allReducers = combineReducers({getNewsData_Reducer,getCoinsAndStats_Reducer,displayCryptosOverPage_Reducer,displayNewsOverPage_Reducer})

export default allReducers
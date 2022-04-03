import { combineReducers } from "redux";
import {getNewsData_Reducer,getCoinsAndStats_Reducer,displayCryptosOverPage_Reducer,getNewsCountReducer} from "./Reducers";


const allReducers = combineReducers({getNewsData_Reducer,getCoinsAndStats_Reducer,displayCryptosOverPage_Reducer,getNewsCountReducer})

export default allReducers
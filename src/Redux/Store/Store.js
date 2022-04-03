import { createStore } from "redux";
import allReducers from '../Reducers/combineReducers'

const Store = createStore(allReducers)

export default Store
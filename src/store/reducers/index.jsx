import { combineReducers } from "@reduxjs/toolkit";
import adminReducer from './adminReducer'
import eventReucer from "./eventSlice";
const rootReducer = combineReducers({
    admin: adminReducer,
    events: eventReucer,
    
})

export default rootReducer
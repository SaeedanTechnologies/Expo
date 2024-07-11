import { combineReducers } from "@reduxjs/toolkit";
import adminReducer from "./adminReducer";
import eventReucer from "./eventSlice";
import stepperReducer from "./stepperReducer";
const rootReducer = combineReducers({
  admin: adminReducer,
  events: eventReucer,
  stepper: stepperReducer,
});

export default rootReducer;

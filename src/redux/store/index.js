import { combineReducers, configureStore } from "@reduxjs/toolkit";
import atletaReducer from "../reducers/atletaReducer";

const rootReducer = combineReducers({
  atleta: atletaReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

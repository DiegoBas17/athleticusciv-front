import { combineReducers, configureStore } from "@reduxjs/toolkit";
import atletaReducer from "../reducers/atletaReducer";
import errorReducer from "../reducers/errorReducer";

const rootReducer = combineReducers({
  atleta: atletaReducer,
  errors: errorReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

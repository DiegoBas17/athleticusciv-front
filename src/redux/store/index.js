import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AtletaReducer from "../reducers/AtletaReducer";

const rootReducer = combineReducers({
  Atleta: AtletaReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

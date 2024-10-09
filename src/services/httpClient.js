import axios from "axios";
import store from "../redux/store";
import {
  ADD_ERROR,
  RESET_ERRORS,
  SET_LOGIN_ERROR,
} from "../redux/reducers/errorReducer";
import uniqid from "uniqid";

const httpClient = axios.create({
  baseURL: "http://localhost:3001",
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    store.dispatch({ type: RESET_ERRORS });
    return response;
  },
  (error) => {
    const errorResponse = error.response;
    if (errorResponse) {
      store.dispatch({
        type: ADD_ERROR,
        payload: {
          message: errorResponse.data.message || "Errore sconosciuto",
          status: errorResponse.status,
          id: uniqid(),
        },
      });
      if (errorResponse.status === 401) {
        store.dispatch({
          type: SET_LOGIN_ERROR,
          payload: true,
        });
      }
    }
    return Promise.reject(error);
  }
);

export default httpClient;

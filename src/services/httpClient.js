import axios from "axios";
import store from "../redux/store";
import {
  ADD_ERROR,
  RESET_ERRORS,
  SET_LOGIN_ERROR,
} from "../redux/reducers/errorReducer";
import uniqid from "uniqid";
import { setAtleta } from "../redux/actions/AtletaAction";

const httpClient = axios.create({
  baseURL: "https://handsome-verna-pollito117-551d08b7.koyeb.app",
});

let isFetchingProfile = false;

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  } else {
    window.location.href = "/login";
  }
  return config;
});

httpClient.interceptors.response.use(
  async (response) => {
    if (!isFetchingProfile && response.config.url !== "/atleti/me") {
      try {
        isFetchingProfile = true;
        const meResponse = await httpClient.get("/atleti/me");
        store.dispatch(setAtleta(meResponse.data));
      } catch (error) {
        console.error("Errore durante l'aggiornamento dell'atleta", error);
      } finally {
        isFetchingProfile = false;
      }
    }
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
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default httpClient;

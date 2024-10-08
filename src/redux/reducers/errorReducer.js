export const RESET_ERRORS = "RESET_ERRORS";
export const ADD_ERROR = "ADD_ERROR";
export const SET_LOGIN_ERROR = "SET_LOGIN_ERROR";

const initialState = {
  errors: [],
  loginError: false,
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_ERRORS:
      return {
        ...state,
        errors: [],
        loginError: false,
      };
    case ADD_ERROR:
      return {
        ...state,
        errors: [...state.errors, action.payload],
      };
    case SET_LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload,
      };
    default:
      return state;
  }
};

export default errorReducer;

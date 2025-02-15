import { SET_ATLETA } from "../actions/AtletaAction";

const initialState = {
  atleta: null,
};
const atletaReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ATLETA:
      return {
        ...state,
        atleta: action.payload,
      };

    default:
      return state;
  }
};
export default atletaReducer;

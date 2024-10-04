import { SET_ATLETA } from "../actions/AtletaAction";

const initialState = {
  atleta: null,
};
const AtletaReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ATLETA:
      return {
        atleta: action.payload,
      };

    default:
      return state;
  }
};
export default AtletaReducer;

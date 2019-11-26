import { GET_ALL_CODES } from "../actions/types";

const initialState = {
  codes: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CODES:
      return {
        ...state,
        codes: action.payload
      };
    default:
      return state;
  }
}

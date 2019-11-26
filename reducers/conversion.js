import { CONVERT_CURRENCY } from "../actions/types";

const initialState = {
  configs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CONVERT_CURRENCY:
      return {
        ...state,
        configs: action.payload
      };
    default:
      return state;
  }
}

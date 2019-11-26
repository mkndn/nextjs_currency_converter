import { GET_LATEST_RATES, CONVERT_CURRENCY, GET_QUERY_RESULT, GET_RATES_BY_BASE, GET_RATES_FOR_SYMBOLS } from "../actions/types";

const initialState = {
  currentRate: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_QUERY_RESULT:
    case GET_LATEST_RATES:
    case GET_RATES_BY_BASE:
    case GET_RATES_FOR_SYMBOLS:
      return {
        ...state,
        currentRate: action.payload
      };
    case CONVERT_CURRENCY:
    default:
      return state;
  }
}

import axios from "axios";

import {
  GET_LATEST_RATES,
  CONVERT_CURRENCY,
  GET_QUERY_RESULT,
  GET_ALL_CODES,
  GET_RATES_BY_BASE
} from "../actions/types";
import { createMessage, triggerError } from "./messages";
import configs from "../config";

const API_BASE_URI = configs.api;

//GET LATEST RATES
export const latestRates = () => dispatch => {
  axios
    .get(API_BASE_URI + "/api/latest", config)
    .then(res => {
      dispatch({
        type: GET_LATEST_RATES,
        payload: res.data
      });
    })
    .catch(error =>
      dispatch(triggerError(error.response.data, error.response.status))
    );
};

//GET ALL CODES
export const allCodes = () => dispatch => {
  axios
    .get(API_BASE_URI + "/api/codes", config)
    .then(res => {
      dispatch({
        type: GET_ALL_CODES,
        payload: res.data
      });
    })
    .catch(error =>
      dispatch(triggerError(error.response.data, error.response.status))
    );
};

//GET LATEST RATES
export const latestRatesByBase = base => dispatch => {
  axios
    .get(API_BASE_URI + "/api/base?base=" + base, config)
    .then(res => {
      dispatch({
        type: GET_RATES_BY_BASE,
        payload: res.data
      });
    })
    .catch(error =>
      dispatch(triggerError(error.response.data, error.response.status))
    );
};

//GET LATEST RATES
export const getRatesForSymbols = params => dispatch => {
  axios
    .get(API_BASE_URI + "/api/symbols?symbols=" + params, config)
    .then(res => {
      dispatch({
        type: GET_RATES_FOR_SYMBOLS,
        payload: res.data
      });
    })
    .catch(error =>
      dispatch(triggerError(error.response.data, error.response.status))
    );
};

//CONVERT CURRENCY
export const conversionConfig = param => dispatch => {
  axios
    .get(API_BASE_URI + "/api/config?symbols=" + param, config)
    .then(res => {
      dispatch({
        type: CONVERT_CURRENCY,
        payload: res.data
      });
    })
    .catch(error =>
      dispatch(triggerError(error.response.data, error.response.status))
    );
};

//GET QUERY FILTER RESULTS
export const getQueryResult = params => dispatch => {
  axios
    .get(API_BASE_URI + "/api/search" + params, config)
    .then(res => {
      dispatch({
        type: GET_QUERY_RESULT,
        payload: res.data
      });
    })
    .catch(error =>
      dispatch(triggerError(error.response.data, error.response.status))
    );
};

const config = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
};

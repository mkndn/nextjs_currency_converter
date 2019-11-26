import { combineReducers } from "redux";
import rates from "./rates";
import errors from "./errors";
import messages from "./messages";
import conversion from "./conversion";
import codes from './codes';

export default combineReducers({ rates, errors, messages, conversion, codes });

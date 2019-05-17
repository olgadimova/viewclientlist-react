import { combineReducers } from 'redux';
import CustomerReducer from './CustomerReducer';
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";



export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    customers: CustomerReducer,
});
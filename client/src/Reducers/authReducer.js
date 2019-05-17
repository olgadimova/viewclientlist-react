import {
    SET_CURRENT_USER,
    USER_LOADING,
    SEND_RESET_EMAIL,
  } from "../Actions/types";

  const isEmpty = require("is-empty");
  const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    emailsent: {}
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload
        };
      case USER_LOADING:
        return {
          ...state,
          loading: true
        };
      case SEND_RESET_EMAIL:
      return {
        ...state,
        emailsent: action.payload
      }
      default:
        return state;
    }
  }
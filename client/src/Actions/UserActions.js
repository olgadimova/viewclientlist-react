import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
    SEND_RESET_EMAIL,
  
  } from "./types";

const apiURL = "/api/users";


// Login - get user token
export const loginUser = userData => dispatch => {
    axios
      .post(`${apiURL}/login`, userData)
      .then(res => {
        // Save to localStorage

  // Set token to localStorage
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

  // Set logged in user
  export const setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    };
  };
  // User loading
  export const setUserLoading = () => {
    return {
      type: USER_LOADING
    };
  };

  // Send Reset Email
  export const sendResetEmail = ({email}) => dispatch => {
    axios
    .post(`${apiURL}/forgot`, {email})
    .then(res => {
      dispatch({
        type: SEND_RESET_EMAIL,
        payload: res.data
      })
    })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
 
  export const resetPasswordDb = ({password,confirm,token}) => {
    return (dispatch) => {
      axios
      .post(`${apiURL}/reset/` + token, {password, confirm, token})
      .then(res => {
        dispatch({
          type: SEND_RESET_EMAIL,
          payload: res.data
        })
      })
      .catch(err => {
        throw (err);
    });
    }
  }


  // Log user out
  export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
  };
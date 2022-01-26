import {
  LOGIN_SUCCESS_ACTION,
  LOGIN_FAILURE_ACTION,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  LOGOUT_NOW_ACTION
} from "../actions/loginboxAction";

const initialState = {
  error: "",
  loading: false,
  isAuthenticated: false || (localStorage.getItem('token') != null),
  email:false || (localStorage.getItem('email') != null),
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS_ACTION:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        email: action.payload
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        email: action.payload
      };
    case LOGIN_FAILURE_ACTION:
    case SIGN_UP_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false
      };
    case LOGOUT_NOW_ACTION:
      return {
        ...state,
        loading: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
}


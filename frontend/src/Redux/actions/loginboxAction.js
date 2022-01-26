import axios from 'axios';

export const LOGIN_SUCCESS_ACTION = 'LOGIN_SUCCESS_ACTION';
export const LOGIN_FAILURE_ACTION = 'LOGIN_FAILURE_ACTION';

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOGOUT_NOW_ACTION = 'LOGOUT_NOW_ACTION';

function loginSuccessActionCreator(email) {
  return {
    type: LOGIN_SUCCESS_ACTION,
    payload: email
  }
}

function loginFailureActionCreator(message) {
  return {
    type: LOGIN_FAILURE_ACTION,
    message: message
  }
}

export function loginUserThunk(email, password) {
  return (dispatch) => {
    return axios.post(`http://localhost:8080/api/auth/login`, {
      email: email,
      password: password
    }).then(response => {
      if (response.data == null) {
        dispatch(loginFailureActionCreator('Unknown Error'));
      } else if (!response.data) {
        dispatch(loginFailureActionCreator(response.data.message || ''));
      } else {
        localStorage.setItem('token', response.data)
        localStorage.setItem('email', email)
        
        // Dispatch the success action
        dispatch(loginSuccessActionCreator(email));

      }
    })
  }
}

export function loginFacebookThunk(accessToken) {
  return (dispatch) => {
    return axios
      .post(
        `${process.env.REACT_APP_API_SERVER}/api/login/facebook`,
        {
          access_token: accessToken
        }
      )
      .then(response => {
        if (response.data == null) {
          dispatch(loginFailureActionCreator('Unknown Error'));
        } else if (!response.data.token) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginFailureActionCreator(response.data.message || ''));
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('token', response.data.token);

          // Dispatch the success action
          dispatch(loginSuccessActionCreator());
        }
      })
  };
}

function signUpRequest() {
  return {
    type: SIGN_UP_REQUEST,
  };
};
function signUpSuccess(user) {
  return {
    type: SIGN_UP_SUCCESS,
  };
};
function signUpFailure(message) {
  return {
    type: SIGN_UP_FAILURE,
    message: message
  };
};

export const signUpThunk = (email, password, displayName, role) => {
  return function (dispatch) {
    dispatch(signUpRequest());
    return axios.post(`${process.env.REACT_APP_API_SERVER}/api/auth/signup`, {
      email: email,
      password: password,
      displayName: displayName,
      role: role
    })
      .then((response) => {
        const { data } = response.data;
        dispatch(signUpSuccess(data));
      })
      .catch((error) => {
        dispatch(signUpFailure(error));
      });
  };
};

export function logoutNowThunk() {
  return (dispatch) => {
    localStorage.clear('token');
    localStorage.clear('email');

    dispatch({ type: LOGOUT_NOW_ACTION });
  }
}
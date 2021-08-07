import { navigate } from '@reach/router';
import axios from 'axios';
// import axios from 'axios';
import jwtDecode from 'jwt-decode';
import API_BASE from './api_url';

export const GET_USER = 'GET_USER';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_BACKEND_ERROR = 'LOGIN_BACKEND_ERROR';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const SIGNUP_BACKEND_ERROR = 'SIGNUP_BACKEND_ERROR';
export const LOGIN_USER = 'LOGIN_USER';
export const SIGNUP_USER = 'SIGNUP_USER';
export const GETUSER_ERROR = 'GETUSER_ERROR';

export const fetchUser = () => (dispatch) => {
  const token = localStorage.getItem('token');
  let userId;
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.sub;
  }
  axios.get(`${API_BASE}/users/${userId}`, {
    headers: {
      Authorization: `token ${localStorage.getItem('token')}`,
    },
  })
    .then((response) => {
      dispatch({ type: GET_USER, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: GETUSER_ERROR, payload: error });
    });
};

export const loginUser = (user) => {
  if ((!user.email) || (!user.password)) {
    return (dispatch) => {
      dispatch({ type: LOGIN_ERROR, payload: 'Please enter both Username and Password.' });
    };
  }

  return (dispatch) => {
    axios.post(`${API_BASE}/auth`, {
      user,
    })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          dispatch({ type: LOGIN_USER, payload: response.data });
          setTimeout(() => {
            navigate('/dashboard');
          });
        }
      })
      .catch((data) => {
        dispatch({ type: LOGIN_BACKEND_ERROR, payload: data });
      });
  };
};

export const signupUser = (user) => {
  if ((!user.username) || (!user.email)
  || (!user.password_confirmation) || (!user.password) || (!user.image)) {
    return (dispatch) => {
      dispatch({ type: SIGNUP_ERROR, payload: 'Please enter all fields.' });
    };
  }
  return (dispatch) => {
    axios.post(`${API_BASE}/users`, {
      user,
    })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          dispatch({ type: SIGNUP_USER, payload: response.data });
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        }
        return response;
      }).catch((error) => {
        dispatch({ type: SIGNUP_BACKEND_ERROR, payload: error });
      });
  };
};

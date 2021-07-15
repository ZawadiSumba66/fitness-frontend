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
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const userId = decoded.sub;
    axios.get(`${API_BASE}/users/${userId}`)
      .then((response) => {
        if (response.data) {
          dispatch({ type: GET_USER, payload: response.data.user });
          console.log(response.data);
        }
        throw new Error(response.statusText);
      })
      .catch((data) => {
        dispatch({ type: GETUSER_ERROR, payload: data });
      });
  }
};

export const loginUser = (user) => {
  if ((!user.username) || (!user.password)) {
    return (dispatch) => {
      dispatch({ type: LOGIN_ERROR, payload: 'Please enter both Username and Password.' });
    };
  }

  return (dispatch) => {
    axios.post(`${API_BASE}/auth`, {
      user,
    })
      .then((response) => {
        if (response.ok) {
          localStorage.setItem('token', response.data.jwt);
          dispatch({ type: LOGIN_USER, payload: response.data });
          navigate('/dashboard');
        }
        throw new Error(response.statusText);
      })
      .catch((data) => {
        dispatch({ type: LOGIN_BACKEND_ERROR, payload: data });
      });
  };
};

export const signupUser = (user) => {
  if ((!user.username) || (!user.email) || (!user.password_confirmation) || (!user.password)) {
    return (dispatch) => {
      dispatch({ type: SIGNUP_ERROR, payload: 'Please enter all fields.' });
    };
  }
  return (dispatch) => {
    axios.post(`${API_BASE}/users`, {
      user,
    })
      .then((response) => {
        if (response.ok) {
          localStorage.setItem('token', response.data.token);
          dispatch({ type: SIGNUP_USER, payload: response.data });
        }
        throw new Error(response.statusText);
      }).catch((data) => {
        dispatch({ type: SIGNUP_BACKEND_ERROR, payload: data });
      });
  };
};

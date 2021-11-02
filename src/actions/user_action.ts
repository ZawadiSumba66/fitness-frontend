/* eslint-disable import/no-cycle */
import React from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import API_BASE from './api_url';
import { UserAction } from '../reducers/userReducer';

export const GET_USER = 'GET_USER';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_BACKEND_ERROR = 'LOGIN_BACKEND_ERROR';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const SIGNUP_BACKEND_ERROR = 'SIGNUP_BACKEND_ERROR';
export const LOGIN_USER = 'LOGIN_USER';
export const SIGNUP_USER = 'SIGNUP_USER';
export const GETUSER_ERROR = 'GETUSER_ERROR';

export type UserSignup = {
  username: string,
  email: string,
  password: string,
  password_confirmation: string
};

export type UserFavorites = UserSignup & { favorites: string [] };

export type UserLogin = Pick<UserSignup, 'email' | 'password' >;

export const fetchUser = () => (dispatch: React.Dispatch<UserAction>) => {
  const token = localStorage.getItem('token');
  let userId;
  if (token) {
    const decoded: any = jwtDecode(token);
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

export const loginUser = (user: UserLogin) => {
  if ((!user.email) || (!user.password)) {
    return (dispatch: React.Dispatch<UserAction>) => {
      dispatch({ type: LOGIN_ERROR, payload: 'Please enter both Username and Password.' });
    };
  }

  return (dispatch: React.Dispatch<UserAction>) => {
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
        dispatch({ type: LOGIN_BACKEND_ERROR, payload: data.response });
      });
  };
};

export const signupUser = (user: UserSignup) => {
  if ((!user.username) || (!user.email)
  || (!user.password_confirmation) || (!user.password)) {
    return (dispatch: React.Dispatch<UserAction>) => {
      dispatch({ type: SIGNUP_ERROR, payload: 'Please enter all fields.' });
    };
  }
  return (dispatch: React.Dispatch<UserAction>) => {
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
        dispatch({ type: SIGNUP_BACKEND_ERROR, payload: error.response });
      });
  };
};
/* eslint-enable import/no-cycle */

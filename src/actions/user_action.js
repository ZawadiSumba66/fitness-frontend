import { navigate } from '@reach/router';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const GET_USER = 'GET_USER';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_BACKEND_ERROR = 'LOGIN_BACKEND_ERROR';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const SIGNUP_BACKEND_ERROR = 'SIGNUP_BACKEND_ERROR';
export const LOGIN_USER = 'LOGIN_USER';
export const SIGNUP_USER = 'SIGNUP_USER';

export const fetchUser = () => (dispatch) => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const userId = decoded.sub;
    fetch(`https://fitness-api-app.herokuapp.com/api/v1/users/${userId}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(resp.statusText);
      })
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem('token', data.jwt);
          dispatch({ type: GET_USER, payload: data });
        }
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
    fetch('https://fitness-api-app.herokuapp.com/api/v1/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: user.username,
          password: user.password,
        },
      }),
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(resp.statusText);
      })
      .then((data) => {
        if (!data.error) {
          localStorage.setItem('token', data.jwt);
          dispatch({ type: LOGIN_USER, payload: data });
          navigate('/dashboard');
        } else {
          dispatch({ type: LOGIN_BACKEND_ERROR, payload: data });
        }
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
    axios.post('https://fitness-api-app.herokuapp.com/api/v1/users',
      {
        user,
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
        dispatch({ type: SIGNUP_USER, payload: data });
        console.log(data);
        navigate('/dashboard');
      }).catch((data) => {
        dispatch({ type: SIGNUP_BACKEND_ERROR, payload: data });
      });
  };
};

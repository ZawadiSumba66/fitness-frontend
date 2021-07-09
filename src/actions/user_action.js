export const GET_USER = 'GET_USER'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGIN_BACKEND_ERROR = 'LOGIN_BACKEND_ERROR'
export const SIGNUP_ERROR= 'SIGNUP_ERROR'
export const SIGNUP_BACKEND_ERROR = 'SIGNUP_BACKEND_ERROR'

import jwtDecode from 'jwt-decode';


export const fetchUser = (history) => {
  return (dispatch) => {
      if (localStorage.getItem('token')) {
          let token = localStorage.getItem('token')
          let decoded = jwtDecode(token);
          let userId = decoded.sub;
          fetch(`https://fitness-api-app.herokuapp.com/api/v1/users/${userId}`, {
              headers: {
                  'Authorization': `bearer ${token}`
              }
          })
              .then(resp => {
                  if (resp.ok) {
                      return resp.json()
                  } else {
                      throw new Error(resp.statusText)
                  }
              })
              .then(data => {
                  if (data.jwt) {
                      localStorage.setItem("token", data.jwt);
                      dispatch({ type: GET_USER, payload: data });
                  }
              })
      }
  }
}

export const loginUser = (user, history) => {
  if ((!user.username) || (!user.password)) {
      return (dispatch) => {
          dispatch({ type: LOGIN_ERROR, payload: 'Please enter both Username and Password.' })
      }
  }

  return (dispatch) => {
      fetch('https://fitness-api-app.herokuapp.com/api/v1/auth', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
          },
          body: JSON.stringify({
              user: {
                  username: user.username,
                  password: user.password
              }
          })
      })
          .then(resp => {
              if (resp.ok) {
                  return resp.json()
              } else {
                  throw new Error(resp.statusText);
              }
          })
          .then(data => {
              if (!data.error) {
                  localStorage.setItem('token', data.jwt);
                  dispatch({ type: GET_USER, payload: data });
                  history.push('/tips')
              } else {
                  dispatch({ type: LOGIN_BACKEND_ERROR, payload: data })
              }
          })
          .catch(data => {
              dispatch({ type: LOGIN_BACKEND_ERROR, payload: data });
          })
  }
}

export const signupUser = (user, history) => {
  if ((!user.username) || (!user.email) || (!user.password_confirmation) || (!user.password)) {
      return (dispatch) => {
          dispatch({ type: SIGNUP_ERROR, payload: 'Please enter all fields.' })
      }
  }

  return (dispatch) => {
      fetch('https://fitness-api-app.herokuapp.com/api/v1/users', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              user: {
                  username: user.username,
                  email: user.email,
                  password: user.password,
                  password_confirmation: user.password_confirmation,
                  avatar: user.avatar
              }
          })
      })
          .then(resp => {
              if (resp.ok) {
                  return resp.json()
              } else {
                  throw new Error(resp.statusText)
              }
          })
          .then(data => {
              if (!data.error) {
                  localStorage.setItem('token', data.jwt);
                  dispatch({ type: GET_USER, payload: data });
                  history.push('/tips')
              } else {
                  dispatch({ type: SIGNUP_BACKEND_ERROR, payload: data })
              }
          })
          .catch(data => {
              dispatch({ type: SIGNUP_BACKEND_ERROR, payload: data });
          })
  }
}
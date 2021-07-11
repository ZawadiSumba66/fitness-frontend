import { navigate } from '@reach/router';

export const GET_FAVORITE = 'GET_FAVORITE';
export const GET_UNFAVORITE = 'GET_UNFAVORITE';
export const FAVORITE_ERROR = 'FAVORITE_ERROR';
export const UNFAVORITE_ERROR = 'UNFAVORITE_ERROR';
export const GETUSER_FAVORITES = 'GETUSER_FAVORITES';

export const createfavorite = (favorite) => (dispatch) => {
  fetch('https://fitness-api-app.herokuapp.com/api/v1/tip/favorite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ favorite }),
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      throw new Error(resp.statusText);
    })
    .then((data) => {
      localStorage.setItem('token', data.jwt);
      dispatch({ type: GET_FAVORITE, payload: data });
      navigate('/tip');
    })
    .catch((data) => {
      dispatch({ type: FAVORITE_ERROR, payload: data });
    });
};

export const createUnfavorite = (unfavorite) => (dispatch) => {
  fetch('https://fitness-api-app.herokuapp.com/api/v1/tip/favorite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ unfavorite }),
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      throw new Error(resp.statusText);
    })
    .then((data) => {
      localStorage.setItem('token', data.jwt);
      dispatch({ type: GET_UNFAVORITE, payload: data });
      navigate('/tip');
    })
    .catch((data) => {
      dispatch({ type: UNFAVORITE_ERROR, payload: data });
    });
};

export const fetchFavorites = () => (dispatch) => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');

    fetch('https://fitness-api-app.herokuapp.com/api/v1/user/favorites', {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => dispatch({ type: GETUSER_FAVORITES, payload: data }));
  }
};

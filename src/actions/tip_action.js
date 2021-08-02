import axios from 'axios';
import { navigate } from '@reach/router';
import API_BASE from './api_url';

export const GET_TIP = 'GET_TIP';
export const GET_TIPS = 'GET_TIPS';
export const CREATE_TIP_ERROR = 'CREATE_TIP_ERROR';
export const CREATE_ERROR = 'CREATE_ERROR';
export const CREATE_TIP = 'CREATE_TIP';
export const GETTIPS_ERROR = 'GETTIPS_ERROR';

export const fetchTip = (tipId) => (dispatch) => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');

    fetch(`${API_BASE}/tips/${tipId}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => dispatch({ type: GET_TIP, payload: data }));
  }
};

export const fetchTips = () => (dispatch) => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');

    axios.get(`${API_BASE}/tips`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((response) => {
        dispatch({ type: GET_TIPS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: GETTIPS_ERROR, payload: error });
      });
  }
};

export const createTip = (tip) => {
  console.log(tip);
  if ((!tip.title) || (!tip.description)
   || (!tip.instructions) || (!tip.benefits) || (!tip.image)) {
    return (dispatch) => {
      dispatch({ type: CREATE_ERROR, payload: 'Please enter all fields.' });
    };
  }

  return (dispatch) => {
    axios.post(`${API_BASE}/tips`, {
      tip,
      headers: {
        Authorization: `token ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (response) {
          console.log(response);
          dispatch({ type: CREATE_TIP, payload: response.data });
          navigate('/tips');
        }
      })
      .catch((data) => {
        dispatch({ type: CREATE_TIP_ERROR, payload: data });
      });
  };
};

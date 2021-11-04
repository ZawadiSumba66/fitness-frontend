/* eslint-disable import/no-cycle */
import axios from 'axios';
import React from 'react';
import { navigate } from '@reach/router';
import API_BASE from './api_url';
import { TipAction } from '../reducers/tipsReducer';

export const GET_TIP = 'GET_TIP';
export const GET_TIPS = 'GET_TIPS';
export const CREATE_TIP_ERROR = 'CREATE_TIP_ERROR';
export const CREATE_ERROR = 'CREATE_ERROR';
export const CREATE_TIP = 'CREATE_TIP';
export const GETTIPS_ERROR = 'GETTIPS_ERROR';
export const GETTIP_ERROR = 'GETTIP_ERROR';

export type UserTips = {
  title: string,
  description: string,
  benefits: string,
  instructions: string
};

export const fetchTip = (tipId: number) => (dispatch: React.Dispatch<TipAction>) => {
  axios.get(`${API_BASE}/tips/${tipId}`, {
    headers: {
      Authorization: `token ${localStorage.getItem('token')}`,
    },
  })
    .then((response) => {
      dispatch({ type: GET_TIP, payload: response.data });
    }).catch((error) => {
      dispatch({ type: GETTIP_ERROR, payload: error });
    });
};

export const fetchTips = () => (dispatch: React.Dispatch<TipAction>) => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');

    axios.get(`${API_BASE}/tips`, {
      headers: {
        Authorization: `token ${token}`,
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

export const createTip = (tip: UserTips) => {
  if ((!tip.title) || (!tip.description)
   || (!tip.instructions) || (!tip.benefits)) {
    return (dispatch: React.Dispatch<TipAction>) => {
      dispatch({ type: CREATE_ERROR, payload: 'Please enter all fields.' });
    };
  }

  return (dispatch: React.Dispatch<TipAction>) => {
    axios.post(`${API_BASE}/tips`,
      { tip },
      {
        headers: {
          Authorization: `token ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        if (response.data) {
          dispatch({ type: CREATE_TIP, payload: response.data });
          navigate('/tips');
        }
      })
      .catch((error) => {
        dispatch({ type: CREATE_TIP_ERROR, payload: error.response.data.message });
      });
  };
};

/* eslint-enable import/no-cycle */

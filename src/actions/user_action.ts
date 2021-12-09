/* eslint-disable import/no-cycle */
import React from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import API_BASE from './api_url';
import { UserAction } from '../reducers/userReducer';
import fileChecksum from '../helpers/file_reader';

export const GET_USER = 'GET_USER';
export const LOGIN_BACKEND_ERROR = 'LOGIN_BACKEND_ERROR';
export const SIGNUP_BACKEND_ERROR = 'SIGNUP_BACKEND_ERROR';
export const LOGIN_USER = 'LOGIN_USER';
export const SIGNUP_USER = 'SIGNUP_USER';
export const GETUSER_ERROR = 'GETUSER_ERROR';
export const PRESIGNED_URL = 'presigned_url';

export const createPresignedUrl = async (currentFile:any, byte_size: any, checksum: any) => {
  const file = {
    filename: currentFile.name,
    byte_size,
    checksum,
    content_type: 'application/jpg',
    metadata: {
      message: 'image for parsing',
    },
  };
  const result = await axios
    .post(`${API_BASE}/${PRESIGNED_URL}`, { file })
    .then((res) => res.data);
  return result;
};

export type UserSignup = {
  username: string,
  email: string,
  password: string,
  password_confirmation: string,
  image: any
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

export const loginUser = (user: UserLogin) => (dispatch: React.Dispatch<UserAction>) => {
  axios.post(`${API_BASE}/auth`, {
    user,
  })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: LOGIN_USER, payload: response.data });
        setTimeout(() => {
          navigate('/tips');
        });
      }
    })
    .catch((data) => {
      dispatch({ type: LOGIN_BACKEND_ERROR, payload: data.response });
    });
};
/* eslint-disable @typescript-eslint/naming-convention */
export const signupUser = (users: UserSignup) => async (dispatch: React.Dispatch<UserAction>) => {
  const {
    username, email, password, password_confirmation, image,
  } = users;
  const checksum = await fileChecksum(image);
  const presignedFileParams = await createPresignedUrl(
    image,
    image.size,
    checksum,
  );
  const s3PutOptions = {
    method: 'PUT',
    headers: presignedFileParams.direct_upload.headers,
    body: image,
  };

  const awsRes = await fetch(
    presignedFileParams.direct_upload.url,
    s3PutOptions,
  );

  if (awsRes.status !== 200) return awsRes;
  const user = {
    email,
    username,
    password,
    password_confirmation,
    avatar: presignedFileParams.blob_signed_id,
  };

  return axios.post(`${API_BASE}/users`, {
    user,
  })
    .then((response) => {
      console.log('response', response.data);
      if (response.data.token && response.data.avatar_url) {
        console.log(response.data.token);
        localStorage.setItem('token', response.data.token);
        dispatch({ type: SIGNUP_USER, payload: response.data });
        setTimeout(() => {
          navigate('/tips');
        }, 1000);
      }
    }).catch((error) => {
      dispatch({ type: SIGNUP_BACKEND_ERROR, payload: error.response.data.message });
    });
};
/* eslint-enable import/no-cycle */

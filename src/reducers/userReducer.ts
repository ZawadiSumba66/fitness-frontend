/* eslint-disable import/no-cycle */
import {
  GET_USER, LOGIN_USER, SIGNUP_USER, LOGIN_BACKEND_ERROR,
  SIGNUP_BACKEND_ERROR, GETUSER_ERROR, UserSignup, UserLogin,
} from '../actions/user_action';

export type UserAction = {
  type: typeof GET_USER |
         typeof LOGIN_USER |
         typeof SIGNUP_USER |
         typeof LOGIN_BACKEND_ERROR |
         typeof SIGNUP_BACKEND_ERROR |
         typeof GETUSER_ERROR
  payload: Record<string, unknown> | string
};

type UserState = {
  signup_backend_error: string[],
  user: UserSignup,
  getuser_error: string,
  loginuser: UserLogin,
  signupuser: UserSignup,
  login_backend_error: '',
};

const initialState: UserState = {
  signup_backend_error: [],
  user: {
    username: '', email: '', password: '', password_confirmation: '', image: '',
  },
  getuser_error: '',
  loginuser: { email: '', password: '' },
  signupuser: {
    username: '', email: '', password: '', password_confirmation: '', image: '',
  },
  login_backend_error: '',
};

const userReducer = (state: UserState = initialState,
  action: UserAction) => {
  if (action.type === GET_USER) {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === GETUSER_ERROR) {
    return {
      ...state,
      getuser_error: action.payload,
    };
  }
  if (action.type === LOGIN_USER) {
    return {
      ...state,
      loginuser: action.payload,
    };
  }
  if (action.type === SIGNUP_USER) {
    return {
      ...state,
      signupuser: action.payload,
    };
  }
  if (action.type === LOGIN_BACKEND_ERROR) {
    return {
      ...state,
      login_backend_error: action.payload,
    };
  }
  if (action.type === SIGNUP_BACKEND_ERROR) {
    return {
      ...state,
      signup_backend_error: action.payload,
    };
  }
  return state;
};

export default userReducer;
/* eslint-enable import/no-cycle */

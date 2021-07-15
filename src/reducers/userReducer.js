import {
  GET_USER, LOGIN_ERROR, LOGIN_USER, SIGNUP_USER, LOGIN_BACKEND_ERROR,
  SIGNUP_ERROR, SIGNUP_BACKEND_ERROR,
} from '../actions/user_action';

const initialState = {
  login_error: '',
  signup_error: '',
  user: {},
  getuser_error: '',
  loginuser: [],
  signupuser: [],
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        getuser_error: '',
      };
    case LOGIN_USER:
      return {
        loginuser: action.payload,
      };
    case SIGNUP_USER:
      return {
        signupuser: action.payload,
      };
    case LOGIN_ERROR:
      return {
        login_error: action.payload,
      };
    case LOGIN_BACKEND_ERROR:
      return {
        login_error: action.payload,
      };
    case SIGNUP_ERROR:
      return {
        signup_error: action.payload.error,
      };
    case SIGNUP_BACKEND_ERROR:
      return {
        signup_error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;

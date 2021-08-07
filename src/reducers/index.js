import { combineReducers } from 'redux';
import userReducer from './userReducer';
import tipsReducer from './tipsReducer';

export default combineReducers({
  userReducer,
  tipsReducer,
});

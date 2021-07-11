import { combineReducers } from 'redux';
import userReducer from './userReducer';
import favoritesReducer from './favoritesReducer';
import tipsReducer from './tipsReducer';

export default combineReducers({
  userReducer,
  favoritesReducer,
  tipsReducer,
});

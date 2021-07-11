import {
  GET_FAVORITE, GET_UNFAVORITE, GETUSER_FAVORITES, FAVORITE_ERROR, UNFAVORITE_ERROR,
} from '../actions/favorite_action';

const initialState = {
  favorite: '',
  unfavorite: '',
  error: '',
  favorites: [],
};
const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVORITE:
      return {
        favorite: action.payload,
      };
    case GETUSER_FAVORITES:
      return {
        favorites: action.payload,
      };
    case GET_UNFAVORITE:
      return {
        unfavorite: action.payload,
      };
    case FAVORITE_ERROR:
      return {
        error: action.payload,
      };
    case UNFAVORITE_ERROR:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export default favoritesReducer;

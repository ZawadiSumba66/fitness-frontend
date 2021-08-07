import {
  GET_TIPS, GET_TIP, CREATE_TIP, CREATE_ERROR, CREATE_TIP_ERROR,
} from '../actions/tip_action';

const initialState = {
  tips: [],
  error: '',
  tip: [],
  create_tips: [],
};

const tipsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TIPS:
      return {
        tips: action.payload,
      };
    case GET_TIP:
      return {
        tip: action.payload.tip,
      };
    case CREATE_TIP:
      return {
        create_tips: action.payload,
      };
    case CREATE_TIP_ERROR:
      return {
        error: action.payload,
      };
    case CREATE_ERROR:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export default tipsReducer;

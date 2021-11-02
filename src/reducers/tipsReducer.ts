/* eslint-disable import/no-cycle */
import {
  GET_TIPS, GET_TIP, CREATE_TIP, CREATE_ERROR, CREATE_TIP_ERROR, GETTIPS_ERROR, GETTIP_ERROR,
  UserTips,
} from '../actions/tip_action';

export type TipAction = {
  type: typeof GET_TIPS |
        typeof GET_TIP |
        typeof CREATE_TIP |
        typeof CREATE_ERROR |
        typeof CREATE_TIP_ERROR |
        typeof GETTIP_ERROR |
        typeof GETTIPS_ERROR
  payload: any
};

// type TipState = {
//   state: Record<string, unknown>;
// };

// const initialValue = { state: {} };

type TipState = {
  tips: UserTips[],
  error: string,
  tip: UserTips,
  create_tips: UserTips,
  tip_error: string,
};

const initialState:TipState = {
  tips: [],
  error: '',
  tip: {
    title: '', description: '', benefits: '', instructions: '',
  },
  create_tips: {
    title: '', description: '', benefits: '', instructions: '',
  },
  tip_error: '',
};

const tipsReducer = (state: TipState = initialState,
  action: TipAction) => {
  if (action.type === GET_TIPS) {
    return {
      ...state,
      tips: action.payload,
    };
  }
  if (action.type === GET_TIP) {
    return {
      ...state,
      tip: action.payload.tip,
    };
  }
  if (action.type === CREATE_TIP) {
    return {
      ...state,
      create_tips: action.payload,
    };
  }
  if (action.type === CREATE_TIP_ERROR) {
    return {
      ...state,
      tip_error: action.payload.data,
    };
  }
  if (action.type === CREATE_ERROR) {
    return {
      ...state,
      error: action.payload,
    };
  }
  return state;
};

export default tipsReducer;
/* eslint-enable import/no-cycle */

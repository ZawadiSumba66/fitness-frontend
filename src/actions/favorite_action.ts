import axios from 'axios';
import API_BASE from './api_url';

const FAVORITE = 'favorite';
const UNFAVOURITE = 'unfavourite';
const createfavorite = (tipstate: string, id: number) => {
  let END_POINT;
  if (tipstate === 'favorite') {
    END_POINT = FAVORITE;
  } else {
    END_POINT = UNFAVOURITE;
  }
  return axios.post(`${API_BASE}/tips/${id}/${END_POINT}`,
    {
      tip_id: id,
    },
    {
      headers: {
        Authorization: `token ${localStorage.getItem('token')}`,
      },
    });
};

export default createfavorite;

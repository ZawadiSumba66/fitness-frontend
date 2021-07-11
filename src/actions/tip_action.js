import { navigate } from '@reach/router';

export const GET_TIP = 'GET_TIP';
export const GET_TIPS = 'GET_TIPS';
export const CREATE_TIP_ERROR = 'CREATE_TIP_ERROR';
export const CREATE_ERROR = 'CREATE_ERROR';
export const CREATE_TIP = 'CREATE_TIP';

export const fetchTip = (tipId) => (dispatch) => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');

    fetch(`https://fitness-api-app.herokuapp.com/api/v1/tips/${tipId}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => dispatch({ type: GET_TIP, payload: data }));
  }
};

export const fetchTips = () => (dispatch) => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');

    fetch('https://fitness-api-app.herokuapp.com/api/v1/tips', {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => dispatch({ type: GET_TIPS, payload: data }));
  }
};

export const createTip = (tip) => {
  if ((!tip.name) || (!tip.description) || (!tip.instructions) || (!tip.benefits) || (!tip.image)) {
    return (dispatch) => {
      dispatch({ type: CREATE_ERROR, payload: 'Please enter all fields.' });
    };
  }

  return (dispatch) => {
    fetch('https://fitness-api-app.herokuapp.com/api/v1/tips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tip: {
          name: tip.name,
          instructions: tip.instructions,
          description: tip.description,
          benefits: tip.benefits,
          image: tip.image,
        },
      }),
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(resp.statusText);
      })
      .then((data) => {
        if (!data.error) {
          localStorage.setItem('token', data.jwt);
          dispatch({ type: CREATE_TIP, payload: data });
          navigate('/tips');
        } else {
          dispatch({ type: CREATE_TIP_ERROR, payload: data });
        }
      })
      .catch((data) => {
        dispatch({ type: CREATE_TIP_ERROR, payload: data });
      });
  };
};

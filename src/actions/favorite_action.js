export const GET_FAVORITE = 'GET_FAVORITE'
export const GET_UNFAVORITE = 'GET_UNFAVORITE'
export const FAVORITE_ERROR = 'FAVORITE_ERROR'
export const UNFAVORITE_ERROR = 'UNFAVORITE_ERROR'
export const GET_FAVORITES = 'GET_FAVORITES'
export const createfavorite = (favorite, history) => {
    return (dispatch) => {
        fetch('https://fitness-api-app.herokuapp.com/api/v1/tip/favorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({favorite})
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    throw new Error(resp.statusText)
                }
            })
            .then(data => {
                    localStorage.setItem('token', data.jwt);
                    dispatch({ type: GET_FAVORITE, payload: data });
                    history.push('/tips')
            })
            .catch(data => {
                dispatch({ type: FAVORITE_ERROR, payload: data });
            })
    }
  }

  export const createUnfavorite = (unfavorite, history) => {
    return (dispatch) => {
        fetch('https://fitness-api-app.herokuapp.com/api/v1/tip/favorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({unfavorite})
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    throw new Error(resp.statusText)
                }
            })
            .then(data => {
                    localStorage.setItem('token', data.jwt);
                    dispatch({ type: GET_UNFAVORITE, payload: data });
                    history.push('/tips')
            })
            .catch(data => {
                dispatch({ type: UNFAVORITE_ERROR, payload: data });
            })
    }
  }

  export const fetchFavotites = () => {
    return (dispatch) => {
        if (localStorage.getItem('token')) {
            let token = localStorage.getItem('token')

            fetch(`https://fitness-api-app.herokuapp.com/api/v1/user/favorites`, {
                headers: {
                    'Authorization': `bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(data => dispatch({ type: GET_FAVORITES, payload: data }))
        }
    }
}

  
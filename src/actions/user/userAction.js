import { CONNECT_USER, LOGOUT_USER } from './actions-types';

export const connectUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: CONNECT_USER,
      payload: user
    })
  }
}

export const logoutUser = () => {
  window.localStorage.removeItem("lebonson-token");
  window.location.reload();
  
  return (dispatch) => {
    dispatch({
      type: LOGOUT_USER,
      payload: null
    })
  }
}

import { CONNECT_USER, LOGOUT_USER } from '../actions/user/actions-types';

const initialState = {
  infos: null,
  isLogged: false,
}

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_USER:
      return {
        infos: action.payload,
        isLogged: true,
      }
    case LOGOUT_USER:
      return {
        initialState,
      }
    default: return state
  }
}

export default UserReducer;

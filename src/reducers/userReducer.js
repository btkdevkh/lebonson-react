import { 
  CONNECT_USER, 
  EDIT_USER_FAIL, 
  EDIT_USER_REQUEST, 
  EDIT_USER_SUCCESS, 
  LOGIN_USER_FAIL, 
  LOGIN_USER_REQUEST, 
  LOGIN_USER_SUCCESS, 
  LOGOUT_USER, 
  REGISTER_USER_FAIL, 
  REGISTER_USER_REQUEST, 
  REGISTER_USER_SUCCESS 
} from '../actions/user/actions-types';

const initialState = {
  userInfos: null,
  isLogged: false,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_USER:
      return {
        userInfos: action.payload,
        isLogged: true,
      }
    case LOGIN_USER_REQUEST:
      return {
        userInfos: [],
        isLogged: false,
      }
    case LOGIN_USER_SUCCESS:
      return {
        userInfos: action.payload,
        isLogged: true,
      }
    case LOGIN_USER_FAIL:
      return {
        isLogged: false,
        error: action.payload,
      }
    case LOGOUT_USER:
      return {
        initialState,
      }
    case REGISTER_USER_REQUEST:
      return { 
        isLogged: false 
      }
    case REGISTER_USER_SUCCESS:
      return {
        userInfos: action.payload,
        isLogged: true,
        msg: action.msg
      }
    case REGISTER_USER_FAIL:
      return {
        isLogged: false,
        error: action.payload,
      }
    case EDIT_USER_REQUEST:
      return { 
        isLogged: false 
      }
    case EDIT_USER_SUCCESS:
      return {
        userInfos: action.payload,
        isLogged: true,
        msg: action.msg
      }
    case EDIT_USER_FAIL:
      return {
        isLogged: false,
        error: action.payload,
      }
    default: return state
  }
}

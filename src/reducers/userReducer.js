import { 
  CONNECT_USER, 
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  EDIT_USER,
  USER_LIST,
  LOGIN_USER_FAIL,
  USER_ROLE_UPDATE
} from '../actions/user/actions-types';

const initialState = { 
  userInfos: null,
  isLogged: false,
  users: [],
  user: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_USER:
      return { 
        ...state,
        userInfos: action.payload, 
        isLogged: true 
      }
    case LOGIN_USER:
      return { 
        ...state,
        userInfos: action.payload, 
        isLogged: true
      }
    case LOGIN_USER_FAIL:
      return { 
        ...state,
        error: action.payload
      }
    case LOGOUT_USER:
      return { 
        ...state,
        userInfos: action.payload, 
        isLogged: false
      }
    case REGISTER_USER:
      return { 
        ...state,
        user: action.payload,
        success: action.success,
        error: action.error
      }
    case EDIT_USER:
      return { 
        ...state,
        user: action.payload, 
        isLogged: true,
        success: action.success,
        error: action.error
      }
    case USER_LIST:
      return { 
        ...state,
        users: action.payload, 
        isLogged: true, 
        msg: action.msg 
      }
    case USER_ROLE_UPDATE:
      return { 
        ...state,
        user: action.payload,
        isLogged: true,
        status: action.status,
        error: action.error
      }
    default: return state
  }
}
export default userReducer;

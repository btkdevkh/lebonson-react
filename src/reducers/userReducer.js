import { 
  CONNECT_USER, 
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  EDIT_USER,
  USER_LIST,
  LOGIN_USER_FAIL,
  USER_ROLE_UPDATE,
  USER_FORGOT_PASSWORD,
  USER_UPDATE_PASSWORD
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
        userInfos: action.payload
      }
    case LOGOUT_USER:
      return { 
        ...state,
        user: action.payload
      }
    case REGISTER_USER:
      return { 
        ...state,
        user: action.payload
      }
    case EDIT_USER:
      return { 
        ...state,
        user: action.payload
      }
    case USER_LIST:
      return { 
        ...state,
        users: action.payload
      }
    case USER_ROLE_UPDATE:
      return { 
        ...state,
        user: action.payload
      }
    case USER_FORGOT_PASSWORD:
      return { 
        ...state,
        user: action.payload
      }
    case USER_UPDATE_PASSWORD:
      return { 
        ...state,
        user: action.payload
      }
    default: return state;
  }
}
export default userReducer;

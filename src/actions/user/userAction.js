import { 
  CONNECT_USER, 
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOGOUT_USER,
  REGISTER_USER,
  EDIT_USER,
  USER_LIST,
  USER_ROLE_UPDATE,
  USER_FORGOT_PASSWORD,
  USER_UPDATE_PASSWORD
} from './actions-types';
import { 
  logInUser, 
  createUser, 
  updateOneUser, 
  getAllUsers, 
  updateOneUserRole,
  forgotUserPassword,
  updateOneUserPassword
} from '../../api/user';

export const connectUser = user => dispatch => {
  dispatch({
    type: CONNECT_USER,
    payload: user
  })
}

export const loginUser = data => async dispatch => {
  try {
    const response = await logInUser(data);
    if(response.status === 200) {
      dispatch({  
        type: LOGIN_USER,
        payload: response.user
      })

      localStorage.setItem("lebonson-token", response.token);

    } else {
      throw new Error(response.msg)
    }

  } catch (error) {
    dispatch({  
      type: LOGIN_USER_FAIL,
      payload: error.message
    })
  }
}

export const logoutUser = () => async dispatch => {
  localStorage.removeItem("lebonson-token");
  dispatch({ 
    type: LOGOUT_USER,
    payload: null
  })
}

export const registerUser = data => async dispatch => {
  try {
    const response = await createUser(data);
    if(response.status === 201) {
      dispatch({
        type: REGISTER_USER,
        payload: response
      })

      localStorage.setItem("lebonson-token", response.token);

      dispatch({
        type: CONNECT_USER,
        payload: response.user
      })

    } else {
      throw new Error(response.msg)
    }
    
  } catch (error) {
    dispatch({
      type: REGISTER_USER,
      payload: error.message
    })
  }
}

export const editUser = (data, id) => async dispatch => {
  try {
    const response = await updateOneUser(data, id);
    if(response.status === 200) {
      dispatch({
        type: EDIT_USER,
        payload: response
      })

      dispatch({
        type: CONNECT_USER,
        payload: response.user
      })

    } else {
      throw new Error(response.msg)
    }

  } catch (error) {
    dispatch({
      type: EDIT_USER,
      payload: error.message
    })
  }
}

export const loadAllusers = () => async dispatch => {
  try {
    const res = await getAllUsers();
    if(res.status === 200) {
      dispatch({
        type: USER_LIST,
        payload: res.users
      })

    } else {
      throw new Error(res.msg)
    }

  } catch (error) {
    dispatch({
      type: USER_LIST,
      payload: error.message
    })
  }
}

export const editUserRole = (data, id) => async dispatch => {
  try {
    const res = await updateOneUserRole(data, id);
    if(res.status === 200) {
      dispatch({
        type: USER_ROLE_UPDATE,
        payload: res.user
      })

    } else {
      throw new Error(res.msg)
    }

  } catch (error) {
    dispatch({
      type: USER_ROLE_UPDATE,
      payload: error.message
    })
  }
}

export const forgotUserPass = (data) => async dispatch => {
  try {
    const response = await forgotUserPassword(data);
    if(response.status === 200) {
      dispatch({
        type: USER_FORGOT_PASSWORD,
        payload: response
      })

      window.localStorage.setItem('password-token', response.token);

    } else {
      throw new Error(response.msg)
    }

  } catch (error) {
    dispatch({
      type: USER_FORGOT_PASSWORD,
      payload: error.message
    })
  }
}

export const editUserPassword = (id, data) => async dispatch => {
  try {
    const response = await updateOneUserPassword(id, data);
    if(response.status === 200) {
      dispatch({
        type: USER_UPDATE_PASSWORD,
        payload: response
      })

      setTimeout(() => window.localStorage.removeItem("password-token"), 3000);

    } else {
      throw new Error(response.msg)
    }

  } catch (error) {
    dispatch({
      type: USER_UPDATE_PASSWORD,
      payload: error.message
    })
  }
}

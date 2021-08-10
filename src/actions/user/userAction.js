import { 
  CONNECT_USER, 
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOGOUT_USER,
  REGISTER_USER,
  EDIT_USER,
  USER_LIST,
  USER_ROLE_UPDATE
} from './actions-types';
import { 
  logInUser, 
  createUser, 
  updateOneUser, 
  getAllUsers, 
  updateOneUserRole
} from '../../api/user';

export const connectUser = user => dispatch => {
  dispatch({
    type: CONNECT_USER,
    payload: user
  })
}

export const loginUser = data => async dispatch => {
  try {
    const res = await logInUser(data);
    if(res.status === 200) {
      dispatch({  
        type: LOGIN_USER,
        payload: res.user
      })

      localStorage.setItem("lebonson-token", res.token);

    } else {
      throw new Error(res.msg)
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
    const res = await createUser(data);
    if(res.status === 201) {
      dispatch({
        type: REGISTER_USER,
        payload: res.user,
        success: res.msg
      })

      localStorage.setItem("lebonson-token", res.token);

      dispatch({
        type: CONNECT_USER,
        payload: res.user
      })

    } else {
      throw new Error(res.msg)
    }
    
  } catch (error) {
    dispatch({
      type: REGISTER_USER,
      error: error.message
    })
  }
}

export const editUser = (data, id) => async dispatch => {
  try {
    const res = await updateOneUser(data, id);
    if(res.status === 200) {
      dispatch({
        type: EDIT_USER,
        payload: res.user,
        success: res.msg
      })

      dispatch({
        type: CONNECT_USER,
        payload: res.user,
      })

    } else {
      throw new Error(res.msg)
    }

  } catch (error) {
    dispatch({
      type: EDIT_USER,
      error: error.message
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
        payload: res.user,
        status: res.status
      })

    } else {
      throw new Error(res.msg)
    }

  } catch (error) {
    dispatch({
      type: USER_ROLE_UPDATE,
      error: error.message
    })
  }
}

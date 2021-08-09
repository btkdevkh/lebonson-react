import { 
  CONNECT_USER, 
  LOGIN_USER_FAIL, 
  LOGIN_USER_REQUEST, 
  LOGIN_USER_SUCCESS, 
  LOGOUT_USER,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAIL
} from './actions-types';
import { logInUser, createUser, updateOneUser } from '../../api/user';

export const connectUser = user => dispatch => {
  dispatch({
    type: CONNECT_USER,
    payload: user
  })
}

export const loginUser = data => async dispatch => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST })

    const res = await logInUser(data);
    if(res.status === 200) {
      dispatch({  
        type: LOGIN_USER_SUCCESS,
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
  dispatch({ type: LOGOUT_USER })
}

export const registerUser = data => async dispatch => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST })

    const res = await createUser(data);
    if(res.status === 201) {
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: res.user,
        msg: res.msg
      })

      localStorage.setItem("lebonson-token", res.token);

    } else {
      throw new Error(res.msg)
    }
    
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.message
    })
  }
}

export const editUser = (data, id) => async dispatch => {
  try {
    dispatch({ type: EDIT_USER_REQUEST })

    const res = await updateOneUser(data, id);
    console.log(res);
    if(res.status === 200) {
      dispatch({
        type: EDIT_USER_SUCCESS,
        payload: res.user,
        msg: res.msg
      })

    } else {
      throw new Error(res.msg)
    }

  } catch (error) {
    dispatch({
      type: EDIT_USER_FAIL,
      payload: error.message
    })
  }
}

import { 
  LOAD_ORDERS_REQUEST, 
  LOAD_ORDERS_SUCCESS, 
  LOAD_ORDERS_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS
} from './actions-types';
import { getOrdersByUsertId, createOrderCart } from '../../api/order';

export const loadOrdersByUserId = id => async dispatch => {

  try {
    dispatch({ type: LOAD_ORDERS_REQUEST })

    const res = await getOrdersByUsertId(id);
    // console.log(res);
    if(res.status === 200) {
      dispatch({
        type: LOAD_ORDERS_SUCCESS,
        payload: res.ordersByUserId
      })

    } else {
      throw new Error(res.msg)
    }

  } catch(error) {
    dispatch({
      type: LOAD_ORDERS_FAIL,
      payload: error.message
    })
  }
}

export const createOrder = data => async dispatch => {

  try {
    dispatch({ type: CREATE_ORDER_REQUEST })

    const res = await createOrderCart(data);
    //console.log(res);
    if(res.status === 200) {
      dispatch({
        type: CREATE_ORDER_SUCCESS,
        payload: res.order
      })

    } else {
      throw new Error(res.msg);
    }
     
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.message
    })
  }

}

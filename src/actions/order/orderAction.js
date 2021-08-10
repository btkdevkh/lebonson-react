import { 
  ORDER_LIST,
  ORDER_CREATE
} from './actions-types';
import { 
  getOrdersByUsertId, 
  createOrderCart 
} from '../../api/order';

export const loadOrdersByUserId = id => async dispatch => {
  try {
    const res = await getOrdersByUsertId(id);
    if(res.status === 200) {
      dispatch({
        type: ORDER_LIST,
        payload: res.ordersByUserId
      })

    } else {
      throw new Error(res.msg)
    }

  } catch(error) {
    dispatch({
      type: ORDER_LIST,
      payload: error.message
    })
  }
}

export const createOrder = data => async dispatch => {
  try {
    const res = await createOrderCart(data);
    if(res.status === 200) {
      dispatch({
        type: ORDER_CREATE,
        payload: res.order
      })

    } else {
      throw new Error(res.msg);
    }
     
  } catch (error) {
    dispatch({
      type: ORDER_CREATE,
      payload: error.message
    })
  }
}

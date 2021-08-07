import { LOAD_ORDERS } from './actions-types';
import { getOrdersByUsertId } from '../../api/order';

export const loadOrdersByUserId = (id) => {

  return async (dispatch) => {
    const res = await getOrdersByUsertId(id);
    // console.log(res);

    dispatch({
      type: LOAD_ORDERS,
      payload: res.ordersByUserId
    })

  }
}

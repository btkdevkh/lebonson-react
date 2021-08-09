import { 
  LOAD_PRODUCTS_REQUEST, 
  LOAD_PRODUCTS_SUCCESS, 
  LOAD_PRODUCTS_FAIL,
  LOAD_PRODUCTS_BY_ORDER_ID_REQUEST,
  LOAD_PRODUCTS_BY_ORDER_ID_SUCCESS,
  LOAD_PRODUCTS_BY_ORDER_ID_FAIL
} from './actions-types';
import { getAllProducts, getProductsByOrderId } from '../../api/product';

export const loadProducts = () => async dispatch => {
  try {
    dispatch({ type: LOAD_PRODUCTS_REQUEST })

    const res = await getAllProducts();
    if(res.status === 200) {
      dispatch({
        type: LOAD_PRODUCTS_SUCCESS,
        payload: res.products
      })
    } else {
      throw new Error(res.msg)
    }

  } catch (error) {
    console.log(error);
    dispatch({
      type: LOAD_PRODUCTS_FAIL,
      payload: error.message
    })
  }
}

export const loadProductsByOrderId = id => async dispatch => {
  try {
    dispatch({ type: LOAD_PRODUCTS_BY_ORDER_ID_REQUEST })

    const res = await getProductsByOrderId(id);
    //console.log(res);
    if(res.status === 200) {
      dispatch({
        type: LOAD_PRODUCTS_BY_ORDER_ID_SUCCESS,
        payload: res.productsByOrderId
      })
    } else {
      throw new Error(res.msg)
    }

  } catch (error) {
    console.log(error);
    dispatch({
      type: LOAD_PRODUCTS_BY_ORDER_ID_FAIL,
      payload: error.message
    })
  }
}

import { LOAD_PRODUCTS } from './actions-types';

export const loadProducts = (products) => {
  return (dispatch) => {
    dispatch({
      type: LOAD_PRODUCTS,
      payload: products
    })
  }
}

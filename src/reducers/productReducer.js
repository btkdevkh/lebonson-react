import { LOAD_PRODUCTS } from '../actions/product/actions-types';

const initialState = {
  products: [],
  loading: true
}

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return {
        products: action.payload,
        loading: false
      }
    default: return state
  }
}

export default ProductReducer;

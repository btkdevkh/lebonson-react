import { 
  LOAD_PRODUCTS_REQUEST, 
  LOAD_PRODUCTS_SUCCESS, 
  LOAD_PRODUCTS_FAIL, 
  LOAD_PRODUCTS_BY_ORDER_ID_REQUEST, 
  LOAD_PRODUCTS_BY_ORDER_ID_SUCCESS, 
  LOAD_PRODUCTS_BY_ORDER_ID_FAIL 
} from '../actions/product/actions-types';

const initialState = {
  products: [],
}

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS_REQUEST:
      return {
        products: [],
        loading: true
      }
    case LOAD_PRODUCTS_SUCCESS:
      return {
        products: action.payload,
        loading: false
      }
    case LOAD_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    default: return state
  }
}

export const productByOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS_BY_ORDER_ID_REQUEST:
      return {
        products: [],
        loading: true
      }
    case LOAD_PRODUCTS_BY_ORDER_ID_SUCCESS:
      return {
        products: action.payload,
        loading: false
      }
    case LOAD_PRODUCTS_BY_ORDER_ID_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    default: return state
  }
}

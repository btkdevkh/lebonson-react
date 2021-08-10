import { 
  PRODUCT_LIST,
  PRODUCT_DETAILS,
  PRODUCT_BY_ORDER_ID,
  PRODUCT_CREATE,
  PRODUCT_UPDATE,
  PRODUCT_DELETE
} from '../actions/product/actions-types';

const initialState = {
  products: [],
  productsByOrder: [],
  loading: true,
  product: {},
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST:
      return {
        ...state,
        products: action.payload,
        loading: false
      }
    case PRODUCT_BY_ORDER_ID:
      return {
        ...state,
        productsByOrder: action.payload,
        loading: false
      }
    case PRODUCT_CREATE:
      return {
        ...state,
        product: action.payload,
        loading: false
      }
    case PRODUCT_UPDATE:
      return {
        ...state,
        product: action.payload,
        loading: false
      }
    case PRODUCT_DETAILS:
      return {
        ...state,
        product: action.payload,
        loading: false
      }
    case PRODUCT_DELETE:
      return { 
        ...state,
        product: action.payload,
        loading: false
      }
    default: return state
  }
}

export default productReducer;

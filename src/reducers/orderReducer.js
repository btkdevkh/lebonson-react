import { 
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  LOAD_ORDERS_FAIL,
  LOAD_ORDERS_REQUEST, 
  LOAD_ORDERS_SUCCESS 
} from '../actions/order/actions-types';

const initialState = {
  orders: [],
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ORDERS_REQUEST:
      return {
        orders: [],
        laoding: true
      }
    case LOAD_ORDERS_SUCCESS:
      return {
        orders: action.payload,
        laoding: false
      }
    case LOAD_ORDERS_FAIL:
      return {
        laoding: false,
        error: action.payload
      }
    case CREATE_ORDER_REQUEST:
      return {
        orders: [],
        laoding: true
      }
    case CREATE_ORDER_SUCCESS:
      return {
        orders: action.payload,
        laoding: false
      }
    case CREATE_ORDER_FAIL:
      return {
        laoding: false,
        error: action.payload
      }
    default: return state;
  }
}

export default orderReducer;

import { 
  ORDER_LIST,
  ORDER_CREATE
} from '../actions/order/actions-types';

const initialState = { orders: [] }

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_LIST:
      return {
        ...state,
        orders: action.payload
      }
    case ORDER_CREATE:
      return {
        ...state,
        orders: action.payload,
      }
    default: return state;
  }
}

export default orderReducer;

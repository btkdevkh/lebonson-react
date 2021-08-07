import { LOAD_ORDERS } from '../actions/order/actions-types';

const initialState = {
  orders: [],
  laoding: true,
}

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ORDERS:
      return {
        orders: action.payload,
        laoding: false
      }
    default: return state;
  }
}

export default OrderReducer;

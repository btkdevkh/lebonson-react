import { 
  ADD_TO_CART, 
  REMOVE_FROM_CART 
} from '../actions/cart/actions-types';

let productsInCartLS = JSON.parse(window.localStorage.getItem('products-in-cart'));
let isEmpty = false;

if(productsInCartLS === null) {
  productsInCartLS = [];
  isEmpty = true;
}

const initialState = {
  carts: productsInCartLS,
  isCartEmpty: isEmpty
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        carts: action.payload,
        isCartEmpty: isEmpty
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        carts: action.payload,
        isCartEmpty: isEmpty
      }
    default: return state
  }
}

export default cartReducer;

import { combineReducers } from "redux";
import ProductReducer from './productReducer';
import CartReducer from "./cartReducer";
import UserReducer from "./userReducer";
import OrderReducer from "./orderReducer";

const rootReducer = combineReducers({
  user: UserReducer,
  product: ProductReducer,
  cart: CartReducer,
  order: OrderReducer,
})

export default rootReducer;

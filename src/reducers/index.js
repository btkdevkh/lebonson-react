import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";
import productReducer from './productReducer';
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
  order: orderReducer
})

export default rootReducer;

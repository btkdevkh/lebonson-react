import { combineReducers } from "redux";
import { productReducer, productByOrderReducer } from './productReducer';
import cartReducer from "./cartReducer";
import { userReducer } from "./userReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  productByOrder: productByOrderReducer,
  cart: cartReducer,
  order: orderReducer,
})

export default rootReducer;

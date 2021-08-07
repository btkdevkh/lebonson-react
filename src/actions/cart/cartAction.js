import { ADD_TO_CART, REMOVE_FROM_CART } from './actions-types';
import { getOneProduct } from '../../api/product';

// Add to cart initial
export const addToCart = (id, selectedQty, carts) => {
  // console.log("CART ACTION ID", id);
  // console.log("CART ACTION SELECTED QTY", selectedQty);
  // console.log("CART ACTION CART", cart);

  return async (dispatch) => {
    const { product } = await getOneProduct(id);

    let isAlready = false;
    for(let i = 0; i < carts.length; i++) {
      if(carts[i].id === parseInt(id)) {

        // We can do by this way if we have a lot of products in stock
        // It will add 1 Qty, everytime we click add to card
        //--> const newQuantity = parseInt(cart[i].selectedQuantity) + parseInt(selectedQty);
        
        // This way is recommend because we can controle our stock
        // Everytime user want to change the Qty
        // It will replace an old Qty to a new one without add 1
        carts[i].selectedQuantity = parseInt(selectedQty);

        // Bool
        isAlready = true;
      }
    }

    if(isAlready === false) {
      product.selectedQuantity = parseInt(selectedQty);
      carts.push(product);
    }
    
    dispatch({
      type: ADD_TO_CART,
      payload: carts
    })

    window.localStorage.setItem('products-in-cart', JSON.stringify(carts))
  }

}

// Remove from cart
export const removeFromCart = (productSelectedId, carts) => {
  // console.log(carts);
  return async (dispatch) => {
    
    const rmItemIdx = carts.findIndex(rmItem => rmItem.id === productSelectedId)

    carts.splice(rmItemIdx, 1);

    window.localStorage.setItem('products-in-cart', JSON.stringify(carts))

    dispatch({
      type: REMOVE_FROM_CART,
      payload: carts
    })
  }

}

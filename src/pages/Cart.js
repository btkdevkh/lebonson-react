import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { config } from '../config';
import { addToCart, removeFromCart } from '../actions/cart/cartAction';
import HeadingThree from '../components/HeadingThree';
import Button from '../components/Button';
import '../assets/css/Cart.css';

const Cart = () => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.user);
  const cartList = useSelector(state => state.cart);
  const { isLogged } = users;
  const { carts } = cartList;

  const history = useHistory();

  return (
    <section className="cart">
      { carts.length > 0 && <HeadingThree title="Panier" /> }
      {
        carts.length > 0 ?
        carts.map((item) => (
        <Fragment key={item.id}>
          <article className="cart-item">

            <img src={`${config.img_url}/${item.image}`} alt={item.title} />
            
            <div className="cart-item-infos">
              <p>{item.title}</p>
              <p>Prix : {item.selectedQuantity * item.price} €</p>
              <label>Quantité : {item.selectedQuantity}</label>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <input
                  type="number"
                  value={item.selectedQuantity} 
                  min="0" 
                  max="100"
                  onChange={(e) => {
                    
                  }}
                />

                {/* - button */}
                <button
                  onClick={() => {
                    if(item.selectedQuantity <= 1) {
                      console.log("NO -");
                    } else {
                      dispatch(addToCart(item.id, item.selectedQuantity - 1, carts));
                    }
                  }}
                >
                  <i className="fas fa-minus"></i>
                </button>

                {/* + button */}
                <button
                  onClick={() => {
                    if(item.selectedQuantity >= item.quantity) {
                      console.log("NO +");
                    } else {
                      dispatch(addToCart(item.id, item.selectedQuantity + 1, carts));
                    }
                  }}
                >
                  <i className="fas fa-plus"></i>
                </button>
              </form>
            </div>

            {/* Absolute element */}
            <button 
              className="cart-item-rm-btn"
              onClick={() => {
                dispatch(removeFromCart(item.id, carts));
              }}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
    
          </article>
        </Fragment>
        )) :
        <Fragment>
          <HeadingThree title="Panier vide" className="txt-center" />
          <Button 
            className="btn"
            title="Retour au shopping" 
            onClick={() => history.push('/products')}
          />
        </Fragment>
      }
      
      {
        carts.length > 0 &&
        <Fragment>
          <HeadingThree
            title={`Prix Total : ${carts.reduce((acc, item) => acc + item.selectedQuantity * item.price, 0).toFixed(2)} €`}
          />
          <Button 
            className="btn"
            title="Valider le panier" 
            onClick={() => {
              isLogged === false ?
              history.push('/user/login') :
              history.push('/order/shipping')
            }}
          />
        </Fragment>
      }
    </section> 
  )
}

export default Cart;

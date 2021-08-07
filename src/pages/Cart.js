import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { config } from '../config';
import { addToCart, removeFromCart } from '../actions/cart/cartAction';
import HeadingThree from '../components/HeadingThree';
import Button from '../components/Button';
import '../assets/css/Cart.css';

const Cart = (props) => {
  // console.log(props.cart.carts);

  return (
    <section className="cart">
      { 
        props.cart.carts.length > 0 && 
        <HeadingThree title="Panier" /> 
      }

      {
        props.cart.carts.length > 0 ?
        props.cart.carts.map((item) => (
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
                      props.addToCart(item.id, item.selectedQuantity - 1, props.cart.carts);
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
                      props.addToCart(item.id, item.selectedQuantity + 1, props.cart.carts);
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
                props.removeFromCart(item.id, props.cart.carts)
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
            onClick={() => props.history.push('/products')}
          />
        </Fragment>
      }
      
      {
        props.cart.carts.length > 0 &&
        <Fragment>
          <HeadingThree
            title={`Prix Total : ${props.cart.carts.reduce((acc, item) => acc + item.selectedQuantity * item.price, 0).toFixed(2)} €`}
          />
          <Button 
            className="btn"
            title="Valider le panier" 
            onClick={() => {
              props.user.isLogged === false ?
              props.history.push('/user/login') :
              props.history.push('/order/shipping')
            }}
          />
        </Fragment>
      }
    </section> 
  )
}

const mapStateToProps = (store) => {
  return {
    user: store.user,
    cart: store.cart
  }
}

const mapDispatchToProps = {
  addToCart,
  removeFromCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

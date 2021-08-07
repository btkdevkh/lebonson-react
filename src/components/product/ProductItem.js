import React, { Fragment, useState } from 'react';
import { config } from '../../config';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from '../../actions/cart/cartAction';

const ProductItem = (props) => {
  //console.log(props);

  // Destructuring from props of products
  const { id, title, price, image, quantity } = props.product;
  
  const [selectedQty, setSelectedQty] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  const handleClickPlus = () => {
    if(selectedQty >= quantity) {
      console.log("Il rest 0");
    } else {
      setSelectedQty(selectedQty + 1);
    }
  }

  const handleClickMinus = () => {
    setSelectedQty(selectedQty - 1);

    if(selectedQty < 1) {
      console.log("Au moins 1 article requise");
      setSelectedQty(0)
    }
  }

  return (
    <Fragment>
      { redirect && <Redirect to="/products"/> }
      <article className="product-item">
        <img src={`${config.img_url}/${image}`} alt={title} />
        <div className="product-item-infos">
          <h4>{title}</h4>
          <h4>Prix: {price.toFixed(2)} €</h4>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="number"
            value={selectedQty} 
            onChange={(e) => {
              setSelectedQty(e.target.value)
            }}
          />
          <button
            onClick={() => {
              handleClickMinus()
            }}
          >
            <i className="fas fa-minus"></i>
          </button>
          <button
            onClick={() => {
              handleClickPlus();
            }}
          >
            <i className="fas fa-plus"></i>
          </button>

          <button
            type="button"
            className="btn-add-to-cart"
            title="Ajouter au panier"
            onClick={() => {
              if(selectedQty < 1) {
                console.log("NO");
              } else {
                props.addToCart(id, selectedQty, props.cart.carts);
                
                setSelectedQty(0);
                setRedirect(true);
              }
            }}
          >
            Ajouter <i className="fas fa-cart-arrow-down"></i>
          </button>
          <button
            type="button"
            onClick={() => {
              history.push(`/products/details/${id}`);
            }}
            title="Voir les détails"
            className="btn-infos"
          >
            Infos
          </button>
        </form>
      </article>
    </Fragment>
  )
}

const mapStateToProps = (store) => {
  return {
    cart: store.cart,
  }
}

const mapDispatchToProps = {
  addToCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);

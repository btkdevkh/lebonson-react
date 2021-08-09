import React, { Fragment, useState } from 'react';
import { config } from '../../config';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../actions/cart/cartAction';

const ProductItem = ({ product }) => {
  const { id, title, price, image, quantity } = product;
  
  const [selectedQty, setSelectedQty] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();
  const cartState = useSelector(state => state.cart);
  const { carts } = cartState;

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
      {product &&
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
                dispatch(addToCart(id, selectedQty, carts));
                
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
      </article> }
    </Fragment>
  )
}

export default ProductItem;

import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { config } from '../../config';
import { addToCart } from '../../actions/cart/cartAction';
import HeadingThree from '../HeadingThree';
import Button from '../Button';

const ProductDetails = (props) => {
  const id = parseInt(props.match.params.id);

  const [selectedQty, setSelectedQty] = useState(0);
  const [redirect, setRedirect] = useState(false);

  const dispatch = useDispatch();
  
  const productState = useSelector(state => state.product);
  const { products } = productState;

  const cartState = useSelector(state => state.cart);
  const { carts } = cartState;

  const handleClickPlus = () => {
    setSelectedQty(selectedQty + 1);
  }

  const handleClickMinus = () => {
    setSelectedQty(selectedQty - 1);
  }

  const productDetails = products.filter(product => {
    return product.id === id;
  })

  return (
    <Fragment>
      {redirect && <Redirect to="/products/cart"/>}
      {
        productDetails &&
        productDetails.map(product => (
          <section className="products details" key={product.id}>
            <HeadingThree title="Détails du produit" />
              <article className="product-item details">
                <img src={`${config.img_url}/${product.image}`} alt={product.title} />
                <div className="product-item-infos details">
                  <h4>{ product.title }</h4>
                  <p>Prix : { product.price.toFixed(2) } €</p>
                  <p>Quantités en stock : { product.quantity }</p>
                  <p className="mt">{ product.description }</p>
                  <p className="margin">Quantités sélectionnées: {selectedQty}</p>
                </div>
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <input
                    type="number"
                    value={selectedQty} 
                    min="0" 
                    max="100"
                    onChange={(e) => {
                      setSelectedQty(e.target.value)
                    }}
                  />
                  <button
                    onClick={() => {
                      if(selectedQty < 1) {
                        console.log("NO -");
                      } else {
                        handleClickMinus()
                      }
                    }}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <button
                    onClick={() => {
                      if(selectedQty >= product.quantity) {
                        console.log("NO +");
                      } else {
                        handleClickPlus();
                      }
                    }}
                  >
                    <i className="fas fa-plus"></i>
                  </button>

                  <button
                    type="button"
                    title="Ajouter au panier"
                    className="btn-add-to-cart"
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
                    {/* <i className="fas fa-cart-arrow-down"></i> */}
                    Ajouter <i className="fas fa-cart-arrow-down"></i>
                  </button>
                </form>
              </article>
            <Button
              className="btn mt"
              title="Retour au shopping"
              onClick={() => props.history.push("/products")}
            />
          </section>
        ))
      }
    </Fragment>
  )
}

export default ProductDetails;

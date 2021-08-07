import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadProducts } from '../../actions/product/productAction';
import { config } from '../../config';
import { addToCart } from '../../actions/cart/cartAction';
import HeadingThree from '../HeadingThree';
import Button from '../Button';
import { deleteClass } from '../../helpers/deleteClass';

const ProductDetails = (props) => {
  const id = parseInt(props.match.params.id);
  // console.log(id);

  const [selectedQty, setSelectedQty] = useState(0);
  const [redirect, setRedirect] = useState(false);

  const handleClickPlus = () => {
    setSelectedQty(selectedQty + 1);
  }

  const handleClickMinus = () => {
    setSelectedQty(selectedQty - 1);
  }

  let sameProductId;
  sameProductId = props.product.products.filter(product => {
    return product.id === id;
  })

  // Effect nav li selected
  useEffect(() => {
    const lis = document.querySelectorAll('nav ul li');
    deleteClass(lis, 'selected');
    for(let i = 0; i < lis.length; i++) {
      window.location.pathname === '/products/details/'+id &&
      lis[1].classList.add('selected');
    }
  })

  return (
    <Fragment>
      {redirect && <Redirect to="/products/cart"/>}
      {
        sameProductId &&
        sameProductId.map(product => (
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
                        props.addToCart(id, selectedQty, props.cart.carts);
                        
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

const mapStateToProps = (store) => {
  return {
    product: store.product
  }
}

const mapDispatchToProps = {
  loadProducts,
  addToCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getAllProducts } from '../api/product';
import { loadProducts } from '../actions/product/productAction';
import { addToCart } from '../actions/cart/cartAction';
import { connectUser } from '../actions/user/userAction';
import { loadOrdersByUserId } from '../actions/order/orderAction';
import { checkToken } from '../api/auth';

const Hocs = (ChildComponent, withAuth = false) => {

  const RequireDataAuth = (props) => {
    
    const [redirect, setRedirect] = useState(false);

    useEffect(() =>{
      // console.log("HOCS");
      // console.log("PROPS", props);

      // Fetch products
      const fetchData = async () => {
        const results = await getAllProducts()
        if(results.status === 200) {
          props.loadProducts(results.products)
        }
      }

      // If products's length is 0, then fetch products
      if(props.product.products.length === 0) {
        fetchData();
      }

      // User auth
      const token = window.localStorage.getItem('lebonson-token');
      if(props.user.isLogged === false) {
          if(token === null) {
              if(withAuth) {
                setRedirect(redirect => redirect = true);
              }
          } else {
              // If there's a token
              // Check token ...
              checkToken()
              .then(res => {
                // console.log(res);
                if(res.status !== 200) {
                  if(withAuth) {
                    setRedirect(redirect => redirect = true);
                  }
                } else {
                  // console.log(withAuth);
                  res.user !== null && props.connectUser(res.user);

                  //console.log(res);
                  res.user !== null && props.loadOrdersByUserId(res.user.id);
                }
              })
          }
      }

    // eslint-disable-next-line
    }, [connectUser])

    return (
      <>
        {redirect && <Redirect to="/user/login" />}
        <ChildComponent {...props} />  
      </>
    )

  }

  const mapStateToProps = (store) => {
    return {
      user: store.user,
      product: store.product,
      cart: store.cart,
    }
  }

  const mapDispatchToProps = {
    loadProducts,
    addToCart,
    connectUser,
    loadOrdersByUserId
  }

  return connect(mapStateToProps, mapDispatchToProps)(RequireDataAuth);
}

export default Hocs;

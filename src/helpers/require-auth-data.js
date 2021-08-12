import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loadProducts } from '../actions/product/productAction';
import { connectUser } from '../actions/user/userAction';
import { checkToken } from '../api/auth';
import Loading from '../components/Loading';
import HeadingThree from '../components/HeadingThree';

const Hocs = (ChildComponent, withAuth = false) => {

  const RequireDataAuth = (props) => {
    const [redirect, setRedirect] = useState(false);

    const dispatch = useDispatch();
    
    const productState = useSelector(state => state.product);
    const { products, loading, error } = productState;

    const userState = useSelector(state => state.user);
    const { isLogged } = userState;

    useEffect(() => {
      // If there's no products, load products
      if(products.length === 0) {
        dispatch(loadProducts());
      }

      // User auth
      const token = window.localStorage.getItem('lebonson-token');
      if(isLogged === false) {
          if(token === null) {
              if(withAuth) {
                setRedirect(redirect => redirect = true);
              }
          } else {
              // If there's a token
              checkToken()
              .then(res => {
                if(res.status !== 200) {
                  if(withAuth) {
                    setRedirect(redirect => redirect = true);
                  }
                } else {
                  res.user !== null && dispatch(connectUser(res.user));
                }
              })
          }
      }

      // eslint-disable-next-line
    }, [dispatch])

    return (
      <Fragment>
        {redirect && <Redirect to="/user/login" />}

        {loading ? <Loading /> : error ? <HeadingThree title={error} className="txt-center txt-bg" /> :
        <ChildComponent {...props} />}
      </Fragment>
    )

  }

  return RequireDataAuth;
}

export default Hocs;

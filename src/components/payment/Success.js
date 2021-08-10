import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Button from '../Button';
import '../../assets/css/Success.css';

const Success = () => {
  const history = useHistory();

  const cartState = useSelector(state => state.cart);
  const { carts } = cartState;

  useEffect(() => {
    if(carts.length > 0) {
      window.localStorage.removeItem('products-in-cart');
      window.location.reload();
    }
    // eslint-disable-next-line
  }, [])

  return (
    <section className="success">
      <div className="home-description mt">
        <p>Votre commande a bien été passée.</p>
      </div>
      <Button
        className="btn mt"
        title="Retour à l'accueil"
        onClick={() => history.push('/')}
      />
    </section>
  );
}

export default Success;

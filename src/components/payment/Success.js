import React, { useEffect } from 'react';
import Button from '../Button';
import '../../assets/css/Success.css';

const Success = (props) => {
  // console.log(props.cart);

  useEffect(() => {
    if(props.cart.carts.length > 0) {
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
        onClick={() => props.history.push('/')}
      />
    </section>
  );
}

export default Success;

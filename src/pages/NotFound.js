import React from 'react';
import { useHistory } from 'react-router';
import HeadingThree from '../components/HeadingThree';
import Button from '../components/Button';

const NotFound = () => {
  const history = useHistory();
  return (
    <section className="home">
      <HeadingThree title="Erreur 404" />
      <div className="home-description margin txt-justify">
        <p>Oupp ! Page non trouvé...</p>
      </div>
      <Button
        className="btn mb"
        title="Retour à l'accueil"
        onClick={() => history.push('/')}
      />
    </section>
  )
}

export default NotFound;

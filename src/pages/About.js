import React from 'react';
import HeadingThree from '../components/HeadingThree';
import Button from '../components/Button';

const About = (props) => {
  return (
    <section className="home">
      <HeadingThree title="Qui nous somme ?" />

      <div className="home-description margin txt-justify">
        <p>Notre société Lebonson est fondé en 1990, Nous somme le numéro 123ème du e-commerce spécialisé des produits de son de qualités, que vous soyez artistes, podcasters, youtubers amateur ou professionel, chez nous, vous trouverez les materiels de qualités pour votre enregistrement, en passant par les microphones d'enregistrement à l'instrument de musique ...</p>
      </div>

      <Button
        className="btn mt"
        title="Retour à l'accueil"
        onClick={() => props.history.push('/')}
      />
    </section>
  )
}

export default About;

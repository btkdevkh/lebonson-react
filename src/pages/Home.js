import React from 'react';
import HeadingThree from '../components/HeadingThree';
import ProductSlider from '../components/product/ProductSlider';
import Button from '../components/Button';
import '../assets/css/Home.css';

const Home = (props) => {
  //console.log(props);
  return (
    <section className="home">
      <HeadingThree title="Produits phares" />
      <ProductSlider />
      <div className="home-description margin txt-justify">
        <p>Bienvenue chez lebonson, Nous somme le numéro 123ème du e-commerce spécialisé des produits de son de qualités, que vous soyez artistes, podcasters, youtubers amateur ou professionel, chez nous, vous trouverez les materiels de qualités pour votre enregistrement, en passant par les microphones d'enregistrement à l'instrument de musique ...</p>
      </div>
      <Button
        className="btn mb"
        title="Voir nos produits"
        onClick={() => props.history.push('/products')}
      />
    </section>
  )
}

export default Home;

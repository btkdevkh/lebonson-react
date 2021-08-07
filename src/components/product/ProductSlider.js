import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { config } from '../../config';
import { connect } from 'react-redux';
import { loadProducts } from '../../actions/product/productAction';
import '../../assets/css/ProductSlider.css';

const ProductSlider = (props) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const count = handleProductsCarousel();

    // componentWillUnMount
    return () => {
      clearInterval(count);
    }
    
  // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(index > props.product.products.length - 1) {
      setIndex(index => index = 0);
    }
    // eslint-disable-next-line
  }, [index])

  const handleProductsCarousel = () => {
    return setInterval(() => {
      setIndex(index => index + 1);
    }, 5000);
  }

  return (
    <article className="product-slider">
      {
        props.product.products[index] &&
        <Link to={`/products/details/${props.product.products[index].id}`}>
          <div className="product-slider-infos">
            <img src={`${config.img_url}/${props.product.products[index].image}`} alt={props.product.products[index].title} />
          </div>
        </Link>
      }
    </article>
  )
}

const mapStateToProps = (store) => {
  return {
    product: store.product
  }
}

const mapDispatchToProps = {
  loadProducts,
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductSlider);

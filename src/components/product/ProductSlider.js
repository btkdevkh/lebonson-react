import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { config } from '../../config';
import { useSelector } from 'react-redux';
import '../../assets/css/ProductSlider.css';

const ProductSlider = () => {
  const [index, setIndex] = useState(0);

  const productState = useSelector(state => state.product);
  const { products } = productState

  useEffect(() => {
    const count = handleProductsCarousel();
    // Clean up
    return () => {
      clearInterval(count);
    }
  }, [])

  useEffect(() => {
    if(index > products.length - 1) {
      setIndex(o => o = 0);
    }
    // console.log(index);
  }, [products, index])

  const handleProductsCarousel = () => {
    return setInterval(() => {
      setIndex(o => o + 1);
    }, 7000);
  }

  return (
    <article className="product-slider">
      {
        products[index] &&
        <Link to={`/products/details/${products[index].id}`}>
          <div className="product-slider-infos">
            <img src={`${config.img_url}/${products[index].image}`} alt={products[index].title} />
          </div>
        </Link>
      }
    </article>
  )
}

export default ProductSlider;

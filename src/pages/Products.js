import React from 'react';
import { useSelector } from 'react-redux';
import ProductItem from '../components/product/ProductItem';
import HeadingThree from '../components/HeadingThree';
import '../assets/css/Products.css';

const Products = () => {

  const productState = useSelector(state => state.product);
  const { products } = productState;

  return (
    <section className="products">
      <HeadingThree title="Produits" />
      <div className="product-item-container">
        {
          products &&
          products.map(product => {
            return <ProductItem key={product.id} product={product} />
          })
        }
      </div>
    </section>
  )
}

export default Products;

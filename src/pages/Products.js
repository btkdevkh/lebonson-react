import React from 'react';
import { connect } from 'react-redux';
import { loadProducts } from '../actions/product/productAction';
import ProductItem from '../components/product/ProductItem';
import HeadingThree from '../components/HeadingThree';
import '../assets/css/Products.css';

const Products = (props) => {
  return (
    <section className="products">
      <HeadingThree title="Produits" />
      <div className="product-item-container">
        {
          props.product.products &&
          props.product.products.map(product => {
            return <ProductItem key={product.id} product={product} />
          })
        }
      </div>
    </section>
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

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Products);

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../actions/product/productAction';
import HeadingThree from '../HeadingThree';
import { saveImage } from '../../api/product';

const AddProduct = ({ setShowAddForm }) => {

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  
  const productState = useSelector(state => state.product);
  const { product } = productState;

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setShowAddForm(true);

    // Save image first
    saveImage(image)
    .then(res => {
      if(res.status === 201) {
        const product = {
          title,
          price,
          image: res.url,
          quantity,
          description
        }

        // Then save product
        dispatch(createProduct(product));
        setTimeout(() => setShowAddForm(false), 3000);

      } else {
        const product = {
          title,
          price,
          image: 'no-picture.png',
          quantity,
          description
        }

        // Then save product
        dispatch(createProduct(product));
        setTimeout(() => setShowAddForm(false), 3000);

      }
    })
    
  }

  return (
    <section className="form">
      <HeadingThree title="Ajouter un produit" className="txt-center" />
      <form onSubmit={handleOnSubmit}>
        <div>
          <input
            type="text"
            placeholder="Nom du produit"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Prix"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Quantité"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div>
          <textarea
            rows="8"
            placeholder="Déscription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <input
            id="file"
            type="file"
            onChange={(e) => {
              // console.log(e.target.files[0])
              setImage(e.target.files[0])
            }}
          />
        </div>
        <div>
          <input
            type="submit"
            value="Ajouter"
          />
        </div>
      </form>
      
      <p className={
        product && 
        typeof product === "object" ? 
        "success txt-center mt" : 
        "error txt-center mt"
        }>
          { product && typeof product === "object" ? product.msg : product }
      </p>
    </section>
  )
}

export default AddProduct;

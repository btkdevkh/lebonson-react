import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editProduct } from '../../actions/product/productAction';
import { saveImage } from '../../api/product';
import HeadingThree from '../HeadingThree';

const EditProduct = ({ id, products, setShowEditForm }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // Grab products from props & find a correct one to upadte
  const findProductById = products.find(product => product.id === id);

  const dispatch = useDispatch();

  const productState = useSelector(state => state.product);
  const { product } = productState;

  useEffect(() => {
    setTitle(findProductById.title);
    setPrice(findProductById.price.toFixed(2));
    setQuantity(findProductById.quantity);
    setDescription(findProductById.description);
    setImage(findProductById.image);

  }, [dispatch, findProductById, product])

  const handleOnSubmit = (e) => {
    e.preventDefault();
    
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
        dispatch(editProduct(product, id));
        setTimeout(() => setShowEditForm(false), 3000);

      } else {
        const product = {
          title,
          price,
          image: 'no-picture.png',
          quantity,
          description
        }

        // Then save product
        dispatch(editProduct(product, id));
        setTimeout(() => setShowEditForm(false), 3000);

      }
    })
  }

  return (
    <section className="form">
      <HeadingThree title="Modifier un produit" className="txt-center" />
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
            value="Modifier"
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

export default EditProduct;

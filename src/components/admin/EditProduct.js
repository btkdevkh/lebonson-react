import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { getOneProduct, saveImage, updateOneProduct, getAllProducts } from '../../api/product';
import HeadingThree from '../HeadingThree';
import { connect } from 'react-redux';
import { loadProducts } from '../../actions/product/productAction';

const EditProduct = (props) => {

  //console.log("ID", props.id);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [error, setError] = useState("");

  // eslint-disable-next-line
  const [sucess, setSucess] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    getOneProduct(props.id)
    .then(res => {
      setTitle(res.product.title)
      setPrice(res.product.price.toFixed(2))
      setQuantity(res.product.quantity)
      setDescription(res.product.description)
      setImage(res.product.image)
    }, [])

    return () => {
      return false;
    }
    // eslint-disable-next-line 
  }, [props])

  const handleOnSubmit = async () => {
    //console.log(123);

    if(!title || !price || !quantity || !description) {
      setError("* Champs Obligatoire");
    } else {
      try {
        setError("");

        console.log("IMAGE" ,image);

        saveImage(image)
        .then(res => {
          if(res.status === 200) {
            console.log(res.url);
            
            const product = {
              title,
              price,
              image: res.url,
              quantity,
              description
            }
            console.log(product);

            updateOneProduct(product, props.id)
            .then(res => {
              if(res.status === 200) {
                console.log("OK");
                getAllProducts()
                .then(res => {
                  props.loadProducts(res.products)
                  setRedirect(true);
                  props.setShowEditForm(false);
                })
              }
            })
          } else {
            const product = {
              title,
              price,
              image: "no-picture.png",
              quantity,
              description
            }
            //console.log(product);

            updateOneProduct(product, props.id)
            .then(res => {
              if(res.status === 200) {
                //console.log("OK");
                getAllProducts()
                .then(res => {
                  props.loadProducts(res.products)
                  setRedirect(true);
                  props.setShowEditForm(false);
                })
              }
            })
          }

        })

      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className="form">
      {redirect && <Redirect to="/admin" />}
      <HeadingThree title="Modifier un produit" className="txt-center" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
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
              console.log(e.target.files[0])
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
      <p className={`error`}>{error}</p>
      <p className={`success`}>{sucess}</p>
    </section>
  )
}

const mapStateToProps = (store) => {
  return {}
}

const mapDispatchToProps = {
  loadProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);

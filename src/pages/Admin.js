import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllusers } from '../actions/user/userAction';
import { deleteProduct, loadProducts } from '../actions/product/productAction';
import HeadingThree from '../components/HeadingThree';
import Button from '../components/Button';
import AddProduct from '../components/admin/AddProduct';
import EditProduct from '../components/admin/EditProduct';
import EditUserRole from '../components/admin/EditUserRole';
import '../assets/css/Admin.css';

const Admin = () => {

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [id, setId] = useState(null);
  const history = useHistory();

  const dispatch = useDispatch();

  const userState = useSelector(state => state.user);
  const { userInfos, isLogged, users } = userState;

  const productState = useSelector(state => state.product);
  const { products } = productState;

  useEffect(() => { 
    //dispatch(loadAllusers());
    users.length === 0 && dispatch(loadAllusers());

    if(isLogged) {
      if(userInfos.role !== "Admin") {
        //console.log("TRUE");
        history.push("/");
      }
    }
  }, [history, isLogged, users, userInfos, dispatch])

  return (
    <section className="admin">
      <HeadingThree title="Administration" className="txt-center" />
      <table className="mb">
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.role}</td>
                <td><EditUserRole role={user.role} id={user.id} /></td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th>Article</th>
            <th>Quantité</th>
            <th>Prix</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            products &&
            products.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>{item.price.toFixed(2)} €</td>
                <td
                  style={{cursor: "pointer", color: "orange"}}
                  onClick={() => {
                    setId(item.id);
                    setShowAddForm(false)
                    setShowEditForm(true)
                  }}
                >
                  <i className="fas fa-pencil-alt"></i>
                </td>
                <td
                  style={{cursor: "pointer", color: "#ff0000"}}
                  onClick={() => {
                    if(window.confirm("Voulez vous supprimer ce produit ?")) {
                      dispatch(deleteProduct(item.id));
                      dispatch(loadProducts());
                    }
                  }}
                >
                  <i className="fas fa-trash-alt"></i>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Button 
        className="btn mt"
        title="Ajouter un produit"
        onClick={() => {
          setShowAddForm(o => !o)
          setShowEditForm(o => o = false)
        }}
        
      />
      
      {showAddForm && <AddProduct setShowAddForm={setShowAddForm} />}
      {showEditForm && <EditProduct products={products} id={id} setShowEditForm={setShowEditForm} />}

    </section>
  )
}

export default Admin;

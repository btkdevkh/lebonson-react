import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom'
import HeadingThree from '../components/HeadingThree';
import Button from '../components/Button';
import AddProduct from '../components/admin/AddProduct';
import EditProduct from '../components/admin/EditProduct';
import { deleteOneProduct, getAllProducts } from '../api/product';
import { connect } from 'react-redux';
import { loadProducts } from '../actions/product/productAction';
import { getAllUsers } from '../api/user';
import EditUserRole from '../components/admin/EditUserRole';
import '../assets/css/Admin.css';

const Admin = (props) => {
  console.log(props);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [id, setId] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if(props.user.infos !== null) {
      if(props.user.infos.role !== "Admin") {
        //console.log("TRUE");
        props.history.push("/");
      } else {
        getAllUsers()
        .then(res => {
          console.log(res);
          setUsers(res.users);
        })
      }
    }
  }, [props])

  return (
    <section className="admin">
      {redirect && <Redirect to="/admin" />}
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
            users.length > 0 &&
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
            props.product.products.length > 0 &&
            props.product.products.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>{item.price.toFixed(2)} €</td>
                <td
                  style={{cursor: "pointer", color: "orange"}}
                  onClick={() => {
                    console.log(123);
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
                      deleteOneProduct(item.id)
                      .then(res => {
                        console.log(res);
                        getAllProducts()
                        .then(res => {
                          props.loadProducts(res.products)
                          setRedirect(true);
                        })
                      })
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
      {showEditForm && <EditProduct id={id} setShowEditForm={setShowEditForm} />}

    </section>
  )
}

const mapStateToProps = (store) => {
  return {
    product: store.product
  }
}

const mapDispatchToProps = {
  loadProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);

// <option value={user.role}>{user.role}</option>

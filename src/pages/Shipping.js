import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrderCart } from '../api/order';
import Button from '../components/Button';
import HeadingThree from '../components/HeadingThree';
import '../assets/css/Shipping.css';

const Shipping = (props) => {

  const [payment, setPayment] = useState("Stripe");
  
  const onClickCheckOut = async () => {
    // console.log(props.user.infos.id);
    try {
      const order = {
        user_id: props.user.infos.id,
        products: props.cart.carts,
      }
      
      if(payment === "Stripe") {
        const res = await createOrderCart(order);
        // console.log(res);
        if(res.status === 200) {
          props.history.push(`/order/payment/${res.order_id}`)
        }
      } else {
        console.log("Error");
      }
       
    } catch (error) {
      console.log(error);
    }
  }

  const itemsPrice = props.cart.carts.reduce((acc, item) => acc + item.selectedQuantity * item.price, 0).toFixed(2);
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = (
    Number(itemsPrice) + 
    Number(taxPrice)
  ).toFixed(2);

  return (
    <section className="shipping">
      <HeadingThree title="Commande" />
      <table>
        <thead>
          <tr>
            <th>Article</th>
            <th>Quantité</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td colSpan="3">Prix HT : {itemsPrice} €</td>
          </tr>
          <tr>
            <td colSpan="3">Prix TVA : {taxPrice} €</td>
          </tr>
          <tr>
            <td colSpan="3">Prix TTC : <strong>{totalPrice} €</strong></td>
          </tr>
        </tfoot>
        <tbody>
          {
            props.cart.carts.length > 0 &&
            props.cart.carts.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.selectedQuantity}</td>
                <td>{item.selectedQuantity * Math.round(Number.parseFloat(item.price).toFixed(2)*100)/100} €</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <HeadingThree title="Livrer chez" />
      {/* User infos */}
      {
        props.user.infos !== null &&
        <div className="profil-user-infos">
          <p>{props.user.infos.firstName} {props.user.infos.lastName}</p>
          <p>{props.user.infos.address}</p>
          <p>{props.user.infos.zip}, {props.user.infos.city}</p>
          <p>{props.user.infos.email}</p>
          <Link to={`/user/edit/${props.user.infos.id}`} title="Modifier"><i className="fas fa-pencil-alt"></i></Link>
        </div>
      }
      <HeadingThree title="Mode de paiment" />
      <div className="paymentMode mtmb">
        <form>
          <div className="shipping-payment">
            <i className="fas fa-credit-card"></i>&nbsp;&nbsp;
            <label>CB BY STRIPE</label>&nbsp;&nbsp;
            <input 
              type="radio" 
              value="Stripe" 
              name="payment"
              checked={payment === 'Stripe' && true}
              onChange={(e) => {
                setPayment(e.target.value)
              }}
            />
          </div>
        </form>
      </div>
        
      {
        props.user.isLogged === true &&
        <Button
          className="btn mt"
          title="Valider la commande"
          onClick={onClickCheckOut}
        />
      }
    </section> 
  )
}

const mapStateToProps = (store) => {
  return {
    user: store.user,
    cart: store.cart
  }
}

export default connect(mapStateToProps)(Shipping);

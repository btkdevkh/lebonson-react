import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../actions/order/orderAction';
import Button from '../components/Button';
import HeadingThree from '../components/HeadingThree';
import '../assets/css/Shipping.css';

const Shipping = () => {

  const [payment, setPayment] = useState("Stripe");
  const history = useHistory();

  const dispatch = useDispatch();

  const userState = useSelector(state => state.user);
  const { userInfos, isLogged } = userState;

  const cartState = useSelector(state => state.cart);
  const { carts } = cartState;

  const orderState = useSelector(state => state.order);
  const { orders } = orderState;

  useEffect(() => {
    if(orders.affectedRows) {
      history.push(`/order/payment/${orders.insertId}`);
    }
  }, [orders, userInfos, isLogged, history])
  
  const onClickCheckOut = () => {
    if(payment === "Stripe") {
      const order = {
        user_id: userInfos.id,
        products: carts,
      }

      dispatch(createOrder(order));
    } 
  }

  const itemsPrice = carts.reduce((acc, item) => acc + item.selectedQuantity * item.price, 0).toFixed(2);
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
            carts.length > 0 &&
            carts.map((item) => (
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
        userInfos !== null &&
        <div className="profil-user-infos">
          <p>{userInfos.firstName} {userInfos.lastName}</p>
          <p>{userInfos.address}</p>
          <p>{userInfos.zip}, {userInfos.city}</p>
          <p>{userInfos.email}</p>
          <Link to={`/user/edit/${userInfos.id}`} title="Modifier"><i className="fas fa-pencil-alt"></i></Link>
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
        isLogged === true &&
        <Button
          className="btn mt"
          title="Valider la commande"
          onClick={onClickCheckOut}
        />
      }
    </section> 
  )
}

export default Shipping;

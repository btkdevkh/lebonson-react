import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import HeadingThree from '../components/HeadingThree';
import { getProductsByOrderId } from '../api/product';
import PayProvider from '../components/payment/PayProvider';
import '../assets/css/Payment.css';

const Payment = (props) => {

  //console.log(props);

  const [orderDetail, setOrderDetail] = useState([]);

  // eslint-disable-next-line
  const order_id = Number(props.match.params.id);
  useEffect(() => {
    getProductsByOrderId(order_id)
      .then(res => {
        //console.log(res);
        setOrderDetail(res.productsByOrderId)
      })
      // eslint-disable-next-line
  }, [])

  const itemsPrice = orderDetail.reduce((acc, item) => acc + item.total, 0).toFixed(2);
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = (
    Number(itemsPrice) + 
    Number(taxPrice)
  ).toFixed(2);

  return (
    <section className="payment">
      <HeadingThree title="Validation de paiement" />
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
            orderDetail.length > 0 &&
            orderDetail.map((item, idx) => (
              <tr key={idx}>
                <td>{item.title}</td>
                <td>{item.selectedQty}</td>
                <td>{item.total.toFixed(2)} €</td>
              </tr>
            ))
          }
        </tbody>
      </table>

      {
        props.user.isLogged === true &&
        <Fragment>
          <PayProvider order_id={order_id} />
        </Fragment>
      }
    </section> 
  )
}

const mapStateToProps = (store) => {
  return {
    user: store.user,
    cart: store.cart,
    order: store.order
  }
}

export default connect(mapStateToProps)(Payment);

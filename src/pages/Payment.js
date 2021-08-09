import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadProductsByOrderId } from '../actions/product/productAction';
import HeadingThree from '../components/HeadingThree';
import PayProvider from '../components/payment/PayProvider';
import '../assets/css/Payment.css';

const Payment = (props) => {
  const order_id = Number(props.match.params.id);

  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);
  const productByOrderState = useSelector(state => state.productByOrder);
  const { isLogged } = userState;
  const { products } = productByOrderState;

  useEffect(() => {
    dispatch(loadProductsByOrderId(order_id));

    window.location.hash = "#chaged";
    window.onhashchange = locationHashChanged;
    // eslint-disable-next-line
  }, [dispatch])

  // https://developer.mozilla.org/fr/docs/Web/API/WindowEventHandlers/onhashchange
  const locationHashChanged = () => {
    if(window.location.hash === "#chaged") {
      window.location.reload();
    }
  }

  const itemsPrice = products.reduce((acc, item) => acc + item.total, 0).toFixed(2);
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
            products.length > 0 &&
            products.map((item, idx) => (
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
        isLogged === true &&
        <Fragment>
          <PayProvider order_id={order_id} />
        </Fragment> 
      }
    </section> 
  )
}

export default Payment;

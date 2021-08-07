import React, { useState } from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import axios from "axios";
import { config } from '../../config';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadProducts } from '../../actions/product/productAction';

// CB form
const CheckoutForm = (props) => {
  // console.log("CHECKFORM", props);
    
  const [redirect, setRedirect] = useState(false);
  
  const handleSubmit = async (event) => {
      event.preventDefault();
      props.setLoading(true);
      
      let data = {
        email: props.user.infos.email,
        order_id: props.orderId
      }
      // console.log(data);

      let token = window.localStorage.getItem("lebonson-token");

      // Stripe payment
      const paymentAuth = await axios.post(config.api_url+'/api/v1/order/payment', data, { headers: { 'x-access-token': token } });
      //console.log('paymentAuth', paymentAuth);
      
      const secret = paymentAuth.data.client_secret;
      const payment = await props.stripe.confirmCardPayment(secret, {
        payment_method: {
          card: props.elements.getElement(CardElement),
          billing_details: {
            email: props.user.infos.email
          },
        },
      });
              
      // If error          
      if(payment.error) {
        console.log(payment.error.message);
        props.setLoading(false);
      } else {
        // If payment is succeeded
        if (payment.paymentIntent.status === 'succeeded') {
          // console.log('Payment Succeeded');
          props.setLoading(false);

          let data = {
            order_id: props.orderId,
            status: "Paid"
          }
          // change status to paid
          axios.put(config.api_url+"/api/v1/order/validate", data, { headers: { 'x-access-token': token } })
          .then((response)=>{
            //console.log(response);
            props.loadProducts(response.data.products);
            setRedirect(true);
          })
        }
      }
  }

  if(redirect) {
    return <Redirect to="/orders/success" />
  }
  
  const { stripe } = props;

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '18px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button
        type="submit" 
        disabled={!stripe}
        className="pay-btn"
      >
        Payer la commande
      </button>
    </form>
  );
}

const mapStateToProps = (store) => {
  return {
  	user: store.user,
    cart: store.cart,
    order: store.order
  }
}
const mapDispatchToProps = {
	loadProducts,
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);

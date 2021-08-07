import React, { useState, Fragment } from 'react';
import CheckoutForm from './CheckoutForm'
import { loadStripe } from '@stripe/stripe-js';
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import HeadingThree from '../HeadingThree';
import Loading from '../Loading';

const PayProvider = (props) => {

  const [loading, setLoading] = useState(false);

	const PUBLIC_KEY = "pk_test_51J05LKFuqM0sFtW6hirUjAUfUsexSv2yewuiB98ItlI7rhb7DL3mr6tbJ9cJMMlEgyafVWgg7nEkKCWX6PKPM0kf00kXj53Q4y";

	// eslint-disable-next-line
	const [stripePromise, setStripePromise] = useState(
		() => loadStripe(PUBLIC_KEY)
	)

	const InjectedCheckoutForm = () => {
		// CB form
		return (
			<ElementsConsumer>
				{({stripe, elements}) => (
					<CheckoutForm 
						loading={loading}
						setLoading={setLoading}
						orderId={props.order_id} 
						stripe={stripe} 
						elements={elements} 
					/>
				)}
			</ElementsConsumer>
		)
	}

	return (
		<Fragment>
			<i className="fas fa-lock mt"></i>
			<HeadingThree title="Paiement Sécurisé by Stripe" />
			<div className="pay-provider-cb-cart-container">
				<Elements stripe={stripePromise}>
					{ InjectedCheckoutForm() }
				</Elements>
				{loading && <Loading />}
			</div>
		</Fragment>
	)
}

export default PayProvider;

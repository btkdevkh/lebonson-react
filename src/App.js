import { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import Products from './pages/Products';
import ProductDetails from './components/product/ProductDetails';
import RequireDataAuth from './helpers/require-auth-data';
import Login from './components/user/Login';
import AddUser from './components/user/AddUser';
import Shipping from './pages/Shipping';
import Profil from './components/user/Profil';
import EditUser from './components/user/EditUser';
import Payment from './pages/Payment';
import About from './pages/About';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Success from './components/payment/Success';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Fragment>
      <Header />
      <main className="container">
        <Switch>
          <Route exact path="/" component={RequireDataAuth(Home)} />
          <Route exact path="/products" component={RequireDataAuth(Products)} />
          <Route exact path="/products/details/:id" component={RequireDataAuth(ProductDetails)} />
          <Route exact path="/products/cart" component={RequireDataAuth(Cart)} />
          <Route exact path="/user/login" component={RequireDataAuth(Login)} />
          <Route exact path="/user/forgot" component={RequireDataAuth(ForgotPassword)} />
          <Route exact path="/user/reset_step_two" component={RequireDataAuth(ResetPassword)} />
          <Route exact path="/user/create" component={RequireDataAuth(AddUser)} />
          <Route exact path="/user/profil" component={RequireDataAuth(Profil, true)} />
          <Route exact path="/user/edit/:id" component={RequireDataAuth(EditUser, true)} />
          <Route exact path="/order/shipping" component={RequireDataAuth(Shipping, true)} />
          <Route exact path="/order/payment/:id" component={RequireDataAuth(Payment, true)} />
          <Route exact path="/about" component={RequireDataAuth(About)} />
          <Route exact path="/orders/success" component={RequireDataAuth(Success, true)} />
          <Route exact path="/admin" component={RequireDataAuth(Admin, true)} />
          <Route exact path="*" component={RequireDataAuth(NotFound)} />
        </Switch>
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;

import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/user/userAction';
import { deleteClass } from '../helpers/deleteClass';
import '../assets/css/Header.css';

const Header = (props) => {
  // console.log("HEADER", props);
  //console.log("HEADER", window);

  const [showNav, setShowNav] = useState(false);
  const [clientWidth, setClientWidth] = useState(0);
  const [open, setOpen] = useState('');

  // Calculate total Qte in cart
  const totalQte = props.cart.carts.reduce((acc, item) => acc + item.selectedQuantity, 0);

  // https://stackoverflow.com/questions/2172800/automatically-detect-web-browser-window-width-change
  window.addEventListener("resize", function(e) {
    setClientWidth(document.body.clientWidth);
    if(clientWidth >= 665) {
      // console.log("YES");
      setShowNav(o => o = true);
    }
  })

  // Effect window's width
  useEffect(() => {
    // Detect when window's changed
    setClientWidth(document.body.clientWidth);
    if(clientWidth >= 665) {
      // console.log("YES");
      setShowNav(o => o = true);
    }

    totalQte > 0 && setShowNav(o => o = true);
    totalQte > 0 && setOpen('open');
  }, [totalQte, clientWidth])

  // Effect nav li selected
  useEffect(() => {
    const lis = document.querySelectorAll('nav ul li');
    for(let i = 0; i < lis.length; i++) {
      lis[i].addEventListener('click', () => {
        deleteClass(lis, 'selected');
        lis[i].classList.add('selected');
      })
    }
  })

  const onClickBurger = () => {
    setShowNav(showNav => !showNav)
    showNav ? setOpen('') : setOpen('open')
  }
  
  return (
    <Fragment>
      <header>

        <h1>lebonson</h1>

        <div className={`header-menu-burger ${open}`}
          onClick={() => {
            onClickBurger();
          }}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>

      </header>
      {
        showNav &&
        <nav>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/products">Produits</Link></li>
            <li className="nav-cart">
              <Link 
                to="/products/cart">Panier &nbsp;
                <span className="nav-cart-qty">
                  { totalQte }
                </span>
              </Link>
            </li>

            {// User do not connected
              props.user.isLogged === false &&
              <Fragment>
              <li><Link to="/user/login">Connexion</Link></li>
              <li><Link to="/user/create">S'enregistrer</Link></li>
              </Fragment>
            }
            
            {// User do connected
              props.user.isLogged !== false &&
              <Fragment>
                <li><Link to="/user/profil">Mon espace</Link></li>
                {props.user.infos.role === "Admin" && <li><Link to="/admin">Admin</Link></li>}
                <li>
                  <Link
                    to="/"
                    onClick={() => {
                      props.logoutUser();
                    }}  
                  >
                    Déconnexion
                  </Link>
                </li>
              </Fragment>
            }
            <li><Link to="/about">À propos</Link></li>
          </ul>
        </nav>
      }
    </Fragment>
  )
}

const mapStateToProps = (store) => {
  return {
    user: store.user,
    cart: store.cart,
    product: store.product
  }
}

const mapDispatchToProps = {
  logoutUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

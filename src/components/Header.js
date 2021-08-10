import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/user/userAction';
import { deleteClass } from '../helpers/deleteClass';
import '../assets/css/Header.css';

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const [clientWidth, setClientWidth] = useState(0);
  const [open, setOpen] = useState('');

  const dispatch = useDispatch();
  
  const userAuth = useSelector(state => state.user);
  const { isLogged, userInfos } = userAuth;

  const cartList = useSelector(state => state.cart);
  const { carts } = cartList;;

  // Calculate total Qty in cart
  const totalQte = carts.reduce((acc, item) => acc + item.selectedQuantity, 0);

  useEffect(() => {
    // https://stackoverflow.com/questions/2172800/automatically-detect-web-browser-window-width-change
    window.addEventListener("resize", function(e) {
      setClientWidth(document.body.clientWidth);
      if(clientWidth >= 665) {
        // console.log("YES");
        setShowNav(o => o = true);
      }
    })

    setClientWidth(document.body.clientWidth);
    if(clientWidth >= 665) {
      // console.log("YES");
      setShowNav(o => o = true);
    }

    totalQte > 0 && setShowNav(o => o = true);
    totalQte > 0 && setOpen('open');
  }, [totalQte, clientWidth])

  // CSS nav li selected
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
              !isLogged &&
              <Fragment>
              <li><Link to="/user/login">Connexion</Link></li>
              <li><Link to="/user/create">S'enregistrer</Link></li>
              </Fragment>
            }
            
            {// User do connected
              isLogged &&
              <Fragment>
                <li><Link to="/user/profil">Mon espace</Link></li>
                {userInfos && userInfos.role === "Admin" && <li><Link to="/admin">Admin</Link></li>}
                <li>
                  <a
                    href="/user/login"
                    onClick={() => {
                      dispatch(logoutUser());
                    }}  
                  >
                    Déconnexion
                  </a>
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

export default Header;

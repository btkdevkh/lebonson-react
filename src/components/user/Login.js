import React, { useState, Fragment, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../actions/user/userAction';
import HeadingThree from '../HeadingThree';
import Loading from '../Loading';
import '../../assets/css/Form.css';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();

  const userAuth = useSelector(state => state.user);
  const { isLogged, error } = userAuth;
  
  useEffect(() => {
    if(isLogged) {
      setTimeout(() => {
        history.push('/');
      }, 1000);
    }

    const timer = setTimeout(() => setErrorMsg(false), 3000);
    // Clean up
    return () => clearTimeout(timer);

  }, [dispatch, userAuth, isLogged, history, errorMsg])

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(true);

    const user = { email, password };
    dispatch(loginUser(user));
  }

  return (
    <Fragment>
      {isLogged && <Loading />}
      <section className="form">
        <HeadingThree title="Connexion" />
        <form onSubmit={handleOnSubmit}>
          <div>
            <input
              placeholder="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Mot de passe"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="submit"
              value="S'identifier"
            />
          </div>
        </form>
        <Link 
          to="/user/forgot"
          className="forgot-password"
        >
          <i className="fas fa-key"></i> Mot de passe oublié ? 
        </Link>
        <p className="error txt-center">{errorMsg && error}</p>
      </section>
    </Fragment>
  )
}

export default Login;

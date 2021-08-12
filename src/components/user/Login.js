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

  const history = useHistory();

  const dispatch = useDispatch();

  const userState = useSelector(state => state.user);
  const { isLogged, userInfos } = userState;
  
  useEffect(() => {
    if(isLogged) {
      setTimeout(() => {
        history.push('/');
      }, 1000);
    }

  }, [dispatch, isLogged, userInfos, history])

  const handleOnSubmit = (e) => {
    e.preventDefault();
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
        
        <p className={
          userInfos && 
          typeof userInfos === "object" ? 
          "success txt-center mt" : 
          "error txt-center mt"
          }>
            { userInfos && typeof userInfos === "object" ? userInfos.msg : userInfos }
        </p>

      </section>
    </Fragment>
  )
}

export default Login;

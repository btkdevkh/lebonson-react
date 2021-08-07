import React, { useState, Fragment } from 'react'
import { logInUser } from '../../api/user';
import { Link, Redirect } from 'react-router-dom'; 
import HeadingThree from '../HeadingThree';
import '../../assets/css/Form.css';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleOnSubmit = () => {
    if(!email || !password) {
      setError("* Identifiez-vous");
    } else {
      setError("");

      const user = {
        email,
        password
      }

      logInUser(user)
      .then(res => {
        //console.log(res);
        setError(`* ${res.msg}`);
        if(res.status === 200) {
          window.localStorage.setItem("lebonson-token", res.token);
          setRedirect(redirect => redirect = true);
        }
      })
    }
  }

  return (
    <Fragment>
      {redirect && <Redirect to="/" />}
      <section className="form">
        <HeadingThree title="Connexion" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleOnSubmit();
          }}
        >
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
        <p className={`error`}>{error}</p>
      </section>
    </Fragment>
  )
}

export default Login

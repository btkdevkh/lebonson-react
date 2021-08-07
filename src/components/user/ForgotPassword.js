import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'; 
import HeadingThree from '../HeadingThree';
import { Fragment } from 'react';
import { forgotUserPassword } from '../../api/user';

const ForgotPassword = () => {

  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleOnSubmit = () => {
    if(!email) {
      setError("* Email non renseigné");
    } else {
      setError("");
      const user = { email }
      forgotUserPassword(user)
      .then(res => {
        // console.log(res);
        if(res.status === 404) {
          setError(res.msg);
        } else {
          window.localStorage.setItem('password-token', res.token)
          setSucess("Vérifiez dans votre email, un lien a été envoyé");
          setTimeout(() => {
            setSucess("");
            setRedirect(redirect => redirect = true);
          }, 2000);
        }
      })
    }
  }

  return (
    <Fragment>
      {redirect && <Redirect to="/" />}
      <section className="form">
        <HeadingThree title="Mot de passe oublié" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleOnSubmit();
          }}
        >
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="submit"
              value="Valider"
            />
          </div>
        </form>
        <p className={`error`}>{error}</p>
        <p className={`success`}>{sucess}</p>
      </section>
    </Fragment>
  )
}

export default ForgotPassword;

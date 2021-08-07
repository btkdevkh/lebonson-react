import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import HeadingThree from '../HeadingThree';
import { checkPasswordToken } from '../../api/auth';
import { updateOneUserPassword } from '../../api/user';

const ResetPassword = () => {

  const [password, setPassword] = useState("");
  const [sucess, setSucess] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const passwordToken = window.localStorage.getItem('password-token');
    if(passwordToken === null) {
      setRedirect(redirect => redirect = true);
    }
  }, [])

  const handleOnSubmit = () => {
    if(!password || !confirmPassword) {
      setError("* Remplissez touts les champs");
    } else if(password !== confirmPassword) {
      setError("* Les mots de passes ne sont pas identique");
    } else {
      checkPasswordToken()
      .then(res => {
        // console.log(res);
        if(res.status !== 200) {
          setRedirect(redirect => redirect = true);
        } else {
          setError("");
          const user = { password };
          updateOneUserPassword(res.user.id, user)
          .then(res => {
            // console.log(res);
            setSucess("Votre mot de pass a bien été modifié");
            window.localStorage.removeItem("password-token");
            setTimeout(() => {
              setSucess("");
              setRedirect(redirect => redirect = true);
            }, 2000);
          })
        }
      }) 
    }
  }

  return (
    <section className="form">
      {redirect && <Redirect to="/user/login" />}
      <HeadingThree title="Réinitialisez mot de passe" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        <div>
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirmez le nouveau mot de passe"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            type="submit"
            value="Validez"
          />
        </div>
      </form>
      <p className="error">{error}</p>
      <p className="success">{sucess}</p>
    </section>
  )
}

export default ResetPassword;

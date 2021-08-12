import React, { useEffect, useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { forgotUserPass } from '../../actions/user/userAction';
import HeadingThree from '../HeadingThree';

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();

  const userState = useSelector(state => state.user);
  const { user } = userState;

  useEffect(() => {

    if(user !== null && typeof user === "object") {
      setTimeout(() => {
        history.push('/user/login')
        window.location.reload();
      }, 3000);
    }

  }, [dispatch, history, user])

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const userEmail = { email }
    dispatch(forgotUserPass(userEmail));
  }

  return (
    <Fragment>
      <section className="form">
        <HeadingThree title="Mot de passe oublié" />
        <form onSubmit={handleOnSubmit}>
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

        <p className={
          user && 
          typeof user === "object" ? 
          "success txt-center mt" : 
          "error txt-center mt"
          }>
            { user && typeof user === "object" ? user.msg : user }
        </p>

      </section>
    </Fragment>
  )
}

export default ForgotPassword;

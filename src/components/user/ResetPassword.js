import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { checkPasswordToken } from '../../api/auth';
import { useSelector, useDispatch } from 'react-redux';
import { editUserPassword } from '../../actions/user/userAction';
import HeadingThree from '../HeadingThree';

const ResetPassword = () => {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState(null);

  const history = useHistory();

  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);
  const { user } = userState;

  useEffect(() => {
    const passwordToken = window.localStorage.getItem('password-token');
    if(passwordToken === null) {
      history.push('/user/login');
    } else {
      // If there's a token
      checkPasswordToken()
      .then(res => {
        console.log(res);
        if(res.status !== 200) {
          history.push('/user/login');
        } else {
          setUserId(res.user.id);
        }
      })
    }
    
    if(user !== null && typeof user === "object") {
      setTimeout(() => {
        history.push('/user/login')
        window.location.reload();
      }, 3000);
    }

  }, [dispatch, user, history])

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const user = { password, confirmPassword };
    dispatch(editUserPassword(user, userId))
  }

  return (
    <section className="form">
      <HeadingThree title="Réinitialisez mot de passe" />
      <form onSubmit={handleOnSubmit}>
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
      <p className={
        user && 
        typeof user === "object" ? 
        "success txt-center mt" : 
        "error txt-center mt"
        }>
          { user && typeof user === "object" ? user.msg : user }
      </p>
    </section>
  )
}

export default ResetPassword;

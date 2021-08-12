import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import HeadingThree from '../HeadingThree';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, connectUser } from '../../actions/user/userAction';
import Loading from '../Loading';
import { checkToken } from '../../api/auth';

const AddUser = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");

  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();

  const userState = useSelector(state => state.user);
  const { isLogged, user } = userState;

  useEffect(() => {
    const timer = setTimeout(() => {
      const token = window.localStorage.getItem('lebonson-token');
      if(token !== null) {
        checkToken()
        .then(res => {
          if(res.status === 200) {
            dispatch(connectUser(res.user));
            setLoading(true);
            setTimeout(() => {
              history.push('/user/profil');
              window.location.reload();
            }, 3000);
          } else {
            history.push("/user/login");
            window.localStorage.removeItem("lebonson-token");
          }
        })
      }
    }, 3000);

    // Clean up
    return () => clearTimeout(timer);

  }, [dispatch, history, isLogged, user])

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const user = { 
      firstName, 
      lastName, 
      email, 
      password, 
      confirmPassword, 
      address, 
      zip, 
      city 
    };

    dispatch(registerUser(user));
  }

  return (
    <Fragment>
      {loading && <Loading />}
      <section className="form">
        <HeadingThree title="S'enregistrer" />
        <form onSubmit={handleOnSubmit}>
          <div>
            <input
              type="text"
              placeholder="Prénom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Nom"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirmez le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Adresse"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Code postal"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Ville"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div>
            <input
              type="submit"
              value="S'enregistrer"
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

export default AddUser;

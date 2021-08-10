import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import HeadingThree from '../HeadingThree';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../../actions/user/userAction';
import Loading from '../Loading';

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
  const [errorMsg, setErrorMsg] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();

  const userAuth = useSelector(state => state.user);
  const { isLogged, success, error } = userAuth;

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg(false);
      if(isLogged) {
        setLoading(true);
        setTimeout(() => history.push('/user/profil'), 3000);
      }
    }, 3000);

    // Clean up
    return () => clearTimeout(timer);

  }, [history, isLogged, errorMsg])

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(true);

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
        <p className="error txt-center mt">{errorMsg && error}</p>
        <p className="success txt-center">{success && success}</p>
      </section>
    </Fragment>
  )
}

export default AddUser;

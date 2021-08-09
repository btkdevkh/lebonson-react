import React, { useEffect, useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editUser } from '../../actions/user/userAction';
import HeadingThree from '../HeadingThree';
import Button from '../Button';
import Loading from '../Loading';

const EditUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");

  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);
  const { isLogged, userInfos, error, msg } = userState;

  useEffect(() => {
    if(isLogged !== false) {
      const { firstName, lastName, email, address, zip, city } = userInfos;
      setFirstName(firstName);
      setLastName(lastName);
      setEmail(email);
      setAddress(address);
      setZip(zip);
      setCity(city);
    }

    const timer = setTimeout(() => {
      if(msg) {
        setLoading(true)
        setShowError(false)
        setTimeout(() => history.push('/user/profil'), 1000);
      }
    }, 3000);

    // Clean up
    return () => clearTimeout(timer);

  }, [userInfos, isLogged, error, history, loading, msg])

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setShowError(true);

    const user = { firstName, lastName, email, address, zip, city  }
    dispatch(editUser(user, userInfos.id))
  }

  return (
    <Fragment>
      {loading && <Loading />}
      { isLogged !== false &&
        <section className="form">
          <HeadingThree title="Modifiez vos informations" />
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
                value="Valider"
              />
            </div>
          </form>
          <p className="error txt-center mt">{showError && error}</p>
          <p className="success txt-center">{showError && msg}</p>
          <Button
            className="return btn mt"
            title="Retour au shopping"
            onClick={() => history.push("/products")}
          />
        </section> }
    </Fragment>
  )
}

export default EditUser;

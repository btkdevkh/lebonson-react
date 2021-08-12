import React, { useEffect, useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editUser } from '../../actions/user/userAction';
import HeadingThree from '../HeadingThree';

const EditUser = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");

  const history = useHistory();

  const dispatch = useDispatch();

  const userState = useSelector(state => state.user);
  const { isLogged, userInfos, user } = userState;

  useEffect(() => {
    if(isLogged) {
      const { 
        firstName, 
        lastName, 
        email, 
        address, 
        zip, 
        city 
      } = userInfos;

      setFirstName(firstName);
      setLastName(lastName);
      setEmail(email);
      setAddress(address);
      setZip(zip);
      setCity(city);
    }

    if(user !== null && typeof user === "object") {
      setTimeout(() => {
        history.push('/user/profil')
        window.location.reload();
      }, 3000);
    }

  }, [userInfos, isLogged, user, history])

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const user = { 
      firstName, 
      lastName, 
      email, 
      address, 
      zip, 
      city 
    }

    dispatch(editUser(user, userInfos.id));
  }

  return (
    <Fragment>
      { isLogged &&
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

          <p className={
            user && 
            typeof user === "object" ? 
            "success txt-center mt" : 
            "error txt-center mt"
            }>
              { user && typeof user === "object" ? user.msg : user }
          </p>
        </section> }
    </Fragment>
  )
}

export default EditUser;

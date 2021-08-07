import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../../api/user';
import HeadingThree from '../HeadingThree';
import { Fragment } from 'react';

const AddUser = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");

  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleOnSubmit = async () => {

    if(!firstName || !lastName || !email || !password || !confirmPassword || !address || !zip || !city) {
      setError("* Tous les champs sont requises");
    } else if(password !== confirmPassword) {
      setError("* Le mot de pass doit être identique");
    } else {
      try {
        setError("");

        const user = {
          firstName,
          lastName,
          email,
          password,
          address,
          zip,
          city
        }

        const response = await createUser(user)
        //console.log(response);

        if(response.status === 200) {
          setSucess("Votre compte a été créé ");
          setTimeout(() => {
            setSucess("")
            setRedirect(redirect => redirect = true);
          }, 2000);
        }

      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Fragment>
      {redirect && <Redirect to="/user/login" />}
      <section className="form">
        <HeadingThree title="S'enregistrer" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleOnSubmit();
          }}
        >
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
        <p className={`error`}>{error}</p>
        <p className={`success`}>{sucess}</p>
      </section>
    </Fragment>
  )
}

export default AddUser;

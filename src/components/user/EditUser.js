import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateOneUser } from '../../api/user';
import HeadingThree from '../HeadingThree';
import { Fragment } from 'react';
import Button from '../Button';

const EditUser = (props) => {
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");

  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");
  const history = useHistory();

  useEffect(() => {
    if(props.user.infos !== null) {
      const { firstName, lastName, email, address, zip, city } = props.user.infos;
      setFirstName(firstName);
      setLastName(lastName);
      setEmail(email);
      setAddress(address);
      setZip(zip);
      setCity(city);
    } 
    // eslint-disable-next-line
  }, [])

  const handleOnSubmit = async () => {
    if(!firstName || !lastName || !email || !address || !zip || !city) {
      setError("* Tous les champs sont requises");
    } else {
      try {
        setError("");

        const user = {
          firstName,
          lastName,
          email,
          address,
          zip,
          city
        }
        //console.log(user);

        const response = await updateOneUser(props.user.infos.id, user)
        // console.log(response);
        
        if(response.status === 200) {
          setSucess("Vos informations a été modifié");

          setTimeout(() => {
            setSucess("")
            history.push("/user/profil");
          }, 2000);
        }

      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Fragment>
      {
        props.user.infos !== null &&
        <section className="form">
          <HeadingThree title="Modifiez vos informations" />
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
          <p className={`error`}>{error}</p>
          <p className={`success`}>{sucess}</p>

          <Button
            className="return btn mt"
            title="Retour au shopping"
            onClick={() => props.history.push("/products")}
          />
        </section>
      }
    </Fragment>
  )
}

const mapStateToProps = (store) => {
  return {
    user: store.user,
    cart: store.cart
  }
}

export default connect(mapStateToProps)(EditUser);

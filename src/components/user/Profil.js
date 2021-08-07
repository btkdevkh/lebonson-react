import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOneUser } from '../../api/user';
import { connectUser } from '../../actions/user/userAction';
import HeadingThree from '../HeadingThree';
import moment from 'moment';
import '../../assets/css/Profil.css';

const Profil = (props) => {
  //console.log(props.order.orders);

  useEffect(() => {
    if(props.user.infos !== null) {
      getOneUser(props.user.infos.id)
      .then(res => {
        // Reload user infos in redux
        props.connectUser(res.user)
      })
    }
    // eslint-disable-next-line 
  }, [])

  return (
    <section className="profil">
      <HeadingThree title="Mon espace"/>

      {/* User infos */}
      {
        props.user.infos !== null &&
        <div className="profil-user-infos">
          <h4>Mes cordonnées :</h4>
          <p>Chez {props.user.infos.firstName} {props.user.infos.lastName}</p>
          <p>{props.user.infos.address}</p>
          <p>{props.user.infos.zip}, {props.user.infos.city}</p>
          <p>{props.user.infos.email}</p>
          <Link to={`/user/edit/${props.user.infos.id}`} title="Modifier"><i className="fas fa-pencil-alt"></i></Link>
        </div>
      }

      <HeadingThree title="Commandes effectuée"/>

      <table>
        <thead>
          <tr>
            <th>Commande  N°</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            props.order.orders !== null &&
            props.order.orders.map(order => {
              if(order.status === "Paid") {
                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{moment(order.creationTimestamp).format('L')}</td>
                    <td>{order.status}</td>
                  </tr>
                )
              }
              // else return null
              return null;
            })
          }
        </tbody>
      </table>
    </section>
  )
}

const mapStateToProps = (store) => {
  return {
    user: store.user,
    cart: store.cart,
    order: store.order
  }
}

const mapDispatchToProps = {
  connectUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Profil);

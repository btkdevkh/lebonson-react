import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadOrdersByUserId } from '../../actions/order/orderAction';
import HeadingThree from '../HeadingThree';
import moment from 'moment';
import '../../assets/css/Profil.css';

const Profil = () => {
  
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);
  const orderState = useSelector(state => state.order);
  const { isLogged, userInfos } = userState;
  const { orders } = orderState;

  useEffect(() => {
    if(isLogged !== false) {
      dispatch(loadOrdersByUserId(userInfos.id))
    }
    // eslint-disable-next-line
  }, [isLogged, userInfos])

  return (
    <section className="profil">
      <HeadingThree title="Mon espace"/>

      {/* User infos */}
      {
        isLogged !== false &&
        <div className="profil-user-infos">
          <h4>Mes cordonnées :</h4>
          <p>Chez {userInfos.firstName} {userInfos.lastName}</p>
          <p>{userInfos.address}</p>
          <p>{userInfos.zip}, {userInfos.city}</p>
          <p>{userInfos.email}</p>
          <Link to={`/user/edit/${userInfos.id}`} title="Modifier"><i className="fas fa-pencil-alt"></i></Link>
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
            isLogged !== false &&
            orders.map(order => {
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

export default Profil;

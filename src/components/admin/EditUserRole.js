import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { editUserRole, loadAllusers } from '../../actions/user/userAction';

const EditUserRole = ({ id, role }) => {

  const [userRole, setUserRole] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();

  const onSubmitForm = (e) => {
    e.preventDefault();
    const user = { userRole };
    dispatch(editUserRole(user, id));
    dispatch(loadAllusers());
    history.push("/admin");
  }

  return (
    <form onSubmit={onSubmitForm}>
      <select
        style={{ 
          marginRight: '5px', 
          padding: '3px', 
          border: '1px solid orange', 
          fontFamily: 'inherit' 
        }}
        value={userRole}
        onChange={(e) => {
          setUserRole(e.target.value)
        }}
      >
        <option value={role}>{role}</option>
        <option value={role === "Admin" ? "User" : "Admin"}>{role === "Admin" ? "User" : "Admin"}</option>
      </select>
      <button 
        type="submit"
        style={{ 
          padding: '5px', 
          cursor: 'pointer', 
          border: 'inherit',
          color: '#fff',
          borderRadius: '3px',
          fontFamily: 'inherit',
          backgroundColor: 'orange' 
        }}
      >
        Valider
      </button>
    </form>
  )
}

export default EditUserRole;

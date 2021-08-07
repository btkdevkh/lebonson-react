import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { updateOneUserRole } from '../../api/user';

const EditUserRole = (props) => {
  const [role, setRole] = useState("");
  const history = useHistory();

  const onSubmitForm = (e) => {
    e.preventDefault();

    const user = { role };

    updateOneUserRole(props.id, user)
    .then(res => {
      console.log(res);
      history.push("/admin");
    })
  }

  return (
    <form
      onSubmit={onSubmitForm}
    >
      <select
        style={{ marginRight: '5px', padding: '3px', border: '1px solid orange', fontFamily: 'inherit' }}
        value={role}
        onChange={(e) => {
          console.log(e.target.value);
          setRole(e.target.value)
        }}
      >
        <option value={props.role}>{props.role}</option>
        <option value={props.role === "Admin" ? "User" : "Admin"}>{props.role === "Admin" ? "User" : "Admin"}</option>
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

import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import './User.css'

const User = ({id,name, email, role, isChecked, deleteRow,editRow}) => {

  const deleteRowHandler = ()=>{
    deleteRow(id)
  }

  const editRowHandler = () => {
    editRow(id)
  }
  return (
    <>
      <tr key={id}>
        <td>
          <input type="checkbox" checked={isChecked}/>
        </td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{role}</td>
        <td>
          <span>
            <AiOutlineEdit onClick={editRowHandler}/>
          </span>
          <span>
            <AiOutlineDelete className="delete-btn" onClick={deleteRowHandler}/>
          </span>
        </td>
      </tr>
    </>
  );
};

export default User;

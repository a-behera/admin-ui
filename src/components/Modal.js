import React, { useState } from "react";
import "./Modal.css";

const Modal = ({ onCancel, defaultValue, updateRow }) => {
  const [formState, setFormState] = useState(defaultValue);

  const updateHandler = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    updateRow(formState)

  };
  return (
    <div className="modal-container">
      <div className="modal">
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              onChange={updateHandler}
              value={formState.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              onChange={updateHandler}
              value={formState.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input
              name="role"
              onChange={updateHandler}
              value={formState.role}
            />
          </div>
          <button type="submit" className="btn" onClick={submitHandler}>
            Save
          </button>
          <button className="btn" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;

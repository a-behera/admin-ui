import React, { useEffect, useState } from "react";
import "./UsersList.css";
import SearchBar from "./SearchBar";
import User from "./User";
import Modal from "./Modal";
import Pagination from "./Pagination";
import DeleteButton from "./DeleteButton";

let PageSize = 10;

const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const resData = await response.json();
      setUsers(resData);
    }
    fetchUsers();
  }, []);

  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  const currentTableData = users.slice(firstPageIndex, lastPageIndex);

  const deleteHandler = (userId) => {
    setUsers(users.filter((_, id) => id !== userId));
  };

  const cancelHandler = () => {
    setModalOpen(false);
  };

  const editHandler = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const saveHandler = (newRow) => {
    setUsers(
      users.map((currUser, idx) => {
        if (idx !== rowToEdit) return currUser;
        return newRow;
      })
    );
    setModalOpen(false);
  };

  const selectCheckboxHandler = (event) => {
    const { name, checked } = event.target;
    if (name === "allSelect") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };

  const deleteSelecetdHandler = () => {
    setUsers(users.filter((user) => user.isChecked !== true));
  }

  return (
    <>
      <SearchBar users={users} setUsers={setUsers} />
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                name="allSelect"
                checked={!users.some((user) => user?.isChecked !== true)}
                onChange={selectCheckboxHandler}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((user, idx) => (
            <User
              key={user.id}
              id={idx}
              name={user.name}
              email={user.email}
              role={user.role}
              checkedAtt={user?.isChecked || false}
              selectCheckbox={selectCheckboxHandler}
              deleteRow={deleteHandler}
              editRow={editHandler}
            />
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <Modal
          onCancel={cancelHandler}
          defaultValue={rowToEdit !== null && users[rowToEdit]}
          updateRow={saveHandler}
        />
      )}
      <DeleteButton click={deleteSelecetdHandler}>Delete Selected</DeleteButton>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={users.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default UsersList;

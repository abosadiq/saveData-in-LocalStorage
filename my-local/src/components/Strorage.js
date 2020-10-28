import React, { useState, createContext, useEffect } from "react";
import "../App.css";
import User from "./User";
import idRng from "waffles-random-id";
import EditModal from "./EditModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const initialValue = localStorage.getItem("userName")
  ? JSON.parse(localStorage.getItem("userName"))
  : [];

export const UserInfo = createContext();

const Strorage = () => {
  const [users, setUsers] = useState(initialValue);
  const [selectedUser, setSelectUser] = useState();
  const [fullName, setFullname] = useState({
    firsName: "",
    lastName: "",
  });
  const [preData, setPreData] = useState({});
  const [modal, setModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [delId, setDelID] = useState();
  const selectedUsrId = users.find((user) => user.id === selectedUser);

  useEffect(() => {
    localStorage.setItem("userName", JSON.stringify(users));
  }, [users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFullname({ ...fullName, [name]: value });
  };
  const addUserHandler = (e) => {
    e.preventDefault();

    const obj = {
      id: idRng(),
      fname: fullName.firsName,
      lname: fullName.lastName,
    };
    const newUser = [...users, obj];
    setUsers(newUser);
    setFullname({
      firsName: "",
      lastName: "",
    });
  };
  const deleteUser = (id) => {
    setSelectUser(id);
    setDelID(id);
    setConfirmModal(true);
  };
  const confirmDelete = () => {
    const deletUser = users.filter((user) => user.id !== delId);
    setUsers(deletUser);
    setConfirmModal(false);
  };

  const editUser = (id) => {
    setSelectUser(id);
    setModal(!modal);
    const previous = [...users];
    const previousInd = previous.findIndex((user) => user.id === id);
    setPreData(previous[previousInd]);
  };
  const handleUserEdit = (id, new_user) => {
    const newUsers = [...users];
    const index = newUsers.findIndex((user) => user.id === id);
    newUsers[index] = new_user;
    setUsers(newUsers);
  };

  function handleEdit(changes) {
    handleUserEdit(selectedUsrId.id, { ...selectedUsrId, ...changes });
  }
  const onSaveEdit = () => {
    setModal(false);
  };
  const closeToogle = () => {
    const newUsers = [...users];
    const index = newUsers.findIndex((user) => user.id === selectedUser);
    newUsers[index] = preData;
    setUsers(newUsers);
    setModal(false);
  };
  const confirmToogle = () => {
    setConfirmModal(false);
  };

  return (
    <UserInfo.Provider value={selectedUsrId}>
      <div style={{ width: "80%" }}>
        <form onSubmit={addUserHandler} className="mt-4">
          <div
            className="d-flex justify-content-center"
            style={{ width: "100%" }}
          >
            <div className="d-flex">
              <input
                style={{ width: "400px" }}
                type="text"
                name="firsName"
                className="form-control"
                placeholder="Enter First Name"
                value={fullName.firsName}
                onChange={handleChange}
              />
              <input
                style={{ width: "400px" }}
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                value={fullName.lastName}
                onChange={handleChange}
                className="form-control ml-2"
              />
            </div>
            <button
              type="submit"
              className="btn btn-md btn-outline-primary ml-2"
              disabled={!fullName.firsName}
            >
              Save
            </button>
          </div>
        </form>
        {users.length > 0 ? (
          <table className="table table-striped mt-5 w-100">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <User
                  key={user.id}
                  {...user}
                  deleteUser={deleteUser}
                  editUser={editUser}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <h1 className="text-center mt-5 text-primary text-uppercase">
            No Users{" "}
            <span role="img" aria-labelledby="sad">
              😲
            </span>{" "}
            please fill up the form to add users{" "}
            <span role="img" aria-labelledby="happy">
              {" "}
              🙂
            </span>
          </h1>
        )}
        <EditModal
          handleEdit={handleEdit}
          selectedUsrId={selectedUsrId}
          modal={modal}
          closeToogle={closeToogle}
          onSave={onSaveEdit}
        />

        <ConfirmDeleteModal
          confirmDelete={confirmDelete}
          confirmToogle={confirmToogle}
          confirmModal={confirmModal}
        />
      </div>
    </UserInfo.Provider>
  );
};

export default Strorage;

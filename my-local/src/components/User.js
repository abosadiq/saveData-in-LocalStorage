import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
const User = ({id,fname, lname,  deleteUser, editUser }) => {
  return (
    <>
      <tr key={id}>
        <td>{id}</td>
        <td className="text-capitalize">{fname}</td>
        <td className="text-capitalize">{lname}</td>
        <td>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteUser(id)}
          >
            <FaTrash />
          </button>
        </td>
        <td>
          <button
            type="text"
            className="btn btn-sm btn-dark"
            onClick={() => editUser(id)}
          >
            <FaEdit />
          </button>
        </td>
      </tr>
    </>
  );
};
export default User;

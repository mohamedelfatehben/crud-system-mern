/* eslint-disable react/prop-types */
import { useState } from "react";
import Popup from "reactjs-popup";
import axios from "axios";

function UpdateUserPopup({ user, fetchUsers }) {
  const [formData, setFormData] = useState({
    name: user.name,
    age: user.age,
    email: user.email,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/update-user/${user._id}`,
        formData
      )
      .then(() => {
        fetchUsers();
      })
      .catch((error) => console.error("Failed to update user:", error));
  };

  return (
    <Popup
      trigger={
        <button className="bg-green-600 hover:bg-green-400 text-white font-bold py-1 px-2 rounded">
          Update
        </button>
      }
      modal
      nested
    >
      {(close) => (
        <div className="modal bg-gray-900 p-5 rounded-lg space-y-3">
          <button
            className="text-white bg-green-500 rounded-full px-1 absolute top-2 right-2"
            onClick={close}
          >
            &times;
          </button>
          <div className="text-white text-center text-2xl">Update User</div>
          <div className="content flex flex-col gap-y-2 min-w-96">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="px-2 py-1 rounded outline-none"
            />
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Age"
              className="px-2 py-1 rounded outline-none"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="px-2 py-1 rounded outline-none"
            />
            <button
              onClick={() => {
                handleUpdate();
                close();
              }}
              className="bg-green-600 hover:bg-green-400 rounded px-4 py-1 text-white"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}
export default UpdateUserPopup;

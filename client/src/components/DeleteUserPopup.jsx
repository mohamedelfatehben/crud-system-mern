/* eslint-disable react/prop-types */
import Popup from "reactjs-popup";
import axios from "axios";

function DeleteUserPopup({ userId, fetchUsers }) {
  const handleDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/delete-user/${userId}`)
      .then(() => {
        fetchUsers(); // Re-fetch users to update the list
      })
      .catch((error) => console.error("Failed to delete user:", error));
  };

  return (
    <Popup
      trigger={
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">
          Delete
        </button>
      }
      modal
      nested
    >
      {(close) => (
        <div className="modal bg-gray-900 p-5 rounded-lg space-y-3">
          <button
            className="text-white bg-red-500 rounded-full px-1 absolute top-2 right-2"
            onClick={close}
          >
            &times;
          </button>
          <div className="text-white text-center text-2xl">Confirm Delete</div>
          <div className="content">
            <p className="text-white mb-4">
              Are you sure you want to delete this user?
            </p>
            <button
              onClick={() => {
                handleDelete();
                close();
              }}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default DeleteUserPopup;

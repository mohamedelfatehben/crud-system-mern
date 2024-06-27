import { useEffect, useState } from "react";
import UsersTable from "../components/UsersTable";
import axios from "axios";
import { useCookies } from "react-cookie";

function Users() {
  const [_, setCookies] = useCookies(["token"]);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", age: "", email: "" });
  const fetchUsers = async () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`).then((res) => {
      if (res.status === 200) {
        setUsers(res.data);
      }
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/add-user`, {
        ...newUser,
        age: +newUser.age,
      })
      .then((response) => {
        if (response.status === 201) {
          setUsers([...users, response.data]); // Add new user to the list
          setNewUser({ name: "", age: "", email: "" }); // Clear form
        }
      })
      .catch((error) => console.error("Error adding user:", error));
  };
  const handleLogout = () => {
    setCookies("token", "");
    window.localStorage.setItem("id", "");
    window.location.href = "/login";
  };
  return (
    <>
      <h1 className="text-white text-center font-bold text-4xl">
        Crud system (Users){" "}
      </h1>
      <div className="p-4 flex flex-col max-w-5xl mx-auto">
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-400 text-white rounded px-3 py-1"
          >
            Logout
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mb-4">
          <h2 className="text-white font-bold text-xl">Create user</h2>
          <div className="mb-2">
            <input
              type="text"
              name="name"
              placeholder="Name"
              id="name"
              required
              value={newUser.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-2">
            <input
              type="number"
              name="age"
              placeholder="Age"
              id="age"
              required
              value={newUser.age}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              id="email"
              required
              value={newUser.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-400 text-white font-bold rounded-md"
            >
              Add User
            </button>
          </div>
        </form>
        {users.length > 0 && (
          <UsersTable users={users} fetchUsers={() => fetchUsers()} />
        )}
      </div>
    </>
  );
}

export default Users;

import { useEffect, useState } from "react";
import Users from "./components/Users";
import axios from "axios";
import "./App.css";

function App() {
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

  return (
    <div className="bg-gray-900 min-h-screen">
      <h1 className="text-white text-center font-bold text-4xl">
        Crud system (Users){" "}
      </h1>
      <div className="p-4 flex flex-col max-w-5xl mx-auto">
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
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 hover:bg-green-400 text-white font-bold rounded-md"
          >
            Add User
          </button>
        </form>
        <Users users={users} fetchUsers={() => fetchUsers()} />
      </div>
    </div>
  );
}

export default App;

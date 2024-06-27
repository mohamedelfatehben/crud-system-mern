import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Register() {
  const [user, setUser] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/register-admin`,
        user
      );
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      toast.error("Registration error : " + error.response.data.message);
    }
  };

  return (
    <div className="p-4 flex flex-col max-w-5xl mx-auto">
      <ToastContainer theme="colored" />
      <form onSubmit={handleSubmit} className="mb-4 max-w-7xl mx-auto">
        <h1 className="text-white text-center font-bold text-4xl">Register</h1>
        <div className="mb-2">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={user.username}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-2">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={user.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 hover:bg-green-400 text-white font-bold rounded-md"
          >
            Register
          </button>
        </div>
        <div className="text-white">
          You already have an account?
          <a href="/login" className="text-green-600 hover:underline">
            login
          </a>
        </div>
      </form>
    </div>
  );
}

export default Register;

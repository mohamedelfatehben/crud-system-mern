import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [_, setCookies] = useCookies(["token"]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        credentials
      );
      // Handle successful login, e.g., store the token, redirect, etc.
      setCookies("token", response.data.token);
      window.localStorage.setItem("id", response.data.id);
      window.location.href = "/";
    } catch (error) {
      toast.error("Login error : " + error.response.data.message);
    }
  };

  return (
    <div className="p-4 flex flex-col max-w-7xl mx-auto">
      <ToastContainer theme="colored" />
      <form onSubmit={handleSubmit} className="mb-4 max-w-5xl mx-auto">
        <h1 className="text-white text-center font-bold text-4xl">Login</h1>
        <div className="mb-2">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={credentials.username}
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
            value={credentials.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 hover:bg-green-400 text-white font-bold rounded-md"
          >
            Login
          </button>
        </div>
        <div className="text-white">
          You do not have an account?
          <a href="/register" className="text-green-600 hover:underline">
            register
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

function App() {
  const [cookies] = useCookies(["token"]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: cookies.token ? <Users /> : <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: cookies.token ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: cookies.token ? <Navigate to="/" /> : <Register />,
    },
  ]);
  return (
    <div className="bg-gray-900 min-h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

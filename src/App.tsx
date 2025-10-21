import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home/index";
import { Login } from "./pages/login";
import { Admin } from "./pages/admin";
import { Networks } from "./pages/networks";
import { NotDefound } from "./pages/notfound";

import { Private } from "./routes/Private";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <Private>
        <Admin />
      </Private>
    ),
  },
  {
    path: "/admin/social",
    element: (
      <Private>
        <Networks />
      </Private>
    ),
  },
  {
    path: "/*",
    element: <NotDefound />,
  },
]);

import { createBrowserRouter } from "react-router-dom";
import Home from "../component/Home";
import AddEmployee from "../component/AddEmployee";
import Update from "../component/Update";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/addemployee",
    element: <AddEmployee />,
  },
  {
    path: "/update/:id",
    element: <Update />,
  },
]);

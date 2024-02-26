import { RouterProvider } from "react-router-dom";
import { route } from "./Router/route";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <RouterProvider router={route} />
    </>
  );
}

export default App;

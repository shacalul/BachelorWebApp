import React from "react";

//components imports
import TopAppbar from "./components/Navbar/TopAppbar";
import BottomAppbar from "./components/Navbar/BottomAppBar";

//pages imports
import Home from "./pages/Home";
import CategoryDetails from "./pages/CategoryDetails";

//react router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/category/:id",
    element: <CategoryDetails />,
  },
]);

const App = () => {
  return (
    <div>
      <TopAppbar />
      <RouterProvider router={router} />
      <BottomAppbar />
    </div>
  );
};

export default App;

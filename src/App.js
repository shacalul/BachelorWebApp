import React from "react";

//components imports
import TopAppbar from "./components/Navbar/TopAppbar";
import BottomAppbar from "./components/Navbar/BottomAppBar";

//pages imports
import Home from "./pages/Home";
import CategoryDetails from "./pages/CategoryDetails";
import Contact from "./pages/Contact";
import BookRoom from "./pages/BookRoom";
//react router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/category/:id",
    element: <CategoryDetails />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "bookaroom",
    element: <BookRoom />,
  },
]);

const App = () => {
  return (
    <div>
      <ThemeProvider>
        <TopAppbar currentPage={window.location.pathname} />
        <RouterProvider router={router} />
        <BottomAppbar />
      </ThemeProvider>
    </div>
  );
};

export default App;

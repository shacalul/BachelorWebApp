import React from "react";

//components imports
import TopAppbar from "./components/Navbar/TopAppbar";
import BottomAppbar from "./components/Navbar/BottomAppBar";

//pages imports
import Home from "./pages/Home";
import CategoryDetails from "./pages/CategoryDetails";
import Contact from "./pages/Contact";
import BookRoom from "./pages/BookRoom";
import CheckoutForm from "./pages/CheckoutForm";
//react router
import { ThemeProvider } from "@material-tailwind/react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <ThemeProvider>
        <TopAppbar currentPage={window.location.pathname} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:id" element={<CategoryDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/bookaroom" element={<BookRoom />} />
            <Route path="/checkoutform" element={<CheckoutForm />} />
          </Routes>
        </BrowserRouter>
        <BottomAppbar />
      </ThemeProvider>
    </div>
  );
};

export default App;

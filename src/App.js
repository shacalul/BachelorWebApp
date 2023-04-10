import React from "react";

//components imports
import TopAppbar from "./components/Navbar/TopAppbar";
import BottomAppbar from "./components/Navbar/BottomAppBar";
import ScrollToTop from "./components/ScrollToTop";
//pages imports
import Home from "./pages/Home";
import CategoryDetails from "./pages/CategoryDetails";
import Contact from "./pages/Contact";
import BookRoom from "./pages/BookRoom";
import Checkout from "./pages/Checkout";

//react router
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdministrationSignin from "./pages/AdministrationSignin";
import AdministrationSignUp from "./pages/AdministrationSignUp";
const App = () => {
  return (
    <div>
      <ThemeProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <TopAppbar currentPage={window.location.pathname} />
                  <Home />
                  <BottomAppbar />
                </>
              }
            />
            <Route
              path="/category/:id"
              element={
                <>
                  <TopAppbar currentPage={window.location.pathname} />
                  <CategoryDetails />
                  <BottomAppbar />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <TopAppbar currentPage={window.location.pathname} />
                  <Contact />
                  <BottomAppbar />
                </>
              }
            />
            <Route
              path="/bookaroom"
              element={
                <>
                  <TopAppbar currentPage={window.location.pathname} />
                  <BookRoom />
                  <BottomAppbar />
                </>
              }
            />
            <Route
              path="/checkoutform"
              element={<Checkout hideAppbars={true} />}
            />
            <Route
              path="/administrationSignin"
              element={<AdministrationSignin />}
            />
            <Route
            path="/administrationSignup"
            element={<AdministrationSignUp/>}
            />

          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;

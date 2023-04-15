import React from "react";

//components imports
import TopAppbar from "./website/Navbar/TopAppbar"
import BottomAppbar from "./website/Navbar/BottomAppBar";
import ScrollToTop from "./website/websiteComponents/ScrollToTop";
//pages imports
import Home from "./website/websitePages/Home";
import CategoryDetails from "./website/websitePages/CategoryDetails";
import Contact from "./website/websitePages/Contact"
import BookRoom from "./website/websitePages/BookRoom";
import Checkout from "./website/websitePages/Checkout";
import AdministrationSignin from "./administration/administrationPages/AdministrationSignin";
import AdministrationSignUp from "./administration/administrationPages/AdministrationSignUp";
//react router
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SideBarAdministration from "./administration/administrationComponents/SideBarAdministration"
import Dashboard from "./administration/administrationPages/Dashboard";

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
            <Route
           
              path="/dashboard"             
              element={    <>
              <SideBarAdministration/>
              <Dashboard hideAppbars={true} /></>}    
            />
             
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    
    </div>
  );
};

export default App;

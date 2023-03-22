import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CategoryProvider from "./context/CategoryContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CategoryProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CategoryProvider>
);

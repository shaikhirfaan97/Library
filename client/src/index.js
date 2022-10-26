import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { BooksContextProvider } from "./context/BooksContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BooksContextProvider>
       <App />
      </BooksContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

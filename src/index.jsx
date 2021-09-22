import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as RouterProvider } from "react-router-dom";
import { client } from "./apollo";
import UserProvider from "./context/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <UserProvider>
        <RouterProvider>
          <App />
        </RouterProvider>
      </UserProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

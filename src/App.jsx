
import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useApolloClient } from '@apollo/client';
import { useHistory } from 'react-router';
import Home from "./pages/home";
import Details from "./pages/details";
import Login from "./pages/login";
import { UserContext } from "./context/UserContext";

import "./sass/index.scss"
import TopNavigation from "./componets/TopNavigation/topNavigation";
import Dashboard from './pages/dashboard';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';

import useTimeout from './hooks/useTimeout';


function PrivateRoute({ isAuthed, children, ...rest }) {
  return <Route {...rest} render={() => isAuthed ? children : <Redirect to="/login" />} />
} 

function App() {
  const { user } = useContext(UserContext);
  const { timeout } = useTimeout(10)

  console.log(timeout, "hehe")

  return (
    <div className="main">
      <TopNavigation />
      { timeout ? <h1> loged in</h1> : <h1>logoout</h1>}
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/details/:projectID">
            <Details />
          </Route>
          <PrivateRoute path="/dashboard" isAuthed={user}>
            <Dashboard />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/reset-password/:code">
            <ResetPassword />
          </Route>
          <Route path="*">
            <h1>Create 404 Page here</h1>
          </Route>
        </Switch>
    </div>
  );
}

export default App;


import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/home";
import Details from "./pages/details";
import Login from "./pages/login";
import { UserContext } from "./context/UserContext";

import "./sass/index.scss"
import TopNavigation from "./componets/TopNavigation/topNavigation";
import Dashboard from './pages/dashboard';



function PrivateRoute({ isAuthed, children, ...rest }) {
  return <Route {...rest} render={() => isAuthed ? children : <Redirect to="/login" />} />
} 

function App() {
  const { user } = useContext(UserContext);
  return (
    <div className="main">
      <TopNavigation />
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
          <Route path="*">
            <h1>Create 404 Page here</h1>
          </Route>
        </Switch>
    </div>
  );
}

export default App;

import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./pages/home";
import Details from "./pages/details";
import Blog from "./pages/blog";
import Login from "./pages/login";
import { UserContext } from "./context/UserContext";

import "./sass/index.scss";
import TopNavigation from "./componets/TopNavigation/topNavigation";
import Dashboard from "./pages/dashboard";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPassword";

import useTimeout from "./hooks/useTimeout";
import TimeoutModal from "./componets/TimeoutModal/timeoutModal";

function PrivateRoute({ isAuthed, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => (isAuthed ? children : <Redirect to="/login" />)}
    />
  );
}

function App() {
  const { user } = useContext(UserContext);
  const { idleTimeout, setIdleTimeout, resetInterval } = useTimeout(10);

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
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/reset-password/:code">
          <ResetPassword />
        </Route>
        <Route path="/blog" >
          <Blog />
        </Route>
        <Route path="*">
          <h1>Create 404 Page here</h1>
        </Route>
      </Switch>
      <TimeoutModal
        idleTimeout={idleTimeout}
        setIdleTimeout={setIdleTimeout}
        resetInterval={resetInterval}
      />
    </div>
  );
}

export default App;

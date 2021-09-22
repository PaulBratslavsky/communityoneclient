
import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/home";
import Details from "./pages/details";
import Login from "./pages/login";
import { UserContext } from "./context/UserContext";

import "./sass/index.scss"
import TopNavigation from "./componets/TopNavigation/topNavigation";



function PrivateRoute({ isAuthed, children, ...rest }) {
  return <Route {...rest} render={() => isAuthed ? children : <Redirect to="/login" />} />
} 

function App() {
  const { user } = useContext(UserContext);
  return (
    <div className="App">
      <TopNavigation />
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/details" isAuthed={user}>
            <Details />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
    </div>
  );
}

export default App;

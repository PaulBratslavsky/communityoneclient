import { Switch, Route, Link, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/home";
import Details from "./pages/details";
import Login from "./pages/login";

import "./sass/index.scss"
import TopNavigation from "./componets/TopNavigation/topNavigation";

const isAuthed = true;

function PrivateRoute({ isAuthed, children, ...rest }) {
  return <Route {...rest} render={() => isAuthed ? children : <Redirect to="/login" />} />
} 

function App() {
  return (
    <div className="App">
      <TopNavigation />
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/details" isAuthed={isAuthed}>
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

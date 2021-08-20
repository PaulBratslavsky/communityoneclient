import "./App.css";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Home from "./pages/home";
import Details from "./pages/details";
import Login from "./pages/login";

const isAuthed = true;

function PrivateRoute({ isAuthed, children, ...rest }) {
  return <Route {...rest} render={() => isAuthed ? children : <Redirect to="/login" />} />
} 

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/details">Project Detail</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      routes will go here
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

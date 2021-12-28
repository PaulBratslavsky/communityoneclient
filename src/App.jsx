import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

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
import Developers from './pages/developers';
import Bugtracker from './pages/bugtracker';

function App() {
  const { user } = useContext(UserContext);
  const { idleTimeout, setIdleTimeout, resetInterval } = useTimeout(20000);


function PrivateRoute({ children, auth }) {
  return auth ? children : <Navigate to="/login" />;
}
  return (
    <div className="main">
      <TopNavigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:projectID" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:code" element={<ResetPassword />} />  
        <Route path="/blog/*" element={<Blog />} />
        <Route path="*" element={<h1>Create 404 Page here</h1>} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute auth={user}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/bugtracker"
          element={
            <PrivateRoute auth={user}>
              <Bugtracker />
            </PrivateRoute>
          }
        />
        <Route
          path="/developers"
          element={
            <PrivateRoute auth={user}>
              <Developers />
            </PrivateRoute>
          }
        />
      </Routes>
      <TimeoutModal
        idleTimeout={idleTimeout}
        setIdleTimeout={setIdleTimeout}
        resetInterval={resetInterval}
      />
    </div>
  );
}

export default App;

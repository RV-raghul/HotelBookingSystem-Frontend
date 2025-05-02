import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router';
import HotelMain from './components/hotel-page/HotelMain';
import SignUp from './components/login-signup/SignUp';
import Login from './components/login-signup/Login';
import AdminMain from './components/admin-page/AdminMain';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('token') !== null
  );

  return (
    <AppRoutes
      isAuthenticated={isAuthenticated}
      setIsAuthenticated={setIsAuthenticated}
    />
  );
}

function AppRoutes({ isAuthenticated, setIsAuthenticated }) {
  const location = useLocation();
  const role = sessionStorage.getItem("role");

  const publicPaths = ["/signup", "/signin", "/success"];
  const isPublic = publicPaths.includes(location.pathname);

  if (!isAuthenticated && !isPublic) {
    return <Navigate to="/signin" replace />;
  }

  if (isAuthenticated) {
    if (role === "ADMIN") {
      return <AdminMain setIsAuthenticated={setIsAuthenticated} />;
    } else {
      return <HotelMain setIsAuthenticated={setIsAuthenticated} />;
    }
  }

  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="*" element={<Navigate to={role === "ADMIN" ? "/dashboard" : "/book"} />} />
    </Routes>
  ); 
}

export default App;

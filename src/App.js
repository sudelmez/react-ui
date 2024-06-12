import React, { useState } from 'react';
import './App.css';
import AuthPage from './pages/auth/auth';
import Userpage from './pages/user/user_view';
import AddUserPage from './pages/add_user/add_user';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/home/home';
import AuthProvider from './hooks/auth-provider';

function App() {
  const [user, setUser] = useState();
  return (
    <AuthProvider value={{ user }} >
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/user" element={<Userpage />} />
          <Route path="/addUser" element={<AddUserPage />} />
          <Route
            path="/home"
            element={
              user ? (
                <HomePage user={user} />
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />
        </Routes>
      </Router>
    </AuthProvider>

  );
}

export default App;

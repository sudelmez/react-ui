import React from 'react';
import './App.css';
import AuthPage from './pages/auth/auth';
import Userpage from './pages/user/user_view';
import AddUserPage from './pages/add_user/add_user';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/home/home';
import { useAuth } from './hooks/auth-provider';

function App() {
  const { user } = useAuth();
  return (
    <Router>
      <Routes>
        {!user ? (
          <>
            <Route path="*" element={<Navigate to="/auth" />} />
            <Route path="/auth" element={<AuthPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/user" element={<Userpage />} />
            <Route path="/addUser" element={<AddUserPage />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;

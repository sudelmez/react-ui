import React from 'react';
import './App.css';
import AuthPage from './pages/auth/auth';
import Userpage from './pages/user/user_view';
import AddUserPage from './pages/add_user/add_user';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/home/home';
import { useAuth } from './hooks/auth-provider';
import NotFoundView from './pages/not_found/not_found';

function App() {
  const { user } = useAuth();
  return (
    <Router>
      <Routes>
        {!user ? (
          <>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/notFound" element={<NotFoundView />} />
            <Route path="*" element={<Navigate to="/auth" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/user" element={<Userpage />} />
            <Route path="/addUser" element={<AddUserPage />} />
            <Route path="/notFound" element={<NotFoundView />} />
            <Route path="*" element={<Navigate to="/notFound" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;

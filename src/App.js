import React from 'react';
import './App.css';
import AuthPage from './pages/auth/auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/home/home';
import AuthProvider, { useAuth } from './hooks/auth-provider';

function App() {
  const token = useAuth();
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/home"
            element={
              token ? (
                <HomePage />
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

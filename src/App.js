import React, { useState, useEffect } from 'react';
import './App.css';
import AuthPage from './pages/auth/auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/home/home';
import AuthProvider, { useAuth } from './hooks/auth-provider';

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(null);
  }, []);
  return (
    <AuthProvider value={{ user }} >
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/home" element={<HomePage />} />
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

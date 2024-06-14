import React from 'react';
import './App.css';
import AuthPage from './pages/auth/auth';
import Userpage from './pages/user/user_view';
import AddUserPage from './pages/add_user/add_user';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/home/home';
import AuthProvider, { useAuth } from './hooks/auth-provider';
import { ProtectedRoute } from './ProtectedRoute';

function App() {
  const { user } = useAuth();
  if (!user) {
    return <AuthPage />;
  }
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="/auth" element={
        <AuthPage />
      } />
      <Route path="/home" element={
        <HomePage />
      } />
      <Route path="/user" element={
        <Userpage />
      } />
      <Route path="/addUser" element={
        <AddUserPage />
      } />
    </Routes>
    // <Routes>
    //   <Route path="/" element={<Navigate to="/auth" />} />
    //   <Route path="/auth" element={
    //     <ProtectedRoute>
    //       <AuthPage />
    //     </ProtectedRoute>
    //   } />
    //   <Route path="/home" element={
    //     <ProtectedRoute>
    //       <HomePage />
    //     </ProtectedRoute>
    //   } />
    //   <Route path="/user" element={
    //     <ProtectedRoute>
    //       <Userpage />
    //     </ProtectedRoute>
    //   } />
    //   <Route path="/addUser" element={
    //     <ProtectedRoute>
    //       <AddUserPage />
    //     </ProtectedRoute>
    //   } />
    // </Routes>
  );
}

export default App;

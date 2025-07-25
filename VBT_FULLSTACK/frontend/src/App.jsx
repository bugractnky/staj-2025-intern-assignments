import React, { useState, useEffect } from 'react';
import Page from './page';
import Dashboard from './components/Dashboard/Dashboard';
import SignUpPage from './page/SignUpPage';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const [showSignUp, setShowSignUp] = useState(false);
  const { currentUser, logout, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;
  }

  if (currentUser) {
    return <Dashboard user={currentUser} onLogout={logout} />;
  }

  if (showSignUp) {
    return <SignUpPage onBackToLogin={() => setShowSignUp(false)} />;
  }

  return <Page onSignUp={() => setShowSignUp(true)} />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

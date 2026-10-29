import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import OwnerDashboard from './pages/OwnerDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';

function App() {
  const [session, setSession] = useState(() => {
    const saved = localStorage.getItem('trakio_session');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('trakio_session');
    setSession(null);
  };

  if (session?.user?.role === 'owner') {
    return (
      <OwnerDashboard 
        user={session.user} 
        token={session.token} 
        onBack={handleLogout} 
      />
    );
  }

  if (session?.user?.role === 'employee') {
    return (
      <EmployeeDashboard 
        user={session.user} 
        token={session.token} 
        onBack={handleLogout} 
      />
    );
  }

  return <Home />;
}

export default App;

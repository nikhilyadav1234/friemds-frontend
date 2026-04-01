  import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
  import { Toaster } from '@/components/ui/sonner';
  // import { useState, useEffect } from 'react';
  import UserProfile from '@/pages/UserProfile';
  import { useState } from 'react';
  import AuthPage from '@/pages/AuthPage';
  import DashboardPage from '@/pages/DashboardPage';
  import ProfilePage from '@/pages/ProfilePage';
  import FriendsPage from '@/pages/FriendsPage';
  import ChatPage from '@/pages/ChatPage';
  import SearchPage from '@/pages/SearchPage';
  import '@/App.css';

  function App() {
    const [token, setToken] = useState(localStorage.getItem('friemds_token'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('friemds_user') || 'null'));

    const handleLogin = (newToken, newUser) => {
      localStorage.setItem('friemds_token', newToken);
      localStorage.setItem('friemds_user', JSON.stringify(newUser));
      setToken(newToken);
      setUser(newUser);
    };

    const handleLogout = () => {
      localStorage.removeItem('friemds_token');
      localStorage.removeItem('friemds_user');
      setToken(null);
      setUser(null);
    };

    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route 
              path="/auth" 
              element={!token ? <AuthPage onLogin={handleLogin} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/" 
              element={token ? <DashboardPage user={user} onLogout={handleLogout} /> : <Navigate to="/auth" />} 
            />
            <Route 
              path="/profile" 
              element={token ? <ProfilePage user={user} setUser={setUser} onLogout={handleLogout} /> : <Navigate to="/auth" />} 
            />
            <Route 
              path="/friends" 
              element={token ? <FriendsPage user={user} onLogout={handleLogout} /> : <Navigate to="/auth" />} 
            />
            <Route 
              path="/chat/:friendId" 
              element={token ? <ChatPage user={user} onLogout={handleLogout} /> : <Navigate to="/auth" />} 
            />
            <Route 
              path="/search" 
              element={token ? <SearchPage user={user} onLogout={handleLogout} /> : <Navigate to="/auth" />} 
            />
            <Route 
              path="/user/:id" 
              element={token ? <UserProfile /> : <Navigate to="/auth" />} 
            />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" richColors />
      </div>
    );
  }

  export default App;

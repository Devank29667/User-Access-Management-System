import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  const isLoggedIn = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to={isLoggedIn ? '/login' : '/login'} />} />


        {role === 'Admin' && <Route path="/create-software" element={<div>Create Software (Admin)</div>} />}
        {role === 'Employee' && <Route path="/request-access" element={<div>Request Access (Employee)</div>} />}
        {role === 'Manager' && <Route path="/pending-requests" element={<div>Pending Requests (Manager)</div>} />}

        <Route path="*" element={<Navigate to={isLoggedIn ? `/${role.toLowerCase()}-home` : '/login'} />} />
      </Routes>
    </Router>
  );
}

export default App;
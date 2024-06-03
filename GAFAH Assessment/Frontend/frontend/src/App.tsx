import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import CompanyList from './pages/CompanyList';
import HomePage from './pages/HomePage';
import AddUserPage from './pages/AddUserPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< HomePage/>} />
        <Route path="/assign-user" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-user" element={<AddUserPage />} />
      </Routes>
    </Router>
  );
};

export default App;

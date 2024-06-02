import React from 'react';
import CompanyList from '../components/CompanyList';
import UserList from '../components/UserList';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <CompanyList />
      <UserList />
    </div>
  );
};

export default Dashboard;

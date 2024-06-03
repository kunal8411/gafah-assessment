import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../services/api';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface UserListProps {
  companyId: string;
}

const UserList: React.FC<UserListProps> = ({ companyId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [role, setRole] = useState('client');
  const [designation, setDesignation] = useState('');

  useEffect(() => {
    // Fetch users not part of the selected company
    API.get(`/users/not-in-company/${companyId}`)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, [companyId]);

  const handleSave = () => {
    if (selectedUserId) {
      API.post('/users/add-to-company', {
        userId: selectedUserId,
        companyId,
        role,
        designation,
      }).then(response => {
        console.log('User assigned successfully:', response.data);
        // Optionally refresh the user list or provide feedback
      }).catch(error => console.error('Error assigning user:', error));
    }
  };

  return (
    <div>
      <h2>Select a User to Assign to Company</h2>
      <ul>
        {users.map(user => (
          <li key={user._id} onClick={() => setSelectedUserId(user._id)}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>

      {selectedUserId && (
        <div>
          <h3>Assign User</h3>
          <div>
            <label>Role:</label>
            <select value={role} onChange={e => setRole(e.target.value)}>
              <option value="client">Client</option>
              <option value="ops">Ops</option>
              <option value="internal">Internal</option>
            </select>
          </div>
          <div>
            <label>Designation:</label>
            <input type="text" value={designation} onChange={e => setDesignation(e.target.value)} required />
          </div>
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default UserList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserList from './UserList';
import API from '../services/api';

interface Company {
  _id: string;
  name: string;
}

const CompanyList: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch companies from the backend
    API.get('/companies')
      .then(response => setCompanies(response.data))
      .catch(error => console.error('Error fetching companies:', error));
  }, []);

  return (
    <div>
      <h1>Select a Company</h1>
      <ul>
        {companies.map(company => (
          <li key={company._id} onClick={() => setSelectedCompanyId(company._id)}>
            {company.name}
          </li>
        ))}
      </ul>

      {selectedCompanyId && <UserList companyId={selectedCompanyId} />}
    </div>
  );
};

export default CompanyList;

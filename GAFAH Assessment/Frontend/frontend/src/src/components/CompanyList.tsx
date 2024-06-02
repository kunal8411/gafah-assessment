import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const CompanyList: React.FC = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await API.get('/companies');
      setCompanies(response.data);
    };
    fetchCompanies();
  }, []);

  return (
    <div>
      <h2>Companies</h2>
      <ul>
        {companies.map((company: any) => (
          <li key={company._id}>{company.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyList;
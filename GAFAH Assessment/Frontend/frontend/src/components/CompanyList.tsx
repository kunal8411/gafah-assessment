import React, { useEffect, useState } from "react";
import API from "../services/api";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CompanyList: React.FC = () => {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [usersNotInCompany, setUsersNotInCompany] = useState<any[]>([]);
  const [role, setRole] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");

  const roles = ['client', 'ops', 'internal'];

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await API.get("/companies");
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    const fetchUsersNotInCompany = async () => {
      try {
        if (selectedCompany) {
          const response = await API.get(
            `/users/not-in-company/${selectedCompany}`
          );
          setUsersNotInCompany(response.data);
        }
      } catch (error) {
        console.error("Error fetching users not in company:", error);
      }
    };
    fetchUsersNotInCompany();
  }, [selectedCompany]);

  const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCompany(event.target.value);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
  };

  const handleDesignationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDesignation(event.target.value);
  };

  const handleAddUserToCompany = async () => {
    try {
      await API.post("/users/add-to-company", {
        companyId: selectedCompany,
        userId: selectedUser,
        role,
        designation,
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding user to company:", error);
    }
  };

  const handleNavigateToHomepage = () => {
    navigate("/");
  };

  return (
    <Container>
      <Title>Companies</Title>
      <ButtonContainer>
        <Button onClick={handleNavigateToHomepage}>Go to Homepage</Button>
      </ButtonContainer>
      <Form>
        <Dropdown>
          <Select value={selectedCompany} onChange={handleCompanyChange}>
            <option value="">Select a company</option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </Select>
        </Dropdown>
        {selectedCompany && (
          <>
            <Subtitle>Users not in selected company</Subtitle>
            <Dropdown>
              <Select value={selectedUser} onChange={handleUserChange}>
                <option value="">Select a user</option>
                {usersNotInCompany.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </Select>
            </Dropdown>
            {selectedUser && (
              <>
                <InputContainer>
                  <Label>Role:</Label>
                  <Select value={role} onChange={handleRoleChange}>
                    <option value="">Select a role</option>
                    {roles.map((roleOption) => (
                      <option key={roleOption} value={roleOption}>
                        {roleOption}
                      </option>
                    ))}
                  </Select>
                </InputContainer>
                <InputContainer>
                  <Label>Designation:</Label>
                  <Input
                    type="text"
                    value={designation}
                    onChange={handleDesignationChange}
                  />
                </InputContainer>
              </>
            )}
            <Button onClick={handleAddUserToCompany}>Add User to Company</Button>
          </>
        )}
      </Form>
    </Container>
  );
};

export default CompanyList;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const Subtitle = styled.h3`
  color: #555;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  width: 100%;
  cursor: pointer;
  margin-bottom: 15px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;


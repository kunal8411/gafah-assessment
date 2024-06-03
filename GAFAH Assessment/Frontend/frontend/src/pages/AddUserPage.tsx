import React, { useEffect, useState } from "react";
import API from "../services/api";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const AddUserPage: React.FC = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
    designation: "",
    companyId: "",
  });
  const [companies, setCompanies] = useState<any[]>([]);
  const navigate = useNavigate();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/users", newUser);
      navigate("/"); // Navigate to the homepage after adding the user
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleGoToHomepage = () => {
    navigate("/");
  };

  return (
    <Container>
      <Header>
        <Title>Add New User</Title>
        <Button onClick={handleGoToHomepage}>Go to Homepage</Button>
      </Header>
      <AddUserForm onSubmit={handleAddUserSubmit}>
        <FormField>
          <Label>Name</Label>
          <Input type="text" name="name" value={newUser.name} onChange={handleInputChange} required />
        </FormField>
        <FormField>
          <Label>Email</Label>
          <Input type="email" name="email" value={newUser.email} onChange={handleInputChange} required />
        </FormField>
        <FormField>
          <Label>Password</Label>
          <Input type="password" name="password" value={newUser.password} onChange={handleInputChange} required />
        </FormField>
        <FormField>
          <Label>Role</Label>
          <Select name="role" value={newUser.role} onChange={handleInputChange}>
            <option value="client">Client</option>
            <option value="ops">Ops</option>
            <option value="internal">Internal</option>
          </Select>
        </FormField>
        <FormField>
          <Label>Designation</Label>
          <Input type="text" name="designation" value={newUser.designation} onChange={handleInputChange} required />
        </FormField>
        <FormField>
          <Label>Company</Label>
          <Select name="companyId" value={newUser.companyId} onChange={handleInputChange}>
            <option value="">Select Company</option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </Select>
        </FormField>
        <Button type="submit">Add User</Button>
      </AddUserForm>
    </Container>
  );
};

export default AddUserPage;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
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

const AddUserForm = styled.form`
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

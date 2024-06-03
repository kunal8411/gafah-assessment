import React, { useEffect, useState } from "react";
import API from "../services/api";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CompanyUserList: React.FC = () => {
  const [companies, setCompanies] = useState<any[]>([]);
  const [showAddUserForm, setShowAddUserForm] = useState<boolean>(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
    designation: "",
    companyId: "",
  });
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role"); // Get the user's role from local storage

  useEffect(() => {
    const fetchCompaniesWithUsers = async () => {
      try {
        const response = await API.get("/companies/companies-with-users");
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies and users:", error);
      }
    };
    fetchCompaniesWithUsers();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // Remove the role from local storage
    navigate("/login");
  };

  const handleNavigateToAssignUser = () => {
    navigate("/assign-user");
  };
  const handleAddUser = () => {
    navigate("/add-user");
  };
  const handleDeleteCompany = async (companyId: string) => {
    try {
      await API.delete(`/companies/${companyId}`);
      setCompanies(companies.filter((company) => company._id !== companyId));
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/users", newUser);
      setShowAddUserForm(false);
      // Optionally, you can refresh the companies and users list here
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
const handleAllUsersList=()=>{
  navigate("/users")
}
  return (
    <Container>
      <Header>
        <Title>Companies and Their Users</Title>
        <ButtonContainer>
          <Button onClick={handleSignOut}>Sign Out</Button>
          <Button onClick={handleNavigateToAssignUser}>Assign User</Button>
          {userRole === "client" && <Button onClick={handleAddUser}>Add User</Button>}
           <Button onClick={handleAllUsersList}>Users</Button>
        </ButtonContainer>
      </Header>
      
      {companies.map((company) => (
        <CompanyCard key={company._id}>
          <CompanyHeader>
            <CompanyName>{company.name}</CompanyName>
            {userRole === "client" && (
              <DeleteButton onClick={() => handleDeleteCompany(company._id)}>Delete Company</DeleteButton>
            )}
          </CompanyHeader>
          <UserList>
            {company.users.length > 0 ? (
              company.users.map((user: any) => (
                <UserListItem key={user._id}>
                  {user.name} - {user.role} ({user.designation})
                </UserListItem>
              ))
            ) : (
              <NoUsers>No users associated with this company.</NoUsers>
            )}
          </UserList>
        </CompanyCard>
      ))}
    </Container>
  );
};

export default CompanyUserList;

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

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
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

const FormTitle = styled.h3`
  color: #007bff;
  margin-bottom: 10px;
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

const CompanyCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const CompanyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CompanyName = styled.h3`
  color: #007bff;
  margin-bottom: 10px;
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  color: #fff;
  background-color: #dc3545;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;

const UserList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const UserListItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  &:last-child {
    border-bottom: none;
  }
`;

const NoUsers = styled.p`
  color: #888;
  font-style: italic;
`;

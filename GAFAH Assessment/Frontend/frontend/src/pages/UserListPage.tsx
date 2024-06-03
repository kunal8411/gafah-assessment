import React, { useEffect, useState } from "react";
import API from "../services/api";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleGoToHomepage = () => {
    navigate("/");
  };

  const isAdmin = userRole === "client";

  return (
    <Container>
      <Header>
        <Title>User List</Title>
        <ButtonContainer>
          <Button onClick={handleGoToHomepage}>Go to Homepage</Button>
        </ButtonContainer>
      </Header>
      <UserTable>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Role</TableHeader>
            <TableHeader>Designation</TableHeader>
            <TableHeader>Company</TableHeader>
            {isAdmin && <TableHeader>Action</TableHeader>}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.designation}</TableCell>
              <TableCell>{user.companyId}</TableCell>
              {isAdmin && (
                <TableCell>
                  <ActionButton>Edit</ActionButton>
                  <ActionButton>Delete</ActionButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </tbody>
      </UserTable>
    </Container>
  );
};

export default UserListPage;

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

const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 10px;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
  &:hover {
    background-color: #0056b3;
  }
`;

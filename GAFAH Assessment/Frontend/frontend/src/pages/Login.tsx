import React, { useEffect, useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
// import styled from ''
import styled from "styled-components";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate("/");
    }
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      const { token, role } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem('role', role);
      navigate("/");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Login</FormTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <SubmitButton type="submit">Login</SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default Login;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #343a40;
`;

const Form = styled.form`
  background: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #495057;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

import React, { useEffect } from "react";
import CompanyList from "../components/CompanyList";
import UserList from "../components/UserList";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  const singOut=()=>{
    localStorage.removeItem("token")
  }
  return (
    <div>
      <CompanyList />
    </div>
  );
};

export default Dashboard;

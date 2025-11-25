import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return !token ? children : null;
};

export default AuthRoute;

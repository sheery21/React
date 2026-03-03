import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { user, token, loading } = useSelector((state) => state.authReducer);

  if (loading) return null;
  if (user && token) {
    if (user.role === "customer") {
      return <Navigate to="/user-dashboard" replace />;
    } else if (user.role === "bank_officer") {
      return <Navigate to="/bank-dashboard" replace />;
    } else if (user.role === "sbp_admin") {
      return <Navigate to="/admin-dashboard" replace />;
    }
  }
  return <Outlet />;
};

export default PublicRoute;

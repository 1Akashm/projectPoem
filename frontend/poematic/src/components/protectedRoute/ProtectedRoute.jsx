import React, { useEffect } from "react";
import { Route, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (authToken) {
      toast.success("Welcome back! You are logged in.");
    } else {
      toast.error("Please log in before accessing this page");
    }
  }, [authToken]);

  return (authToken ? children : <Navigate to="/login" />);
};

export default ProtectedRoute;

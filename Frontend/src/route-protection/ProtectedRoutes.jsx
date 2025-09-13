import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/user/login" replace />;
  }

  // If logged in, render child routes
  return <Outlet />;
}

function ProtectedRouteFoodPartner() {
  const user = useSelector((state) => state.auth.user);

  if (!user && !user.role) {
    return <Navigate to="/food-partner/login" replace />;
  }

  // If logged in, render child routes
  return <Outlet />;
}

export { ProtectedRoute, ProtectedRouteFoodPartner };

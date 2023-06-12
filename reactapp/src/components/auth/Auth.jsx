import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function Auth(auth) {
  useEffect(() => {
    localStorage.setItem("isAuth", auth.isAuth);
    localStorage.setItem("role", auth.role);
  }, [auth.isAuth, auth.role]);

  return <Outlet />;
}

export function Admin({ children }) {
  const isAuth = localStorage.getItem("isAuth");
  const role = localStorage.getItem("role");
  console.log(role);

  if (isAuth && role === "Admin") {
    return <>{children}</>;
  } else {
    return <Navigate to={"/adminacademy"} />;
  }
}

export function User({ children }) {
  const isAuth = localStorage.getItem("isAuth");
  const role = localStorage.getItem("role");
  console.log(role);

  if (isAuth && role === "User") {
    return <>{children}</>;
  } else {
    return <Navigate to={"/viewacademy"} />;
  }
}

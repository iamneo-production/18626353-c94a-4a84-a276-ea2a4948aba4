
import { Navigate } from "react-router-dom";

export default function Auth(auth, email) {
 
  sessionStorage.setItem("isAuth", auth.isAuth);
  sessionStorage.setItem("role", auth.role);
  localStorage.setItem("email", email);
}

export function Admin({ children }) {
  const isAuth = sessionStorage.getItem("isAuth");
  const role = sessionStorage.getItem("role");

  
  if (isAuth && role === "Admin") {
    return <>{children}</>; // Render the child components
  } else {
    return <Navigate to={"/admin/adminacademy"} />; 
  }
}

export function User({ children }) {
  const isAuth = sessionStorage.getItem("isAuth");
  const role = sessionStorage.getItem("role");

  // Check if the user is authenticated and has the "User" role
  if (isAuth && role === "User") {
    return <>{children}</>; // Render the child components
  } else {
    return <Navigate to={"/user/viewacademy"} />; // Redirect to the user academy page
  }
}

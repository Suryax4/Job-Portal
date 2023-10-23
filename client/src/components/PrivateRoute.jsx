import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const auth = sessionStorage.getItem("token");
  return auth ? <Outlet /> : <Navigate to="/" />;
}

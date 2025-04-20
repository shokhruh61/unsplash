import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ user, children }) => {
  if (user) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoutes;

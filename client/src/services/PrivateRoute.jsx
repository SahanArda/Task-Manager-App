import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import AuthService from "../services/auth";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = AuthService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;

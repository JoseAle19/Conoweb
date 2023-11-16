import { Navigate } from "react-router-dom";
export const PublicRouter = ({ children }) => {

  return localStorage.getItem('token') === null ? children : <Navigate to="/" />;
};

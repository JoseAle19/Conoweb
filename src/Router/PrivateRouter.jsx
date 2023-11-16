import { Navigate } from "react-router-dom";
export const PrivateRouter = ({ children }) => {
 
  const user = localStorage.getItem("token");
  return user ? children : <Navigate to={"auth/"} />;
};

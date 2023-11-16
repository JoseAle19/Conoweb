import { Routes, Route, Navigate } from "react-router-dom";
import {} from "../pages";
import {
  DashboardAdmin,
 
} from "../pages/";
export const AppRouterAdmin = () => {
  return (
    <Routes>
      <Route path="/admin/dashboard/*" element={<DashboardAdmin />} />
      <Route path="/*" element={<Navigate to={"/admin/dashboard"} />} />
    </Routes>
  );
};

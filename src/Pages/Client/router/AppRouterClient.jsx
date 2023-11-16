import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardCliente } from "../pages/DashboardCliente";
import { Home } from "../pages/Home";

export const AppRouterClient = () => {
  return (
    <Routes>
     <Route path="/client/home" element={<Home/>}/>
     <Route path="/client/dashboard/*" element={<DashboardCliente/>}/>
     <Route path="/*" element={<Navigate to={'/client/home'}/>} />
    </Routes>
  );
};

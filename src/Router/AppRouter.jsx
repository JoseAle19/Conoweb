// Hooks de reac router dom
import { Routes, Route } from "react-router-dom";
// Rutas privadas
import { PrivateRouter } from "./PrivateRouter";
// Rutas Publicas
import { PublicRouter } from "./PublicRouter";
// Pantalla de admin
import { DashboardAdmin } from "../Pages/Administrator/pages/DashboardAdmin";
// Rutas de autentificacion
import { AuthRouter } from "../Auth/router/AuthRouter";
// Contexto de la aplicacion
import { typesRoles } from "../context/types";
import { DashboardCliente } from "../Pages/Client/pages/DashboardCliente";
import { CheckRoles } from "./CheckRoles";
export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <PrivateRouter>
            <CheckRoles />
          </PrivateRouter>
        }
      />

      <Route
        path="auth/*"
        element={
          <PublicRouter>
            <AuthRouter />
          </PublicRouter>
        }
      />
    </Routes>
  );
};

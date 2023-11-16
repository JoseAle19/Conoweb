import React from "react";
import { Login } from "./Auth/Login.jsx";
import { AuthProvider } from "./context/context.jsx";
import { AppRouter } from "./Router/AppRouter.jsx";
export const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

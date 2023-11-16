import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import { HashRouter } from "react-router-dom";

import { DashboardCliente } from "./Pages/Client/pages/DashboardCliente.jsx";
import { AppRouterClient } from "./Pages/Client/router/AppRouterClient.jsx";

// Importacion de material tailwind
import { ThemeProvider } from "@material-tailwind/react";
import { AppRouterAdmin } from "./Pages/Administrator/router/AppRouterAdmin.jsx";
import { CreateProducts } from "./Pages/Administrator/pages/Products/CreateProducts.jsx";
import { DashboardAdmin } from "./Pages/Administrator/pages/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider>
        <App />
        {/* < DashboardAdmin/> */}
        {/* <CreateProducts /> */}
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
);

import React from "react";
import { typesRoles } from "../context/types";
import { DashboardAdmin } from "../Pages/Administrator/pages";
import { DashboardCliente } from "../Pages/Client/pages/DashboardCliente";
import { ProductProvider } from "../context/productContext";
import { CartProvider } from "../Pages/Client/context/CartContext";

export const CheckRoles = () => {
  const user = JSON.parse(localStorage.getItem("token"));
  switch (user.rol_id) {
    case typesRoles.isAdmin:
      return (
        <ProductProvider>
          <DashboardAdmin />
        </ProductProvider>
      );
    case typesRoles.isClient:
      return (
        <ProductProvider>
          <CartProvider>
            <DashboardCliente />
          </CartProvider>
        </ProductProvider>
      );

    default:
      return <p>Not found app</p>;
  }
};

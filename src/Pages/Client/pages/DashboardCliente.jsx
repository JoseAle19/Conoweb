import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Products } from "./Products";
import { Cart } from "./Cart";
import { Profile } from "./Profile";
import { Us } from "./Us";
import { useProductContext } from "../../../context/productContext";

import { NavBarHome } from "../components/NavBarHome";
export const DashboardCliente = () => {
  const { getAllProducts } = useProductContext();

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div className="  h-screen w-full  flex flex-col">
      {/* Espacio para el navbar */}
        <NavBarHome />
      <div className="  w-full h-full overflow-y-auto style-scroll ">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/us" element={<Us />} />
        </Routes>
      </div>
    </div>
  );
};

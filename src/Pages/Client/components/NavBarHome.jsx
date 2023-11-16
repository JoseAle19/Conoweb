// Estilos de navBar
import "../../../css/NavActive.css";
//react router dom
import { NavLink } from "react-router-dom";
// logo
import Logo from "../../../../public/logo.png";
// Context del carrito de compras
import { useShoppingCartContext } from "../context/CartContext";
// Icons
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";
export const NavBarHome = () => {
  const [open, setOpen] = useState(true);
  const { products } = useShoppingCartContext();

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div
      className=" flex-col items-start sticky w-full h-auto flex justify-between  rounded-sm shadow-md px-2 
       xl:sticky xl:items-center xl:flex xl:flex-row xl:gap-10
       md:sticky md:items-center md:flex md:flex-row md:gap-10
       "
    >
      {/* <div className="   sticky w-full h-auto flex items-center justify-between gap-10 rounded-sm shadow-md 	"> */}
      <div
        className="p-2 w-full  flex items-center justify-between relative   
        xl:relative xl:justify-start 
        md:relative md:justify-start"
      >
        <AiOutlineMenu
          // className=" xl:hidden md:hidden 2xl:hidden text-3xl cursor-pointer absolute top-0 left-0 h-full"
          className=" xl:hidden md:hidden 2xl:hidden text-3xl cursor-pointer"
          onClick={() => handleOpen()}
        />
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="w-12 h-12 object-contain " />
          <p className="text-black font-bold font-alfa text-xl">Cono web</p>
        </div>
        <div 
        // className=" xl:hidden md:hidden 2xl:hidden text-3xl cursor-pointer absolute top-0 right-0 "
        className=" xl:hidden md:hidden 2xl:hidden text-3xl cursor-pointer"

        >
          {products.length > 0 && (
            <span className=" text-sm absolute -top-0 right-0 h-5 w-5 bg-red-400 text-white flex justify-center items-center rounded-full">
              {products.length}
            </span>
          )}
          <AiOutlineShoppingCart />
        </div>
      </div>
      {/* NavLink s */}
      <div
        className={`w-full h-full flex flex-col  items-start gap-5 px-5 
        xl:flex-row xl:items-center xl:gap-10 xl:justify-end
        md:flex-row md:items-center md:gap-10 md:justify-end
         ${!open ? "  duration-1000 max-h-96" : " duration-1000 max-h-0"}`}
      >
        {/* <div className=" h-full flex items-center gap-20 px-5 "> */}
        <NavLink onClick={() => handleOpen()} to="/">
          {({ isActive, isPending, isTransitioning }) => (
            <div className="nav-link">
              <p>Inicio</p>
              <div className={isActive ? "underline" : ""} />
            </div>
          )}
        </NavLink>
        <NavLink onClick={() => handleOpen()} to="/products">
          {({ isActive, isPending, isTransitioning }) => (
            <div className="nav-link">
              <p>Nuestros productos</p>
              <div className={isActive ? "underline" : ""} />
            </div>
          )}
        </NavLink>

        <NavLink onClick={() => handleOpen()} to="/us">
          {({ isActive, isPending, isTransitioning }) => (
            <div className="nav-link">
              <p>Nosotros</p>
              <div className={isActive ? "underline" : ""} />
            </div>
          )}
        </NavLink>

        <NavLink onClick={() => handleOpen()} to="/cart">
          {({ isActive, isPending, isTransitioning }) => (
            <div className="relative">
              {products.length > 0 && (
                <span className="absolute -top-3 -right-5 h-6 w-6 bg-red-400 text-white flex justify-center items-center rounded-full">
                  {products.length}
                </span>
              )}
              <div className="nav-link">
                <p>Carrito</p>
                <div className={isActive ? "underline" : ""} />
              </div>
            </div>
          )}
        </NavLink>

        <NavLink onClick={() => handleOpen()} to="/profile">
          {({ isActive, isPending, isTransitioning }) => (
            <div className="nav-link">
              <p>Cuenta</p>
              <div className={isActive ? "underline" : ""} />
            </div>
          )}
        </NavLink>
      </div>
    </div>
  );
};

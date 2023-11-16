// Icono de la camara
import { AiFillCamera } from "react-icons/ai";
//EStilo para que se vea la opcion seleccionada del nav
import "../../../css/NavActive.css";
// react router dom
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import { Orders } from "./Orders";
import { OrdersProvider } from "../context/OrdersContex";

export const Profile = () => {
  const navigate = useNavigate();
  return (
    <main className="relative h-full w-full flex justify-between bg-black/10 gap-2">
      {/* nav */}
      <section
        className=" bg-white h-full w-[15%] hidden flex-col  justify-start gap-20 text-black/50 text-md font-bold p-2
      xl:w-[15%] xl:flex
      md:w-[15%] md:flex

      "
      >
        <NavLink to={"account"}>
          {({ isActive, isPending, isTransitioning }) => (
            <div className="nav-link">
              <p className={isActive ? "text-[#4BA6C9] duration-500" : ""}>
                Mi cuenta
              </p>
              <div className={isActive ? "underline" : ""} />
            </div>
          )}
        </NavLink>

        <NavLink to="orders">
          {({ isActive, isPending, isTransitioning }) => (
            <div className="nav-link">
              <p className={isActive ? "text-[#4BA6C9] duration-500" : ""}>
                Pedidos
              </p>
              <div className={isActive ? "underline" : ""} />
            </div>
          )}
        </NavLink>
        <p onClick={()=>{
          localStorage.removeItem('token')
          navigate('/auth')
        }} className="text-red-900 font-bold cursor-pointer hover:scale-105 duration-500">Cerrar sesion</p>
      </section>
      {/* contenr */}
      <section className=" h-full w-full ">
        <Routes>
          <Route path="/" element={<InfoAccount />} />
          <Route path="/account" element={<InfoAccount />} />
          <Route
            path="/orders"
            element={
              <OrdersProvider>
                <Orders />
              </OrdersProvider>
            }
          />
          <Route path="/close" element={<InfoAccount />} />
        </Routes>
      </section>
    </main>
  );
};

export const InfoAccount = () => {
  return (
    <section className=" bg-white w-full h-full flex flex-col overflow-y-auto style-scroll p-2">
      {/* info */}
      <div className="flex  w-full h-auto p-10 gap-10">
        {/* image */}
        <div className="w-32 h-32 ">
          <img
            className="overflow-hidden rounded-full h-full w-full object-cover "
            src="https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
            alt=""
          />
        </div>
        {/* Name, email, opcion */}
        <div className="flex flex-col items-start justify-evenly ">
          <h2 className="text-2xl font-bold text-black">Jose Alejandro</h2>
          <h3 className="text-xl text-black/40">josealejandroc22@gmail.com</h3>
          <div className="flex text-md justify-center items-center gap-2 hover:scale-110 duration-500 cursor-pointer">
            <AiFillCamera />
            <p>Cambiar foto de perfil </p>
          </div>
        </div>
      </div>
      {/* datos personales */}
      {/* <div className="bg-yellow-200 w-full h-full ">
        <div className="h-60 w-full bg-black/20"></div>
        <div className="h-60 w-full bg-black/30"></div>
        <div className="h-60 w-full bg-black/40"></div>
        <div className="h-60 w-full bg-black/40"></div>
      </div> */}
    </section>
  );
};

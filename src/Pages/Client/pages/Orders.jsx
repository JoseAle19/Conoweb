import { AiOutlineSearch } from "react-icons/ai";
// Logo de la empresa
import Logo from "../../../../public/Logo.png";
import { useOrders } from "../hooks/useOrders";
import { useEffect, useState } from "react";
// Material tailwind
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

// Iconos
import { BiMessageAltDetail  } from "react-icons/bi";  
import {  ChevronDownIcon } from "@heroicons/react/24/outline";
import { SearchLoading } from "../../../Components/SearchLoading";


// mocks de orders 
// import { orders as ordersContext } from "../../../Mocks/orders.json";

export const Orders = () => {
  const { orders, ordersContext = [], loading, navProducts } = useOrders();
  // const { orders, loading, navProducts } = useOrders();
  useEffect(() => {
    orders();
  }, []);

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center bg-white ${
        loading ? "overflow-hidden" : "overflow-y-auto style-scroll"
      }  }`}
    >
      {loading && <SearchLoading/>}

      <section className="w-full flex gap-2 justify-around bg-white py-5">
        <div className="flex gap-2">
          <p>Todos</p>
          <p className="bg-black/60 rounded-full w-5 text-center font-bold text-white ">
            {ordersContext.length}
          </p>
        </div>
        <p>Pendientes</p>
        <p>Cancelados</p>
        <p>Entregados</p>
      </section>
      {/* Contenido de segun el estado del pedido */}
      <section className="w-full  h-full p-2 ">
        <div className="w-full p-3 bg-black/10 flex  items-center  text-xl gap-2 rounded-md">
          <AiOutlineSearch />
          <input
            className="bg-transparent placeholder:text-black/50 w-full border-none outline-none"
            type="text"
            placeholder="Buscar por nombre o numero de pedido "
          />
        </div>
        {/* orders */}

        <div className="h-full w-full flex flex-col ">
          {ordersContext.length === 0 && !loading && (
            <div className=" flex justify-center items-center flex-col gap-5">
              <p className="text-3xl font-bold text-black/50">
                No tienes pedidos
              </p>
              <button
                onClick={navProducts}
                className="bg-[#4BA6C9] text-white font-bold  p-2 px-5 rounded-md text-center"
              >
                Ir a comprar
              </button>
            </div>
          )}
          {ordersContext.map((order) => {
            return (
              <ItemProduct
                status={order.status_order}
                products={order.products}
                total={order.total}
                note={order.note_client}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};
{
}

export const ItemProduct = ({ products, status, total, note}) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <section className="w-full bg-black/2 flex flex-col gap-2 p-2 my-10 shadow-xl">
      <div
        className={`w-full  flex p-2 justify-end border-b border-black/50
      ${status === "cancel" && "text-red-700 font-extrabold text-xl"}
      ${status === "delivered" && "text-green-700 font-extrabold text-xl"}
      ${status === "pending" && "text-yellow-700 font-extrabold text-xl"}
      
      `}
      >
        {status === "cancel"
          ? "Cancelado"
          : status === "delivered"
          ? "Entregado"
          : status === "pending"
          ? "Pendiente"
          : ""}
      </div>

      {products?.map((e) => {
        return (
          <div className="w-full flex   p-2 justify-between items-end  border-b border-black/50">
            {/* Imagen e informacion */}
            <div className="flex h-28 w-28   gap-10 object-cover rounded-full ">
              <img
                className=" h-full w-full  rounded-full"
                src={e.image}
                alt={e.description}
              />
              {/* Informacion del producto */}
              <div className="  w-full  h-full flex  flex-col items-start justify-evenly ">
                <p className="text-xl font-semibold w-72">{e.description }</p>
                <p className="text-sm text-black/70">Conos</p>
                <p className="text-md text-black/90">X{e.quantity_bought}</p>
              </div>
            </div>
            {/* Precio total del producto */}
            <div className="h-full  ">
              <p className="text-xl font-bold text-[#4BA6C9]">
                ${e.price_per_quantity}
              </p>
            </div>
          </div>
        );
      })}

      <div className="w-full flex flex-col  items-end gap-2">
        <div className="flex gap-4 text-xl items-center justify-center">
          <img className="h-10  object-cover" src={Logo} alt="Logo" />
          <p> Total de pedido</p>
          <p className="text-[#4BA6C9] font-bold ">${total}</p>
        </div>

        <button className="rounded-full bg-[#4BA6C9] text-white p-2">
          Comprar de nuevo
        </button>
      </div>
      {/* Para desplegar los el mensaje del usuario */}
      <Accordion
        open={open === 1}
        icon={
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`mx-auto h-4 w-4 transition-transform ${
              open === 1 ? "rotate-180" : ""
            }`}
          />
        }
      >
        <ListItem className=" w-full p-0" selected={open === 1}>
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className="border-b-0 p-3"
          >
            <ListItemPrefix>
            <BiMessageAltDetail/>

            </ListItemPrefix>
            <Typography color="blue" className="  mr-auto font-normal">
              Mi nota
            </Typography>
          </AccordionHeader>
        </ListItem>
        <AccordionBody className="py-1">
          <List className="p-0">
              <ListItem>
                {note?note:'Sin nota'}
              </ListItem>
          </List>
        </AccordionBody>
      </Accordion>
    </section>
  );
};

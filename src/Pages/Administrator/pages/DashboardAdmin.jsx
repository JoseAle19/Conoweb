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

import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/solid";

import { BiSolidCategoryAlt } from "react-icons/bi";

import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

// Logo de la empresa
import Logo from "../../../../public/logo.png";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Home, Categories, Orders, Settings, Users } from "../pages/index";
import { CreateProducts, ListProducts } from "../pages/Products";
import { useProductContext } from "../../../context/productContext";
import { OrdersAdminProvider } from "../context/OrdersAdmin";

export const DashboardAdmin = () => {
  const { getAllProducts } = useProductContext();
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <main className="w-screen h-screen flex gap-2  ">
      <section className="h-full ">
        <MultiLevelSidebar />
      </section>

      {/* secionde las rutas que se tendran */}
      <section className="flex-1 h-full flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/*" element={<CreateProducts />} />
          <Route path="/listproducts/*" element={<ListProducts />} />
          <Route path="/categories/*" element={<Categories />} />
          <Route path="/users/*" element={<Users />} />
          <Route path="/settings/*" element={<Settings />} />
          <Route
            path="/orders/*"
            element={
              <OrdersAdminProvider>
                <Orders/>
              </OrdersAdminProvider>
            }
          />
          <Route path="/*" element={<h1>Not found admin</h1>} />
        </Routes>
      </section>
    </main>
  );
};

export function MultiLevelSidebar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="h-full w-full max-w-[20rem]  shadow-xl shadow-blue-gray-900/5 flex flex-col  overflow-y-auto style-scroll">
      <div className=" flex items-center gap-5">
        <img src={Logo} className="h-16" />
        <Typography
          variant="h5"
          color="gray"
          className="text-[#7DA7B7] text-2xl font-bold"
        >
          Cono web
        </Typography>
      </div>
      <div className="h-full">
        <List>
          {/* primer  */}
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
                  <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue" className="  mr-auto font-normal">
                  Dashboard
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <Link to={""}>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Inicio
                  </ListItem>
                </Link>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Graficas
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Reportes
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Historial
                </ListItem>
              </List>
            </AccordionBody>
          </Accordion>
          {/* segundo */}
          <Accordion
            open={open === 2}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 2 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 2}>
              <AccordionHeader
                onClick={() => handleOpen(2)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue" className="mr-auto font-normal">
                  Productos{" "}
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <Link to={"Products"}>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Agregar nuevo
                  </ListItem>
                </Link>

                <Link to={"listproducts"}>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Listar productos
                  </ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>
          {/* tercer */}
          <ListItem>
            <ListItemPrefix>
              <ArchiveBoxIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue" className="mr-auto font-normal">
              Proveedores{" "}
            </Typography>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <BiSolidCategoryAlt className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue" className="mr-auto font-normal">
              Categorias{" "}
            </Typography>{" "}
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue" className="mr-auto font-normal">
              Stock{" "}
            </Typography>{" "}
          </ListItem>
          <Link to={"orders"}>
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue" className="mr-auto font-normal">
                Ordenes{" "}
              </Typography>{" "}
            </ListItem>
          </Link>
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue" className="mr-auto font-normal">
              Pedidos{" "}
            </Typography>{" "}
          </ListItem>
        </List>
      </div>
      <div className="w-full flex flex-col justify-center items-center mt-5">
        {/* titulo y  */}
        <Typography className="text-[#7DA7B7] font-bold">
          Ajustes y cuenta
        </Typography>

        <List>
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Cuenta
          </ListItem>
          <ListItem
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Cerrar sesión
          </ListItem>
        </List>
      </div>
    </Card>
  );
}

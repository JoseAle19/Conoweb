import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  Chip,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
} from "@material-tailwind/react";

import {
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

// Iconos
import { BiMessageAltDetail } from "react-icons/bi";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useOrders } from "../hooks/useOrders";
import { SearchLoading } from "../../../Components/SearchLoading";

// importar mocks de orders
import { MdCancel } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";
import { formatDate } from "../../../utils/formatDate";

const TABS = [
  {
    label: "Todos",
    value: "all",
  },
  {
    label: "Pendientes",
    value: "monitored",
  },
  {
    label: "Por recoger",
    value: "unmonitored",
  },
  {
    label: "Entregado",
    value: "delivered",
  },
];

const TABLE_HEAD = [
  "Pedido",
  "CLiente",
  "Fecha",
  "Estado",
  "Total",
  "Acciones",
];
const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    online: true,
    date: new Date().toISOString(),
    state: "pending",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    online: true,
    date: new Date().toISOString(),
    state: "toCollect",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    online: true,
    date: new Date().toISOString(),
    state: "delivered",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    online: true,
    date: new Date().toISOString(),
    state: "cancelado",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    online: true,
    date: new Date().toISOString(),
    state: "pending",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    job: "Programmer",
    org: "Developer",
    online: false,
    date: new Date().toISOString(),
    state: "toCollect",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    job: "Executive",
    org: "Projects",
    online: false,
    date: new Date().toISOString(),
    state: "delivered",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    job: "Programmer",
    org: "Developer",
    online: true,
    date: new Date().toISOString(),
    state: "cancelado",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    job: "Manager",
    org: "Executive",
    online: false,
    date: new Date().toISOString(),
    state: "pending",
  },
];

export const Orders = () => {
  const { getOrders, orders, loading, acceptOrder, cancelOrder } = useOrders();
  useEffect(() => {
    getOrders();
  }, []);

  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 999999 : value);
  };
  return (
    <Card className="h-full w-full">
      {loading && <SearchLoading />}
      <CardHeader
        floated={true}
        shadow={false}
        className="rounded-none my-5 flex items-center"
      >
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row  py-10 px-5  w-full bg-black/10 ">
          <Tabs value="all" className="w-full ">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Buscar"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-y-auto px-0 ">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map(
              (
                {
                  id,
                  date_order,
                  discounts,
                  email,
                  name,
                  status_order,
                  order_total,
                  note_client,
                  number_order,
                  photo: img,
                  products
                },
                index
              ) => {
                const odd =
                  index % 2 == 0 ? "p-4 bg-gray-100 " : " p-4 bg-white";

                return (
                  <>
                    <tr
                      key={index + name}
                      // className={odd}
                    >
                      <td className={odd}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            Id del pedido
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {number_order}
                          </Typography>
                        </div>
                      </td>
                      <td className={odd}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={
                              img
                                ? img
                                : "http://www.higieneplus.com.ar/wp-content/themes/higieneplus/images/producto-sin-foto-ficha.jpg"
                            }
                            alt={name}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {name}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>

                      <td className={odd}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal "
                        >
                          {formatDate(date_order)}
                        </Typography>
                      </td>
                      <td className={odd}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={
                              status_order === "pending"
                                ? "Pendiente"
                                : status_order == "delivered"
                                ? "Entregado"
                                : status_order === "cancel"
                                ? "Cancelado"
                                : "Sin estado"
                            }
                            color={
                              status_order === "pending"
                                ? "yellow"
                                : status_order === "toCollect"
                                ? "orange"
                                : status_order == "delivered"
                                ? "green"
                                : status_order === "cancel"
                                ? "red"
                                : "purple"
                            }
                          />
                        </div>
                      </td>
                      <td className={odd}>
                        <Chip
                          variant="ghost"
                          size="xl"
                          value={`
                          $${order_total}`}
                          color="black"
                        />
                      </td>
                      <td className={odd}>
                        <div className="flex w-full justify-between">
                          <IconButton
                            disabled={
                              status_order === "delivered"|| status_order === "cancel"
                                ? true
                                : false
                            }
                            onClick={() => acceptOrder({
                              id,
                              products
                            })}
                            color="green"
                          >
                            <AiFillCheckCircle
                              color="white"
                              className="h-6 w-6"
                            />
                          </IconButton>
                          <IconButton
                            disabled={
                              status_order === "delivered"|| status_order === "cancel"
                                ? true
                                : false
                            }
                            onClick={() => cancelOrder()}
                            color="red"
                          >
                            <MdCancel color="white" className="h-6 w-6" />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                    <tr key={index + name}>
                      <td className={odd} colSpan={6}>
                        <Accordion
                          open={open === index}
                          icon={
                            <ChevronDownIcon
                              strokeWidth={2.5}
                              className={`mx-auto h-4 w-4 transition-transform ${
                                open === index ? "rotate-180" : ""
                              }`}
                            />
                          }
                        >
                          <ListItem
                            className=" w-full p-0"
                            selected={open === index}
                          >
                            <AccordionHeader
                              onClick={() => handleOpen(index)}
                              className="border-b-0 p-3"
                            >
                              <ListItemPrefix>
                                <BiMessageAltDetail />
                              </ListItemPrefix>
                              <Typography
                                color="blue"
                                className="  mr-auto font-normal"
                              >
                                Nota del cliente
                              </Typography>
                            </AccordionHeader>
                          </ListItem>
                          <AccordionBody className="py-1">
                            <Typography>{note_client}</Typography>
                          </AccordionBody>
                        </Accordion>{" "}
                      </td>
                    </tr>
                  </>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

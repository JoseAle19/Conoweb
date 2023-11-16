import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import { TopSvg } from "../svg/SvgClients";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ImageProduct from "../../../../public/assetsProducts/barquillo.png";
// Context del carrito de compras
import { useShoppingCartContext } from "../context/CartContext";
// Importar estilos del index

export const Product = () => {
  return (
    <main className="w-72 h-96 shadow-md border border-[#A4E2FF] shadow-[#A4E2FF]">
      <div className="w-full h-[33.333%] relative flex justify-center font-bold ">
        <span className="absolute top-0 left-0">
          <TopSvg />
        </span>
        <h2>Canaste de wafle</h2>
      </div>
      <div className="w-full h-[55%]   flex flex-col  p-2 ">
        <div className="w-full h-[50%]  flex justify-center items-center">
          <img src={ImageProduct} className="w-20 h-20" />
        </div>
        <div className="w-full h-[57%]  overflow-y-auto style-scroll ">
          <p className="text-sm  ">
            Para una base comestible para su helado y múltiples creaciones,
            ofrecemos las cestas o Flor de Waffle. Las cestas son de Waffle
            color marrón caramelo medio a profundo, con sabor a azúcar y
            moldeadas a mano para darle forma de flor o cestas.
          </p>
        </div>
      </div>
      <div className="w-full h-[12%] flex items-center justify-evenly ">
        <p>
          <span className="font-bold">Precio:</span> $1,000
        </p>
        <span className="text-2xl">
          <AiOutlineShoppingCart />
        </span>
      </div>
    </main>
  );
};

export function EcommerceCard(product) {
  const { product_name, product_description, product_image, product_price } =
    product;

  const { addProductCart } = useShoppingCartContext();
  return (
    <Card 
    shadow={true}
    className="w-72 h-96 flex flex-col justify-between ">
      <CardHeader
        shadow={false}
        floated={false}
        className="flex items-center justify-center"
      >
        <img
          src={product_image}
          alt={product_name}
          className="h-40 w-40 object-cover"
        />
      </CardHeader>
      <CardBody className="">
        <div className="mb-2 flex items-start justify-between">
          <Typography color="blue-gray" className="font-medium">
            {product_name}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            ${product_price}mxn
          </Typography>
        </div>
        <div >
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75  h-full w-full  whitespace-pre-wrap "
          >
            {product_description}
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-[#F25BAD] text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          onClick={() => addProductCart(product)}
        >
          Agregar al carrito{" "}
        </Button>
      </CardFooter>
    </Card>
  );
}

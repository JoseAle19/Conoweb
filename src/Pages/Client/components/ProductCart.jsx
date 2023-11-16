import { useShoppingCartContext } from "../context/CartContext";

import { AiOutlinePlus } from "react-icons/ai";
import { GrSubtract } from "react-icons/gr";

export const ProductCart = ({
  id,
  image,
  name,
  category,
  quantity,
  price,
  total,
}) => {
  const { addProductCart, deleteProductCart } = useShoppingCartContext();
  return (
    <div className="w-full flex items-center  gap-2 py-5  border-b-4 
     ">
      {/* Imagen del producto */}
      <div className="  flex items-center gap-5 
      w-full
      md:w-[40%]
      xl:w-[40%]
      ">
        {/* Imagen  */}
        <div className=" h-20 w-20   flex  items-center justify-start  ">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover overflow-hidden rounded-full"
          />
        </div>
        {/* Nombre y mas */}
        <div className="flex flex-col  items-start justify-evenly overflow-hidden">
          {/* <p>Caja de conos, sabor vainilla</p> */}
          <span className="font-bold">Nombre:</span> {name}
          <span className="font-bold">Categoria:</span> {category}
        </div>
      </div>
      {/* informacion del producto */}
      <div className="flex-1 h-20  ">
        {/* Inputs de cantidad, unidad, precio y total */}
        <div className="w-full h-full flex items-center justify-between
         flex-col
         md:flex-row
         xl:flex-row
         ">
          {/* Cantidad */}
          <div className=" h-auto  w-auto flex items-center justify-center  gap-2 p-1  border border-gray-500 rounded-sm">
            <AiOutlinePlus
              onClick={() =>
                addProductCart({
                  id,
                  product_image: image,
                  product_name: name,
                  category_name: category,
                  product_price: price,
                })
              }
              className="text-xl cursor-pointer "
            />
            <p>{quantity}</p>
            <GrSubtract
              onClick={() => deleteProductCart(id)}
              className="text-xl cursor-pointer "
            />
          </div>
          <div>
            <p>${price}</p>
          </div>
          {/* Total */}
          <div>
            <p>${total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

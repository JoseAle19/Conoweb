//  Vista del carrito de compras
// importar el componente de producto item
import { ProductCart } from "../components/ProductCart";
// importar el icono de flecha para regresar
import { AiOutlineArrowLeft } from "react-icons/ai";
// importar el hook de useNavigate
import { useNavigate } from "react-router-dom";
import { useShoppingCartContext } from "../context/CartContext";
import { useform } from "../../../hooks/useform";
import { Loading } from "../../../Components/Loading";
import { useCart } from "../hooks/useCart";

export const Cart = () => {
  const { loading, products } = useShoppingCartContext();
  const navigate = useNavigate();
  return (
    <main
      className=" relative flex flex-col bg-white gap-2
    xl:relative xl:flex xl:flex-row xl:w-full xl:h-full  xl:bg-white   xl:gap-2
    md:relative md:flex md:flex-row md:w-full md:h-full  md:bg-white   md:gap-2
    "
    >
      {loading && <Loading />}

      <div
        className="flex-1 h-[80%] 
        
      xl:flex-1 xl:h-full xl:bg-white  xl:overflow-y-auto style-scroll
      md:flex-1 md:h-full md:bg-white  md:overflow-y-auto style-scroll
      "
      >
        <div className="px-5">
          <h2 className="text-2xl font-bold">Tu carrito</h2>
          <h3 className="text-xl">
            Total: [1 producto] <span className="font-bold">2000</span>{" "}
          </h3>
        </div>
        <div className="xl:px-10 md:px-10 px-2 ">
          {products.map((product) => (
            <ProductCart key={product.id} {...product} />
          ))}
        </div>
      </div>
      <div
        className="
      w-full flex flex-col justify-between  
      xl:w-[30%] xl:h-full xl:bg-white
      md:w-[30%] md:h-full md:bg-white
      "
      >
        <OrderDetails />
      </div>
    </main>
  );
};

export const OrderDetails = () => {
  const { products } = useShoppingCartContext();
  const { buyProducts } = useCart();
  const { formState, changeInputs } = useform({
    note_customer: "",
  });

  const { note_customer } = formState;
  return (
    <section
      className="
    w-full  flex flex-col  justify-center items-center 
    xl:w-full xl:h-full  xl:flex  xl:justify-between 
    md:w-full md:h-full  md:flex  md:justify-between 
    "
    >
      <div className="w-full  flex flex-col justify-center items-start ">
        <p className="font-bold text-xl">Resumen del pedido</p>
      </div>

      {/* Datos del pedido final */}
      <div className="w-full  flex flex-col gap-5 justify-start h-full  ">
        <div className="w-full flex justify-between ">
          {/* <p className="text-xl font-bold ">Productos x{products.length}</p> */}
        </div>
        {/* Datos de entrega */}
        <div className="flex mx-4  items-center justify-between">
          <p >Entrega</p>
            <p>Recoger en tienda</p>
        </div>
        <div className="flex mx-4  items-center justify-between">
          <p >{products.length} productos</p>
          <p>
          ${products.reduce((acc, curr) => acc + curr.total, 0)}mxn{" "}

          </p>
        </div>
        <div className=" p-2 h-auto w-full ">
        <textarea
          name="note_customer"
          value={note_customer}
          onChange={changeInputs}
          id=""
          cols="30"
          rows="5"
          placeholder="Agregar notas extras de tus producto"
          className="placeholder:text-md bg-white w-full border border-black resize-none p-2 rounded-md"
        ></textarea>
      </div>

        <div className="w-full   sticky bottom-0 flex items-center justify-center ">
        <button
          onClick={() => buyProducts(formState, products)}
          disabled={products.length < 1}
          className={`
          w-full p-2 rounded-none
          xl:w-full xl:p-2
        md:w-full md:p-2
          ${
            products.length < 1 ? "bg-gray-500" : "bg-[#5ACBF4]"
          } text-white font-bold rounded-md`}
          >
          Realizar pedido
        </button>
        
          </div>
      </div>
 
    </section>
  );
};

// <div
// className="w-full h-full  flex flex-col justify-between
// xl:w-[70%] xl:h-full  xl:flex xl:flex-col xl:justify-between
// md:w-[70%] md:h-full  md:flex md:flex-col md:justify-between
// "
// >

// <div className="w-full flex flex-col px-2 gap-10 ">
//   <section className="w-full h-full flex flex-col">
//     <div
//       className="px-2 w-full flex items-center justify-between font-bold text-xl
//     xl:px-2 xl:w-full xl:flex xl:flex-row xl:items-center xl:justify-between xl:font-bold xl:text-xl
//     md:px-2 md:w-full md:flex md:flex-row md:items-center md:justify-between md:font-bold md:text-xl
//     "
//     >
//       <p>Mi carrito de productos </p>
//     </div>
//     <span className="w-full h-0.5 bg-gray-400" />
//   </section>
// </div>
// <div className="
// w-full h-full overflow-auto style-scroll my-3
// xl:w-full xl:h-full xl:overflow-auto xl:style-scroll xl:px-2
// md:w-full md:h-full md:overflow-auto md:style-scroll md:px-2
//  ">
//   {products.length > 0 &&
//     products?.map((product, index) => {
//       return <ProductCart key={product.id + index} {...product} />;
//     })}
// </div>

// <div className="text-[#5ACBF4] font-bold py-2 px-4 rounded-fulls flex items-center gap-5">
//   {/* Link para regresar a comorar */}
//   <AiOutlineArrowLeft strokeWidth={90} />

//   <button onClick={() => navigate("/client/dashboard")}>
//     Regresar a comprar
//   </button>
// </div>
// <div
// className=" w-full h-full flex flex-col justify-between
// xl:w-[30%] xl:h-full xl:bg-[#5ACBF4]/8
// md:w-[30%] md:h-full xl:bg-[#5ACBF4]/8
// "
// >
// </div>
// </div>

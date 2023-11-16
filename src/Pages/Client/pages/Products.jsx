import Background from "../../../../public/assetsClient/products.png";
import { categories } from "../../../Mocks/categories";
import LayerImage from "../../../../public/assetsProducts/layer.png";
import { EcommerceCard } from "../components/Product";
import { AiOutlineArrowDown } from "react-icons/ai";
import { useProductContext } from "../../../context/productContext";

import "../../../index.css";
export const Products = () => {
  return (
    <section className="w-full  h-full relative ">
      {/* Titulos y fondo de la imagen */}
      <div
        style={{
          // backgroundImage: `url(${Background})`,

          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "calc(100vh - 70px)",
        }}
        className=" bg-white w-full h-full "
      >
        <div className="relative w-full h-full  flex items-center justify-center ">
          <img
            src={Background}
            className=" absolute w-full h-full object-cover  blur-[2px]"
          />

          <div className="absolute bg-gray-950/20 w-full h-full "> </div>

          <div className="absolute flex  flex-col justify-between items-center  bottom-0 top-1/4 ">
            <h1 className=" font-alfa tracking-widest text-primary text-center text-4xl font-bold">
              {" "}
              "Tu Dulce Inspiración, Nuestra Materia Prima: <br /> ¡Helados
              Hechos a Tu Manera!"
            </h1>

            <p className=" text-white font-bold text-[4rem] animate-bounce p-2 cursor-pointer ">
              {" "}
              <AiOutlineArrowDown strokeWidth={20} />
            </p>
          </div>
        </div>
        <div className=" py-10 bg-[#f5f5f5]">
          <Categories />
          <Information />
          <TypeProduct />
        </div>
      </div>
    </section>
  );
};

export const Categories = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-10 sticky">
      <h2 className="text-3xl font-bold text-primary">Categorias</h2>
      <div className="flex gap-4  w-[80%] overflow-x-scroll style-scroll">
        {categories.map((categorie) => {
          return (
            <div
              key={categorie.image}
              className="flex flex-col gap  w-full items-center justify-between hover:scale-110 duration-500 cursor-pointer"
            >
              <div className=" h-20 w-20 rounded-full   overflow-hidden flex items-center justify-center">
                <img
                  src={categorie.image}
                  className=" object-cover w-full h-full"
                />
              </div>
              <p className=" font-bold text-primary/80">{categorie.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Information = () => {
  return (
    <div
      className=" w-full h-full md:h-96 xl:h-96  my-10  
    flex justify-center xs:bg-red-500 
    "
    >
      <div
        className="w-[100%] flex flex-col justify-around 
      xl:flex-row
      md:flex-row
       "
      >
        <div className="h-full flex flex-col justify-center items-center gap-10 order-2
        md:order-1 md:w-[70%]
        xl:order-1 xl:w-[70%]
        text-center
        ">
          <h2 className="text-black  font-bold text-2xl font-alfa tracking-widest ">
            Despierta tus Sentidos con <br />
            la Delicia en Cada
            <span className="text-[#F25BAD] font-alfa font-bold text-3xl ml-2   ">
              Barquillo
            </span>
          </h2>

          <p className="hidden font-sans w-[80%] 
          md:block
          xl:block
          text-start
          ">
            Esta caja de barquillos es mucho más que un simple envase; es la
            puerta de entrada a un mundo de sabores y texturas que te llevarán a
            un viaje de indulgencia y satisfacción. Cada barquillo es una obra
            maestra crujiente y dorada, lista para albergar el helado de tus
            sueños. Imagina abrir esta caja y dejar que el aroma dulce de los
            barquillos recién horneados te envuelva. Cada uno de ellos es un
            lienzo en blanco para tu creatividad culinaria. ¿Qué sabor de helado
            elegirás hoy?
          </p>
          <p className="text-white text-md text-center font-bold rounded-full w-1/2 bg-[#F25BAD]  p-2 ">
            Más información
          </p>
        </div>
        <div
          className="
          
          order-1 h-full overflow-hidden 
          md:w-[30%] md:order-2
          xl:w-[30%] xl:order-2
            "
        >
          <img
            src={LayerImage}
            className="  h-full w-full object-contain"
            alt="Imagen de layer"
          />
        </div>
      </div>
    </div>
  );
};

export const TypeProduct = () => {
  const { products = [] } = useProductContext();

  return (
    <div className="w-full flex flex-col items-center  my-20 gap-20 z-10  ">
      <h2 className="text-primary text-3xl font-bold ">Conos o barquillos</h2>
      {products.length < 1 ? (
        <p>Sin productos, Vuelve pronto</p>
      ) : (
        <div className=" grid grid-cols-1 md:grid md:grid-cols-2 xl:grid xl:grid-cols-3 justify-items-center  w-[80%]  gap-10">
          {products.map((product) => {
            return (
              <div key={product.id}>
                <EcommerceCard {...product} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

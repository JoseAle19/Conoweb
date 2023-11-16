import {
    ImagePopSicle,
    SvgCircleDot,
    SvgMiddleCircle,
    SvgMountain,
    SvgSparkles,
    SvgSparklesTwo,
    SvgTop,
    Svgbottom,
  } from "../svg/SvgClients";
  import IceScream from "../../../../public/assetsClient/heladohome.png";
  import Logo from "../../../../public/logo.png";
  
  
  import { BiLogoFacebookCircle } from "react-icons/bi";
  import { RiWhatsappFill } from "react-icons/ri";
  import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
export const Home = () => {
    const navigate = useNavigate();
    return (
        <main className="h-screen w-screen   bg-white flex gap-12">
          {/* Dise;o del lado izquierdo */}
          <section className="w-[40%] h-full  flex flex-col  justify-between ">
            {/* Dise;o de arriba */}
            <article className="w-full h-[35%]  ">
              <div className="  w-full h-full relative">
                {/* Svg de abajo */}
                <div className="absolute top-0 w-[70%] h-full ">
                  <SvgTop />
                </div>
                {/* Logo, titulo y chispas */}
                <div className=" absolute w-full h-1/2 flex justify-between">
                  {/* logo y titulo */}
                  <div className="flex items-center w-[70%]">
                    <img src={Logo} className="h-20  " />
                    <p className="text-3xl font-extrabold text-white  ">Cono web</p>
                  </div>
                  {/* ?svg de chispas */}
                  <span className="xl:w-[30%] xl:block  md:hidden">
                    <SvgSparkles />
                  </span>
                </div>
              </div>
            </article>
            {/* Dose;o de abajo*/}
            <article className="  w-full  h-[55%]">
              {/* div para poder mandar la imagen hacia abajo */}
              <div className="w-full h-full relative ">
                {/* imagen de los helados */}
                <img src={IceScream} className="absolute bottom-0 left-0" />
                {/* Redes y svg de abajo */}
                <div className="absolute bottom-0  w-full ">
                  <div
                    className="bg-transparent absolute text-4xl w-full h-[70%] bottom-0
                   flex justify-evenly place-items-center text-[#4C3534] "
                  >
                    <span className="hover:text-white duration-500 cursor-pointer">
                      <BiLogoFacebookCircle />
                    </span>
                    <span className="hover:text-white duration-500 cursor-pointer">
                      <RiWhatsappFill />
                    </span>
                    <span className="hover:text-white duration-500 cursor-pointer">
                      <MdEmail />
                    </span>
                  </div>
                  <Svgbottom />
                </div>
              </div>
            </article>
          </section>
    
          {/* Dise;o del lado derecho */}
          <section className="w-[60%]   flex flex-col">
            <article className=" w-full h-[60%]   flex flex-col  items-end">
              {/* Menu de opciones */}
              <span className=" xl:w-[70%] md:w-full ">
                {/* <NavBarHome /> */}
              </span>
              <div className="w-full h-full ">
                {/* titulo y subtitulo */}
                <div className=" flex w-full justify-between items-center">
                  <h1 className=" font-alfa font-bold text-[3rem]    text-[#4C3534]">
                    Abarrotes <br /> Trujillo - <br /> Cono Web
                  </h1>
                  <span className="w-[20%]">
                    <SvgSparklesTwo />
                  </span>
                </div>
                <div className="w-full flex gap-40 ">
                  <p className="text-[#4C3534]/70 font-alfa ">
                    Descubre el Placer de Helados Caseros <br /> con Abarrotes
                    Trujillo - Cono Web
                  </p>
                  {/* Estes span solo es un circulo */}
                  <span className="w-8 h-8 bg-[#4C3534]/70 rounded-full" />
                </div>
              </div>
            </article>
            <article className="  w-full h-[40%] ">
              <div className="w-full h-full   ">
                {/* La gota color cafe */}
                <div className="w-full h-[40%] flex items-center justify-start gap-72 ">
                  <button
                    onClick={() => navigate("/client/dashboard")}
                    className="bg-[#4C3534]  text-white font-alfa  rounded-full   text-2xl font-bold px-4 p-2 mt-5 hover:scale-110  duration-500   hover:text-white hover:shadow-2xl"
                  >
                    Ordenar ahora
                  </button>
                  
                  <span className="hidden  md:hidden xl:w-20 xl:block ">
                    <SvgCircleDot />
                  </span>
                </div>
    
                {/* Svg de la monta;ita la paleta detras y el circulo de abajo */}
                <div className="w-full h-[60%] flex justify-evenly  items-end ">
                  {/* <span className="w-24 h-24 bg-[#4C3534] rounded-full" /> */}
                  <span className=" w-0 xl:w-24 md:w-0 ">
                    <SvgMiddleCircle />
                  </span>
    
                  <div className="w-[90%] md:w-[70%]  h-full relative ">
                    <span className="absolute right-0 -top-20 h-44  xl:h-44">
                      <ImagePopSicle />
                    </span>
                    <span className=" w-full h-full absolute bottom-0 right-0">
                      <SvgMountain />
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </section>
        </main>
      );}

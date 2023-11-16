import "./css/register.css";
// Logo de la empresa, png
import Logo from "../../public/logo.png";
// Mis svgs descargados
import { SvgBackgorundRegister, SvgRegister } from "../svgs/svg";
// Componentes personalizados
import { Button } from "../Components/Button";
import { UploadImage } from "../Components/UploadImage";
import { MyInput } from "../Components/MyInput";
// importar svgs de react icons
import { BsFillPersonFill } from "react-icons/bs";
import { MdAlternateEmail, MdPassword } from "react-icons/md";
import { useRegister } from "./hook/useRegister";
import { Loading } from "../Components/Loading";
// Hook personalizado para el registro de usuarios
export const Register = () => {
  const {
    changeInputs,
    name,
    email,
    password,
    confirmPass,
    selectedimage,
    setSelectedimage,
    register,
    loading,
  } = useRegister({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
    rol: 2,
    photo: "",
  });
  return (
    <main className="bg-white w-screen h-screen">
      {loading&&<Loading/>}
      <section className="w-full h-full  flex items-end  ">
        {/* Titulo cono web */}
        <div className="w-[20%] h-full flex items-center justify-center  ">
          <h1 className="text-[#329EC5] text-[5rem] tracking-widest font-extrabold  texto-vertical">
            Cono web
          </h1>
        </div>
        {/* Formulario logo y esferas */}
        <div className="w-[80%] h-full  relative ">
          {/* Svg azul */}
          <SvgBackgorundRegister />
          <section className="h-full w-[90%]  absolute right-0 flex flex-col">
            {/* Esferas */}
            <div className="h-[15%] w-full flex  justify-around">
              <svg
                className=""
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="30" cy="30" r="26" stroke="white" strokeWidth="8" />
              </svg>
              <SvgRegister />
            </div>
            {/* title (Restrarse), Form y logo de la empresa */}
            <div className="h-[85%] w-full  flex justify-center   items-center ">
              <section className="flex flex-col justify-center items-center gap-5   ">
                {/* Title */}
                <p className="text-[4rem]  text-white font-extrabold text-center">
                  Registrate
                </p>
                {/* Formulario  y el logo*/}
                <form className="mb-5 flex flex-col gap-5 mt-5  ">
                  <MyInput
                    arrowFunction={(e) => changeInputs(e)}
                    placeholder="Nombre"
                    name={"name"}
                    value={name}
                    type="text"
                    svg={<BsFillPersonFill />}
                  />
                  <MyInput
                    arrowFunction={(e) => changeInputs(e)}
                    name={"email"}
                    value={email}
                    placeholder="Correo electronico"
                    type="email"
                    svg={<MdAlternateEmail />}
                  />
                  <div className="flex gap-2">
                    <MyInput
                      arrowFunction={(e) => changeInputs(e)}
                      name={"password"}
                      value={password}
                      placeholder="Contraseña"
                      type="password"
                      svg={<MdPassword />}
                    />
                    <MyInput
                      arrowFunction={(e) => changeInputs(e)}
                      name={"confirmPass"}
                      value={confirmPass}
                      placeholder="Confirmar contraseña"
                      type="password"
                      svg={<MdPassword />}
                    />
                  </div>
                  {/*? TODO: Verificar si esta bien asi */}

                  <UploadImage
                    setSelectedimage={setSelectedimage}
                    image={selectedimage.urlImage}
                  />
                </form>
                {/* Span para adaptar tamanio del componetButton */}
                <span className="w-[70%] flex items-start justify-center">
                  <Button texttype={"Registrarse"} typefunction={register} />
                </span>
                {/* Boton de registro */}
                <div className="flex gap-2">
                  <p className="text-md">¿Ya tienes cuenta?</p>
                  <p className="text-md text-black font-bold cursor-pointer">
                    Iniciar sesión
                  </p>
                </div>
              </section>
              {/* logo */}
              <div className="h-80 w-64">
                <img src={Logo} className="h-full w-full animate-fadeIn" />
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

// importar el logo de la empresa
import { MdAlternateEmail, MdPassword } from "react-icons/md";
import Logo from "../../public/logo.png";
import { Button } from "../Components/Button";
import { MyInput } from "../Components/MyInput";
import { SvgLogin } from "../svgs/svg";
// Hook del login
import { useLogin } from "./hook/useLogin";
// Para poder navegar, react router dom
import { Link } from "react-router-dom";
export const Login = () => {
  const { logIn, changeInputs, email, password, loading } = useLogin({
    email: "",
    password: "",
    rol: "",
  });

  return (
    <main className="bg-white w-screen h-screen">
      {loading == true && (
        <section className="z-20  bg-black/40 w-screen h-screen absolute flex items-center justify-center">
          <span className="animate-spin w-40 h-40 rounded-full border-2 border-x-4 border-black/80 "></span>
        </section>
      )}
      <section className="w-full h-full flex items-center justify-end">
        <div className=" flex w-full h-full  ">
          <div className=" h-full w-[50%] ">
            {/* Logo, circulos y barritas */}
            <div className=" w-full h-[30%] relative ">
              <img
                className="xl:h-40 md:h-40 h-32 absolute bottom-0 left-2 animate-fadeIn"
                src={Logo}
                alt=""
              />
              <span className=" md:block xl:block hidden  w-14 h-14 absolute bottom-0 left-[30%]  border-[8px] border-[#329EC5] rounded-full"></span>
              <span className="  w-40 h-40 absolute -top-20 left-[30%]  border-[8px] border-[#329EC5] rounded-full"></span>
              <span className=" md:block xl:block hidden  w-14 h-14 absolute bottom-[40%] right-[30%]  border-[8px] border-[#329EC5] rounded-full"></span>
              <div className="flex flex-col gap-4 absolute bottom-[20%] right-0">
                <span className="h-1 w-32 ml-8   border-[5px] border-[#329EC5] "></span>
                <span className="h-1 w-32 mr-ml-8   border-[5px] border-[#329EC5] "></span>
              </div>
            </div>
            {/* nombre y boton de  registro */}
            <div className=" w-full h-[70%] flex flex-col items-center justify-around ">
              <h1 className=" text-[3rem]  xl:text-[6rem]  md:text-[4rem]  text-[#329EC5] font-extrabold   tracking-widest">
                Cono web
              </h1>
              <Link to={"/auth/register"}>
                <Button texttype={"Registrarse"} typefunction={() => {}} />
              </Link>
            </div>
          </div>
          <div className="h-full w-[50%] relative">
            <SvgLogin />
            <section className="absolute  w-[70%] h-full right-0 flex  flex-col  items-center justify-center">
              <div>
                <p className="text-white md:text-[2.5rem] xl:text-[4rem] font-bold text-center mb-5">
                  Iniciar sesión
                </p>
              </div>
              <form className=" flex flex-col w-[90%]  gap-4">
                <MyInput
                  arrowFunction={(e) => changeInputs(e)}
                  value={email}
                  name={"email"}
                  placeholder="Correo electronico"
                  type="email"
                  svg={<MdAlternateEmail />}
                />
                <MyInput
                  arrowFunction={(e) => changeInputs(e)}
                  name={"password"}
                  value={password}
                  placeholder="Contraseña"
                  type="password"
                  svg={<MdPassword />}
                />{" "}
              </form>
              <Button texttype={"Iniciar sesion"} typefunction={logIn} />
              <p className="text-black font-bold mt-10 text-xl cursor-pointer hover:scale-105 duration-500">
                ¿Olvidaste tu contraseña?
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
};

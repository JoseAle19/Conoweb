//Hooks de react
import { useContext, useState } from "react";
// Librerua de las alertas
import Swal from "sweetalert2";
// para mantener el estado de la aplicacion
import { AuthContext } from "../../context/context";
// Servicio, las peticiopnes http
import { useform } from "../../hooks/useform";
// Validar el correo que solo sean correos
import { validators } from "../../utils/validateinput";
import { serviceApi } from "../../service/api";
export const useLogin = (initialForm = {}) => {
  const [loading, setLoading] = useState(null);
  // Ejecutar el login del context
  const { login } = useContext(AuthContext);
  // Lo que retorna el hook personalizado de formularios, pero nos pide el
  const { changeInputs, formState } = useform(initialForm);

  // Validadadores de campos etc
  const { validateemail, validatenputs } = validators();

  const { email, password } = formState;
  const logIn = async (e) => {
    e.preventDefault();
    if (validatenputs(email, password)) {
      return Swal.fire({
        title: "Error",
        text: "Ni un campo debe de estar vacio",
        icon: "warning",
      });
    }

    if (!validateemail(email)) {
      return Swal.fire({
        title: "Error",
        text: "El correo no es valido",
        icon: "warning",
      });
    } else {
      setLoading(true);
      // Guardamos en data lo que nos retorne la peticion, o bien lo que traiga el json
      // Los datos los mandaremos en formda de formdata
      
      
      
      let formdata = new FormData();
      formdata.append("email", formState.email);
      formdata.append("password", formState.password);

      const data = await serviceApi("auth/login/", formdata, "POST");
      setLoading(false);
      if (!data.status) {
        return Swal.fire({
          title: "Error",
          icon: "error",
          text: data.message,
        });
      }
      // Este login (funtion) es del context que recibe como parametros, un user y el token del usuario
      login(data.user, JSON.stringify(data.user));
    }
  };

  return {
    logIn,
    changeInputs,
    email,
    password,
    loading,
  };
};

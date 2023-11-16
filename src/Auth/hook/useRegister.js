import { useContext, useState } from "react";
// Hook de formulario
import { useform } from "../../hooks/useform";
// Importar las alertas de swwtalert
import Swal from "sweetalert2";
// contexto de la ap;app
import { AuthContext } from "../../context/context";
// validar los inputs
import { validators } from "../../utils/validateinput";
// servicio de la api
import { serviceApi } from "../../service/api";
// Importar el hook de navegacion
import { useNavigate } from "react-router-dom";
export const useRegister = (initialForm = {}) => {
  // Manajer el estado de la peticion con un loading
  const [loading, setLoading] = useState(false);
  // register del context
  const { registerUser } = useContext(AuthContext);
  const { formState, changeInputs } = useform(initialForm);
  // para manejar las imagenes
  const [selectedimage, setSelectedimage] = useState({
    urlImage: "",
    imageFile: "",
  });
  const { validateemail, validatenputs } = validators();
  const { name, email, password, confirmPass, rol, photo } = formState;

  // Hook de navegacion
  const navigate = useNavigate();
  const register = async (e) => {
    // Enviar los datos que nos pide la api, este es el body
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("rol_id", rol);
    formdata.append("photo", selectedimage.imageFile);
    e.preventDefault();

    if (validatenputs(name, email, password, confirmPass)) {
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
    }
    if (password !== confirmPass) {
      return Swal.fire({
        title: "Error",
        text: "Las contraseñas no coinciden",
        icon: "error",
      });
    }

    if (selectedimage.urlImage === "") {
      return Swal.fire({
        title: "¿Seguro?",
        text: "Seguro que no quieres agregar una foto de perfil",
        icon: "question",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "No, agregar foto",
        confirmButtonText: "Si, no agregar foto",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setLoading(true);
            const response = await serviceApi(
              "auth/register",
              formdata,
              "POST"
            );
            if (!response.status) {
              return Swal.fire({
                title: "Error",
                icon: "error",
                text: response.message,
              });
            }
              navigate("/auth");
            return Swal.fire({
              icon: "success",
              title: `Bienvenido ${name}`,
              showConfirmButton: false,
              timer: 1500,
            });
          } catch (error) {
            return Swal.fire({
              title: "Error",
              icon: "error",
              text: `Ocurrio un error}`,
            });
          } finally {
            setLoading(false);
          }
        }
      });
    }
    // Antes de hacer la peticion al servidor ponemos el loading en true
    try {
      setLoading(true);
      const response = await serviceApi("auth/register", formdata, "POST");
      console.log("response", response);

      if (response.status) {
        navigate("/auth/");
        return Swal.fire({
          icon: "success",
          title: `Bienvenido ${name}`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        return Swal.fire({
          title: "Error",
          icon: "error",
          text: `Ocurrio un error`,
        });
      }
    } catch (error) {
      console.log(error);
      return Swal.fire({
        title: "Error",
        icon: "error",
        text: `Ocurrio un error ${error}}`,
      });
    } finally {
      // Que el proceso de la peticion termine ponemos el  loading en false
      setLoading(false);
    }
  };

  return {
    changeInputs,
    formState,
    name,
    email,
    password,
    confirmPass,
    rol,
    photo,
    selectedimage,
    setSelectedimage,
    register,
    loading,
  };
};

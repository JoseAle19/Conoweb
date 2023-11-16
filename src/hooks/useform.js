import { useState } from "react";

export const useform = (initialForm) => {
  const [formState, setFormState] = useState(initialForm);
  const changeInputs = ({ target }) => {
    const { value, name } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const changeInputsSelect = (e, field) => {

    const {name, value } = e.target
    
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const uploadImage = (e) => {
    const regex = /^.*\.(jpg|jpeg|png)$/i; // La 'i' después de '$' hace que la coincidencia sea insensible a mayúsculas y minúsculas
    const fileType = e.target.files[0].name;
    if (!regex.test(fileType)) {
      return {
        status: false,
        message: "El archivo seleccionado no es una imagen",
      };
    } else {
      const urlImage = URL.createObjectURL(e.target.files[0]);
      const imageFile = e.target.files[0];
      setFormState({
        ...formState,
        image: { urlImage, imageFile },
      });
      return { status: true };
    }
  };

  const clearForm = () => {
    setFormState(initialForm);
  };
  return {
    formState,
    changeInputs,
    changeInputsSelect,
    uploadImage,
    clearForm
  };
};

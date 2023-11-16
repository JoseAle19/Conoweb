// Hook personalizado para el formulario de productos
import { useform } from "../../../hooks/useform";
// Importar alertas de sweetalert2
import Swal from "sweetalert2";
import { useState } from "react";
import { useProductContext } from "../../../context/productContext";
export const useProduct = (initialForm) => {
  const {
    products,
    suppliers,
    categories,
    updateProduct,
    createProduct: createProductContext,
    deleteProduct: deleteProductContext,
  } = useProductContext();
  //Hook de formularios
  const {
    changeInputs,
    changeInputsSelect,
    formState,
    uploadImage,
    clearForm,
  } = useform(initialForm);

  //* useStates para las actualizaciones
  const [isSelectedProductId, setIsSelectedProductId] = useState(null);

  const handleUploadImage = (e) => {
    // esperamos la respuesta de la funcion de la imagen
    const res = uploadImage(e);
    if (!res.status) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: res.message,
      });
    }
  };
  // Crear el producto, mandar los datos al servidor
  const createProduct = async (e) => {
    // Validar que no se envie el formulario vacio
    const res = await createProductContext(formState);
    e.preventDefault();
    const {
      name,
      description,
      quantity,
      image,
      price,
      unit,
      supplier,
      category,
    } = formState;

    // Validar que los campos no esten vacios
    if (
      name.trim() === "" ||
      description.trim() === "" ||
      quantity.trim() === "" ||
      unit.trim() === "" ||
      price.trim() === "" ||
      // proveedor y categoria son enteros
      supplier === "" ||
      category === ""
    ) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Todos los campos son obligatorios",
      });
    }

    if (res.status === false) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: res.message,
      });
    } else {
      clearForm();
      Swal.fire({
        icon: "success",
        title: "Producto creado con exito",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  // Validar ya selecciono el tipo de unidad de producto antes de colocar el precio del producto
  const validateUnit = () => {
    //  validar si ya a seleccionado una unidad
    if (formState.unit === "") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe seleccionar una unidad",
      });
    }
  };

  // Eliminar producto
  const serviceAndDeleteProduct = async (id) => {
    const res = await deleteProductContext(id);

    if (!res.status) {
      return Swal.fire({
        title: "Error al eliminar el producto",
        text: res.message,
        icon: "error",
      });
    } else {
      return Swal.fire({
        title: "Producto eliminado",
        text: res.message,
        icon: "success",
      });
    }
  };
  // Alerta  antes de eliminar el producto
  const deleteProduct = (IdProduct) => {
    Swal.fire({
      title: "Seguro quiere remover este producto?",
      text: "No podras revertir cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        serviceAndDeleteProduct(IdProduct);
      }
    });
  };

  // Funciones para manejar la actualizaciones
  const handleIsUpdating = (id) => {
    setIsSelectedProductId(id);
    clearForm();
  };
  const handleIsUpdatingCancel = () => {
    setIsSelectedProductId(null);
    clearForm();
  };

  // Alerta de actualizar
  const handleUpdateProduct = (id, newProduct) => {

    const res = updateProduct(id, newProduct);
    if (res.status === false) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error al actualizar el producto',
        text: res.message,
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto actualizado',
        showConfirmButton: false,
        timer: 1500
      })
      
    }
    handleIsUpdatingCancel();
  };

  return {
    suppliers,
    categories,
    changeInputs,
    changeInputsSelect,
    formState,
    handleUploadImage,
    createProduct,
    validateUnit,
    products,
    deleteProduct,
    // Actualizaciones
    handleIsUpdating,
    isSelectedProductId,
    handleIsUpdatingCancel,
    handleUpdateProduct,
  };
};

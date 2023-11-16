import { useShoppingCartContext } from "../context/CartContext";
//Alertas de sweet
import Swal from "sweetalert2";
export const useCart = () => {
  const { checkOut, clearCartAll } = useShoppingCartContext();

  const buyProducts = async (form, products) => {
    
    const { status, message } = await checkOut(form, products);
    if (status) {
        Swal.fire({
            title: message,
            text: "Revisar historial de compras",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ver historial de compras'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Navegar a historial de compras',
                'Your file has been deleted.',
                'success'
              )
            }
          })
        clearCartAll();
    } else {    
        Swal.fire({
            icon: "warning",
            title: "No se pudo completar el pedido",
            text: message,
        });
    }
  };
  return {
    buyProducts,
  };
};

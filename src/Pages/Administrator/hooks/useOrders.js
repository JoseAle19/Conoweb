import { useOrdersAdminContext } from "../context/OrdersAdmin";
import Swal from "sweetalert2";
export const useOrders = () => {
  const { getAllOrders, orders, loading  } = useOrdersAdminContext();

  const getOrders = () => {
    getAllOrders();
  };

  const acceptOrder = ({id, products}) =>{
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¿Quieres aceptar esta orden?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, aceptar",
      confirmButtonColor: "#3085d6",
      cancelButtonText: "No, cancelar",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('products', products);
        
        Swal.fire("¡Orden aceptada!", "", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelado", "", "error");
      }
    });
  }
  const cancelOrder = () =>{

  }


  return {
    getOrders,
    orders, loading, acceptOrder, cancelOrder
  };
};

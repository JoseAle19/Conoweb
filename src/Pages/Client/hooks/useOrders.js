import { useOrdersContext } from "../context/OrdersContex";
// impoer hook de navegacion
import { useNavigate } from "react-router-dom";
export const useOrders = () => {
  const navigate = useNavigate();
  const { getOrders, orders:ordersContext, loading } = useOrdersContext();
    const orders = () =>{
      getOrders()
    }


    const navProducts =() =>{
      navigate("/products")
    }
  return {
    loading,
    orders,
    ordersContext,
    navProducts
  };
};

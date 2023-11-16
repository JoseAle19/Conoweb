// Se importan las librerias y dependencias de react
import { createContext, useContext, useReducer } from "react";
import { serviceApi } from "../../../service/api";
import { types } from "../../../context/types";

// Se crea el contexto para el carrito de compras
const OrdersContext = createContext(null);

export const useOrdersContext = () => {
  return useContext(OrdersContext);
};

const OrderReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;
  switch (actionType) {
    case types.getAllOrders:
      return{
        ...state,
        orders: actionPayload
      }
    case types.setLoading:
      return{
        ...state,
        loading: actionPayload
      }
    case types.setError:
      return{
        ...state,
        error:actionPayload
      }

  
    default:
      break;
  }
};

const initialState = {
  orders: [],
  loading: false,
  error:''
};
// Se crea el provider para las ordenes
export const OrdersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OrderReducer, initialState);

  const getOrders = async () => {
    // id del usuario loggeado
    const {id} = JSON.parse(localStorage.getItem("token"))
    try {
      dispatch({
        type: types.setLoading,
        payload: true,
      });
      const {status, message, count_orders, orders} = await serviceApi(
        `order/getByUser/${id}`,
        {},
        "GET"
      );
      if (status) {
        dispatch({
          type: types.getAllOrders,
          payload: orders,
        });
      } else {
        dispatch({
          type: types.getAllOrders,
          payload: [],
        });
      }
    } catch (e) {
      dispatch({
        type:types.setError,
        payload: `Error al consultar ${e}`
      })
    
    } finally {
      dispatch({
        type: types.setLoading,
        payload: false,
      });
    }
  };

  return (
    <OrdersContext.Provider
      value={{
        getOrders,
        ...state,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

import { createContext, useContext, useReducer } from "react";
import { types } from "../../../context/types";
import { serviceApi } from "../../../service/api";

const OrdersAdminContext = createContext();

export const useOrdersAdminContext = () => {
  return useContext(OrdersAdminContext);
};

// Crear reducer
const ordersAdminReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;

  switch (actionType) {
    case types.getAllOrders:
        return {
            ...state,
            orders: actionPayload
        }
    case types.setLoading:
        return {
            ...state,
            loading: actionPayload
        }
    case types.setError:
        return {
            ...state,
            error: actionPayload
        }
    default:
      break;
  }
};

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const OrdersAdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ordersAdminReducer, initialState);

  const getAllOrders = async () => {
    try {
      dispatch({
        type: types.setLoading,
        payload: true,
      });
      const resOrders = await serviceApi("order/getAll", {}, "GET");
      if (resOrders.status) {
        dispatch({
          type: types.getAllOrders,
          payload: resOrders?.orders,
        });
        return {
          status: true,
        };
      } else {
        return {
          status: false,
        };
      }
    } catch (error) {
      dispatch({
        type: types.setError,
        payload: error,
      });
    } finally {
      dispatch({
        type: types.setLoading,
        payload: false,
      });
    }
  };


  const checkOutStock = () =>{
    
  }
  return (
    <OrdersAdminContext.Provider
      value={{
        ...state,
        getAllOrders,
      }}
    >
      {children}
    </OrdersAdminContext.Provider>
  );
};

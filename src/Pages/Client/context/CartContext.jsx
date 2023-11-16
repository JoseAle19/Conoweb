import {  createContext, useContext, useReducer } from "react";
import { types } from "../../../context/types";
import { serviceApi } from "../../../service/api";
import Swal from "sweetalert2";

const ShoppingCartContext = createContext(null);

export const useShoppingCartContext = () => {
  return useContext(ShoppingCartContext);
};

const CartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;

  switch (actionType) {
    case types.addProductToCart:
      return {
        ...state,
        products: [...state.products, actionPayload],
      };

    case types.updateProducts:
      return {
        ...state,
        products: actionPayload,
      };

    case types.setLoadingCheckOut:
      return {
        ...state,
        loading: actionPayload,
      };
    case types.clearCart:
      return {
        ...state,
        products: actionPayload,
      };
    default:
      break;
  }
};

// Estado inicial para el carrito de compras
const initialState = {
  products: [],
  total: 0,
  loading: false,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);
  const { products } = state;

  const addProductCart = (product) => {
    const { id, product_name, product_image, category_name, product_price } =
      product;

    const cartProduct = {
      id,
        image: product_image,
      name: product_name,
      category: category_name,
      quantity: 1,
      price: product_price,
      total: 1 * product_price,
    };
    const productExist = products.find((prod) => prod.id === product.id);

    if (productExist) {
      //Nuevo arreglo si para modificar la cantidad de los productos
      const updateProducts = products.map((prod) => {
        //Si el producto existe en el carrito de compras se mdifica la cantidad
        if (prod.id === product.id) {
          return {
            ...prod,
            total: prod.price * (prod.quantity + 1),
            quantity: prod.quantity + 1,
          };
        }
        return prod;
      });

      dispatch({
        type: types.updateProducts,
        payload: updateProducts,
      });
    } else {
      dispatch({
        type: types.addProductToCart,
        payload: cartProduct,
      });
    }
  };

  const deleteProductCart = (id) => {
    const findProduct = products.find((prod) => prod.id === id);
    const deleteProduct = products.filter((prod) => prod.id !== id);
    if (findProduct.quantity === 1) {
      dispatch({
        type: types.updateProducts,
        payload: deleteProduct,
      });
    } else {
      const updateProducts = products.map((prod) => {
        //Si el producto existe en el carrito de compras se mdifica la cantidad
        if (prod.id === id) {
          return {
            ...prod,
            total: prod.price * (prod.quantity - 1),
            quantity: prod.quantity - 1,
          };
        }
        return prod;
      });
      dispatch({
        type: types.updateProducts,
        payload: updateProducts,
      });
    }
  };

  const checkOut = async ({ note_customer }, products) => {
    const { id } = JSON.parse(localStorage.getItem("token"));

    const formData = new FormData();

    formData.append("status_order", "pending");
    formData.append("number_order", "uuid()");
    formData.append("discounts", "0");
    formData.append("note_customer", note_customer);
    formData.append("id_costumer", id);
    formData.append("products", JSON.stringify(products));
    try {
      dispatch({
        type: types.setLoadingCheckOut,
        payload: true,
      });
      const data = await serviceApi("order/add-order", formData, "POST");
      if (data.status) {
        return {
          status: true,
          message: "Gracias por tu compra",
        };
      } else {
        return {
          status: false,
          message: "Error al realizar la compra",
        };
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({
        type: types.setLoadingCheckOut,
        payload: false,
      });
    }
  };


  const clearCartAll = () => {
    dispatch({
      type: types.clearCart,
      payload: [],
    });
  }
  return (
    <ShoppingCartContext.Provider
      value={{
        ...state,
        addProductCart,
        deleteProductCart,
        checkOut,
        clearCartAll
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

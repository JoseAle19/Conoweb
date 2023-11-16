import { createContext, useContext, useReducer } from "react";
import { types } from "./types";
import { serviceApi } from "../service/api";
//Id unicos universales
import { v4 as uuidv4 } from "uuid";
const ProductContext = createContext(null);

export const useProductContext = () => {
  return useContext(ProductContext);
};

const ProductReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;
  switch (actionType) {
    case types.getAllProducts:
      return {
        ...state,
        loading: false,
        products: actionPayload,
      };
    case types.getAllUnits:
      return {
        ...state,
        units: actionPayload,
      };

    case types.createNewProduct:
      return {
        ...state,
        products: [...state.products, actionPayload],
      };
    case types.deleteProduct:
      return {
        ...state,
        products: actionPayload,
      };
    case types.updateProducts:
      return {
        ...state,
        products: actionPayload,
      };
    case types.setError:
      return {
        ...state,
        error: actionPayload,
      };
    case types.getAllCategories:
      return {
        ...state,
        categories: actionPayload,
      };
    case types.getAllSuppliers:
      return {
        ...state,
        suppliers: actionPayload,
      };
    case types.setLoading:
      return {
        ...state,
        loading: actionPayload,
      };
    default:
      break;
  }
};

const initialState = {
  products: [],
  units: [],
  categories: [],
  suppliers: [],
  loading: true,
  error: null,
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, initialState);

  // Desestructurar el objeto con los array
  const { products, categories, suppliers, units } = state;

  // Arreglo de errores
  const errors = [];
  const getAllProducts = async () => {
    try {
      dispatch({
        type: types.setLoading,
        payload: true,
      });

      const resProducts = await serviceApi("products/list-products", {}, "GET");

      if (resProducts.status) {
        const { products } = resProducts;
        const productsWithUuid = products.map((product) => ({
          ...product,
          uuid: uuidv4(),
        }));
        dispatch({
          type: types.getAllProducts,
          payload: productsWithUuid,
        });
      } else {
        errors.push(resProducts.message);
      }

      const resCategories = await serviceApi("category/list", {}, "GET");
      // Obtener categorías
      if (resCategories.status) {
        dispatch({
          type: types.getAllCategories,
          payload: resCategories.categories,
        });
      } else {
        errors.push("Error al obtener categorías.");
      }
      const resSuppliers = await serviceApi("supplier/list", {}, "GET");
      //  Proveedores
      if (resSuppliers.status) {
        dispatch({
          type: types.getAllSuppliers,
          payload: resSuppliers.suppliers,
        });
      } else {
        errors.push("Error al obtener proveedores.");
      }

      // Obtener unidades
      const resUnits = await serviceApi("units/list", {}, "GET");
      //  Proveedores
      if (resSuppliers.status) {
        dispatch({
          type: types.getAllUnits,
          payload: resUnits.units,
        });
      } else {
        errors.push("Error al obtener las unidades.");
      }

      if (errors.length > 0) {
        dispatch({ type: types.setError, payload: errors });
      }
    } catch (error) {
      dispatch({
        type: types.setError,
        payload: "Error al obtener datos: " + error.message,
      });
    } finally {
      dispatch({ type: types.setLoading, payload: false });
    }
  };

  const updateProduct = async (id, newProduct) => {
    // Validar si el objeto viene vascio
    function validateObject(myObject = {}) {
      return Object.keys(myObject).length === 0;
    }

    const {
      name,
      description,
      supplier,
      category,
      quantity,
      unit,
      image,
      price,
    } = newProduct;
    // Filtro de array de proveedores
    const updateSupplier = suppliers.find(
      (supplierFIlter) => supplierFIlter.id.toString() === supplier.toString()
    );
    // Filtramos con el array de las categorias
    const updateCategory = categories.find(
      (categoryFIlter) => categoryFIlter.id.toString() === category.toString()
    );
    //Filtrar por las unidades de medida
    const updateUnit = units.find(
      (unitsFIlter) => unitsFIlter.id.toString() === unit.toString()
    );
    const updatedProduct = products.map((product) => {
      if (product.id === id) {
        return {
          id: id,
          product_name: name || product.product_name,
          product_description: description || product.product_description,
          product_quantity: quantity || product.product_quantity,
          product_image: validateObject(image) ? product.product_image : image,
          product_unit: updateUnit?.name || product.product_unit,
          product_price: price || product.product_price,
          category_id: updateCategory?.id || product.category_id,
          category_name: updateCategory?.name || product.category_name,
          supplier_id: updateSupplier?.id || product.supplier_id,
          supplier_name: updateSupplier?.name || product.supplier_name,
          supplier_contact_name:
            updateSupplier?.contact_name || product.supplier_contact_name,
          supplier_phone: updateSupplier?.phone || product.supplier_phone,
          supplier_company_name:
            updateSupplier?.company_name || product.supplier_company_name,
        };
      }
      return product;
    });

    const formData = new FormData();

    formData.append("id", id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("id_unit", unit);
    formData.append("price", price);
    formData.append("photo", image.imageFile);
    formData.append("id_category", category);
    formData.append("id_supplier", supplier);

    dispatch({ type: types.setLoading, payload: true });
    const { status, message } = await serviceApi(
      "products/update-product",
      formData,
      "POST"
    );
    dispatch({ type: types.setLoading, payload: false });
    if (!status) {
      return {
        status,
        message,
      };
    } else {
      dispatch({
        type: types.updateProducts,
        payload: updatedProduct,
      });
      return {
        status,
        message,
      };
    }
  };

  const createProduct = async (newProduct) => {
    const {
      name,
      description,
      supplier,
      category,
      quantity,
      unit,
      image,
      price,
    } = newProduct;
    // Filtro de array de proveedores
    const newSupplier = suppliers.find(
      (supplierFIlter) => supplierFIlter.id.toString() === supplier.toString()
    );
    // Filtramos con el array de las categorias
    const newCategory = categories.find(
      (categoryFIlter) => categoryFIlter.id.toString() === category.toString()
    );
    //Filtrar por las unidades de medida
    const newUnit = units.find(
      (unitsFIlter) => unitsFIlter.id.toString() === unit.toString()
    );



    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("id_unit", unit);
    formData.append("price", price);
    formData.append("photo", image.imageFile);
    formData.append("category", category);
    formData.append("supplier", supplier);

    dispatch({
      type: types.setLoading,
      payload: true,
    });
    const resCreateProduct = await serviceApi(
      "products/add-product",
      formData,
      "POST"
    );
    dispatch({
      type: types.setLoading,
      payload: false,
    });
    const { status, id } = resCreateProduct;
    if (!status) {
      return {
        status: false,
        message: "Error al crear el producto",
      };
    } else {
      formData.forEach((key) => {
        formData.delete(key);
      });

      const product = {
        id, 
        uuid:uuidv4(),
        product_name: name,
        product_description: description,
        product_quantity: quantity,
        product_image: image?.urlImage,
        product_unit: newUnit?.name,
        product_price: price,
        category_id: newCategory?.id,
        category_name: newCategory?.name,
        supplier_id: newSupplier?.id,
        supplier_name: newSupplier?.name,
        supplier_contact_name: newSupplier?.contact_name,
        supplier_phone: newSupplier?.phone,
        supplier_company_name: newSupplier?.company_name,
      };



      dispatch({
        type: types.createNewProduct,
        payload: product,
      });
      return {
        status: true,
        message: "Producto creado con exito",
      };
    }
  };

  const deleteProduct = async (id) => {
    const newStateProducts = products.filter(
      (product) => product.id?.toString() !== id?.toString()
    );
    const formData = new FormData();
    formData.append("id", id);
    const resDeleteProduct = await serviceApi(
      "products/delete-product",
      formData,
      "POST"
    );
    if (!resDeleteProduct.status) {
      return resDeleteProduct;
    } else {
      dispatch({
        type: types.deleteProduct,
        payload: newStateProducts,
      });
      return resDeleteProduct;
    }
  };
  return (
    <ProductContext.Provider
      value={{
        ...state,
        getAllProducts,
        updateProduct,
        createProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

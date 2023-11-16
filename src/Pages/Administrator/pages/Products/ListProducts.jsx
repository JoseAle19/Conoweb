import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { useProduct } from "../../hooks/useProduct";

// importar mi select personalizado
import { Select } from "../../../../components/Select";
// Iconos de react icons
import { MdCancel } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";
const TABLE_HEAD = [
  "imagen",
  "Nombre",
  "Descripción",
  "Cantidad",
  "Tipo de unidad",
  "Precio",
  "Categoría",
  "Proveedor",
  "",
  "",
];

import { Loading } from "../../../../Components/Loading";
import { useProductContext } from "../../../../context/productContext";

export function ListProducts() {
  const { products, loading, categories, suppliers, units } =
    useProductContext();

  const {
    // products,
    deleteProduct,
    handleIsUpdating,
    isSelectedProductId,
    formState,
    changeInputs,
    changeInputsSelect,
    handleIsUpdatingCancel,
    handleUpdateProduct,
  } = useProduct({
    name: "",
    description: "",
    supplier: "",
    category: "",
    quantity: "",
    unit: "",
    image: {},
    price: "",
  });

  const {
    name,
    description,
    supplier,
    category,
    quantity,
    unit,
    image,
    price,
  } = formState;
  return (
    <div className="relative h-full w-full">
      {loading ?? <Loading />}
      <Card className="h-full w-full p-4 absolute top-0 left-0 z-10">
        <CardHeader floated={false} shadow={false} className="rounded-none ">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                {loading ? "cargando" : "Productos"}
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Productos registrados en el sistema de Conoweb {products.length}
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  disabled={products.length === 0 ? true : false}
                  type="text"
                  label="Buscar"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="  h-full px-0 overflow-auto style-scroll ">
          <table className="w-full table-auto text-left  ">
            <thead className="">
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head + index}
                    className="border-y border-blue-gray-100 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="relative  overflow-x-auto">
              {/* sin no hay datos */}
              {products.length === 0 ? (
                <tr>
                  <td>
                    <div className=" absolute w-full  flex flex-col items-center justify-center ">
                      <Typography variant="h5" color="blue-gray">
                        No hay datos
                      </Typography>
                      <Typography variant="h6" color="blue-gray">
                        No se encontraron datos
                      </Typography>
                    </div>
                  </td>{" "}
                </tr>
              ) : null}
              {products.map(
                (
                  {
                    uuid,
                    id,
                    product_name,
                    product_description,
                    product_quantity,
                    product_image,
                    product_unit,
                    product_price,
                    category_name,
                    supplier_name,
                  },
                  index
                ) => {
                  // generar un id unico
                  const key = `${id}-${product_name}`;
                  const isLast = index === products.length - 1;
                  const evenTr = index % 2 === 0;
                  const trClasses = evenTr
                    ? `${"bg-blue-50"} `
                    : `${"bg-white"}`;
                  const tdClasses = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-200";
                  return (
                    <tr
                      className={`${
                        isSelectedProductId === uuid
                          ? "bg-gray-200 animate-fadeIn  "
                          : trClasses
                      }`}
                      key={key}
                    >
                      <td className={tdClasses}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={
                              product_image
                                ? product_image
                                : "http://www.higieneplus.com.ar/wp-content/themes/higieneplus/images/producto-sin-foto-ficha.jpg"
                            }
                            alt={product_name}
                            size="xl"
                            className="border rounded-full border-blue-gray-50 bg-blue-gray-50/50 object-cover p-1 "
                          />
                        </div>
                      </td>
                      {/* nombre del producto */}
                      <td className={tdClasses}>
                        <Typography variant="small" color="blue-gray">
                          {isSelectedProductId === uuid ? (
                            <input
                              type="text"
                              name="name"
                              value={name}
                              onChange={changeInputs}
                              className="border-2 w-auto p-2 border-gray-300 bg-white h-10  rounded-lg "
                              placeholder="Nombre del producto"
                            />
                          ) : (
                            product_name
                          )}
                        </Typography>
                      </td>
                      {/* Descripcion */}
                      <td className={tdClasses}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className=""
                        >
                          {isSelectedProductId === uuid ? (
                            <textarea
                              type="text"
                              name="description"
                              value={description}
                              onChange={changeInputs}
                              className="border-2 w-auto p-2 border-gray-300 bg-white h-20  rounded-lg style-scroll "
                              placeholder="Descripción del producto"
                            />
                          ) : (
                            product_description
                          )}{" "}
                        </Typography>
                      </td>
                      <td className={tdClasses}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className=""
                        >
                          {isSelectedProductId === uuid ? (
                            <input
                              type="number"
                              name="quantity"
                              value={quantity}
                              onChange={changeInputs}
                              className="border-2 w-auto p-2 border-gray-300 bg-white h-10  rounded-lg "
                              placeholder="Cantidad"
                            />
                          ) : (
                            product_quantity
                          )}
                        </Typography>
                      </td>
                      <td className={tdClasses}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className=""
                        >
                          {isSelectedProductId === uuid ? (
                            // TODO: arreglar el selct
                            <Select
                              name="unit"
                              value={unit}
                              options={units}
                              initial="Unidad de medida"
                              callBack={changeInputsSelect}
                            />
                          ) : (
                            product_unit
                          )}{" "}
                        </Typography>
                      </td>
                      <td className={tdClasses}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className=""
                        >
                          {isSelectedProductId === uuid ? (
                            <input
                              type="number"
                              name="price"
                              value={price}
                              onChange={changeInputs}
                              className="border-2 w-auto p-2 border-gray-300 bg-white h-10  rounded-lg "
                              placeholder="Precio"
                            />
                          ) : (
                            product_price
                          )}{" "}
                        </Typography>
                      </td>
                      <td className={tdClasses}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className=""
                        >
                          {isSelectedProductId === uuid ? (
                            <Select
                              name="category"
                              value={category}
                              options={categories}
                              initial="Categoria"
                              callBack={changeInputsSelect}
                            />
                          ) : (
                            category_name
                          )}
                        </Typography>
                      </td>
                      <td className={tdClasses}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className=""
                        >
                          {isSelectedProductId === uuid ? (
                            <Select
                              name="supplier"
                              value={supplier}
                              options={suppliers}
                              initial="Proveedor"
                              callBack={changeInputsSelect}
                            />
                          ) : (
                            supplier_name
                          )}{" "}
                        </Typography>
                      </td>
                      <td className={tdClasses}>
                        <Tooltip content={`Editar ${product_name} `}>
                          <IconButton
                            onClick={() =>
                              isSelectedProductId === uuid
                                ? handleUpdateProduct(id, formState)
                                : handleIsUpdating(uuid)
                            }
                            variant="text"
                          >
                            {
                              // si el id del producto es igual al id seleccionado
                              isSelectedProductId === uuid ? (
                                <AiFillCheckCircle
                                  color="black"
                                  className="h-6 w-6"
                                />
                              ) : (
                                <PencilIcon
                                  color="purple"
                                  className="h-6 w-6"
                                />
                              )
                            }
                          </IconButton>
                        </Tooltip>
                      </td>
                      <td className={tdClasses}>
                        <Tooltip content={`Eliminar ${product_name} `}>
                          <IconButton
                            onClick={() =>
                              isSelectedProductId === uuid
                                ? handleIsUpdatingCancel()
                                : deleteProduct(id)
                            }
                            variant="text"
                          >
                            {
                              // si el id del producto es igual al id seleccionado
                              isSelectedProductId === uuid ? (
                                <MdCancel color="black" className="h-6 w-6" />
                              ) : (
                                <TrashIcon color="red" className="h-6 w-6" />
                              )
                            }
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

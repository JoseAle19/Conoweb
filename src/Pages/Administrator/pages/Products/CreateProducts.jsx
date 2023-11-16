import { useEffect } from "react";
// IMportar icono de camara
import { AiFillCamera } from "react-icons/ai";
// Alertas de Swal
import { useProduct } from "../../hooks/useProduct";
//  Importar mi select
import { Select } from "../../../../components/Select";
import { Loading } from "../../../../Components/Loading";
import { useProductContext } from "../../../../context/productContext";
export const CreateProducts = () => {
  const { categories, suppliers, units, loading } = useProductContext();

  const {
    formState,
    changeInputs,
    changeInputsSelect,
    handleUploadImage,
    createProduct,
    validateUnit,
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
    quantity,
    image,
    price,
    unit,
    category,
  } = formState;

  return (
    <div className="w-full h-full flex p-2 items-center gap-3 ">
      {/* Loading de cargando  */}
      {loading && <Loading />}
      {/* Detalles, categoria, etc..... */}
      <section className="w-full h-full bg-white flex flex-col justify-between gap-4 overflow-y-auto style-scroll">
        {/* Detalles del producto */}
        <div className="h-full w-full p-2 mb-1">
          <p className="text-[#7DA7B7] font-bold text-sm">Descripción </p>
          <div className="h-full w-full border border-gray-300 p-2">
            {/* NOmbre del producto y descripcion del producto */}
            {/* Nombre */}
            <div>
              <label className="font-semibold text-sm" htmlFor="name">
                Nombre del producto
                <input
                  onChange={changeInputs}
                  type="text"
                  value={name}
                  name="name"
                  id="name"
                  className="w-full border border-gray-400 bg-white rounded-md p-2 text-md"
                />
              </label>
            </div>
            {/*descripcion  */}
            <div>
              <label className="font-semibold text-sm" htmlFor="description">
                Descripción del producto
                <textarea
                  onChange={changeInputs}
                  value={description}
                  name="description"
                  id="description"
                  rows={5}
                  className="w-full p-2 border border-gray-400 bg-white rounded-md resize-none style-scroll"
                ></textarea>
              </label>
              {/* Boton para que genere una descripcion con ia */}
              <div className="flex ">
                <button
                  onClick={() => console.log(formState)}
                  className="bg-blue-500 text-white rounded-md p-1"
                >
                  Generar descripcion
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* supplier y categoria */}
        <div className="h w-full p-2 mb-1 ">
          <p className="text-[#7DA7B7] font-bold text-sm">
            Proveddor y categoria
          </p>
          <div className="h-full w-full border border-gray-300 flex justify-around p-2 items-center gap-10">
            {/* Select de supplier  */}
            <div className="w-72">
              <Select
                name={"supplier"}
                options={suppliers}
                value={supplier}
                initial="Selecciona proveedor"
                callBack={changeInputsSelect}
              />
            </div>
            {/* Select de categoria o marca */}
            <div className="w-72">
              <Select
                name={"category"}
                options={categories}
                value={category}
                initial="Selecciona categoria"
                callBack={changeInputsSelect}
              />
            </div>
          </div>
        </div>
        {/* Cantidad y unidad */}
        <div className="h-full w-full p-2 mb-1 ">
          <p className="text-[#7DA7B7] font-bold text-sm">Cantidad y unidad</p>
          <div className="h-full w-full border border-gray-300 flex flex-col justify-around p-2 ">
            {/* cantidad */}
            <div>
              <label className="font-semibold text-sm" htmlFor="quantity">
                Cantidad
                <input
                  onChange={changeInputs}
                  type="number"
                  name="quantity"
                  value={quantity}
                  id="quantity"
                  placeholder="0"
                  className="w-full border border-gray-500 bg-white rounded-md p-2 text-md"
                />
              </label>
            </div>
            {/* Unidad de medida de cada producto kg, cajas, litros */}
            <div>
              <label className="font-semibold text-sm" htmlFor="unit">
                Unidad
              </label>
              <Select
                name="unit"
                value={unit}
                options={units}
                initial="Unidad de medida"
                callBack={changeInputsSelect}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Precio y foto del producto a subir */}
      <section className="w-full h-full flex flex-col justify-evenly p-2 gap-2 bg-white">
        {/* Imagen del producto */}
        <div className="h-full w-full ">
          <div>
            <p className="text-[#7DA7B7] font-bold text-sm">
              imagen del producto
            </p>
            <UploadImageProduct uploadImage={handleUploadImage} image={image} />
          </div>
        </div>
        {/* Precio del producto */}
        <div className="h-full w-full p-2 ">
          <p className="text-[#7DA7B7] font-bold text-sm">Precio producto</p>
          <div className="h-full w-full border border-gray-300 flex items-center p-2  ">
            <label className="font-semibold text-sm " htmlFor="price">
              Precio del producto por{" "}
              {units.find((u) => u.id.toString() === unit.toString())?.name}
              {/* {unit} */}
              <input
                onClick={validateUnit}
                onChange={changeInputs}
                value={price}
                type="number"
                name="price"
                id="price"
                placeholder="0"
                className=" mt-2 w-full border border-gray-500 bg-white rounded-md p-2 text-md"
              />
            </label>
          </div>
        </div>
        {/* Botones de crear o cancelar */}
        <div className="h-full w-full -300 p-2">
          <div className="h-full w-full flex justify-center items-center gap-2">
            <button className="w-1/2 h-10 bg-red-500 text-white rounded-md">
              Cancelar
            </button>
            <button
              onClick={(e) => createProduct(e)}
              // onClick={(e) => console.log(formState)}
              className="w-1/2 h-10 bg-blue-500 text-white rounded-md"
            >
              Crear
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export const UploadImageProduct = ({ image, uploadImage }) => {
  return (
    <div className="h-full w-full border border-gray-300 flex justify-center p-2 items-center ">
      <label
        className="h-52 w-52  border-dashed border-2 border-gray-500 flex flex-col justify-center items-center text-center "
        htmlFor="imageproduct"
      >
        {/* si hay image colocar img si no nada */}
        {image.urlImage && (
          <img
            className="h-full  overflow-hidden object-cover"
            src={image.urlImage}
            alt=""
          />
        )}
        <AiFillCamera className={`${image.urlImage && "hidden"}  h-10 w-10`} />
        Seleccionar imagen
      </label>
      <input
        onChange={uploadImage}
        className="w-0 h-0"
        type="file"
        id="imageproduct"
      />
    </div>
  );
};

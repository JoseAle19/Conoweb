import { useState } from "react";
import { SvgUploadImage } from "../svgs/svg";
import { CgImage } from "react-icons/cg";
import Swal from "sweetalert2";
export const UploadImage = ({ setSelectedimage, image }) => {
  const [onMouse, setOnMouse] = useState(false);
  return (
    <div className="w-20 h-20 relative">
      <input
        onChange={(e) => {
          const regex = /^.*\.(jpg|jpeg|png)$/i; // La 'i' después de '$' hace que la coincidencia sea insensible a mayúsculas y minúsculas
          const fileType = e.target.files[0].name;
          if (!regex.test(fileType)) {
            return Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "La extensión no es válida, solo png, jpg y jpeg",
            });
          } else {
            setSelectedimage({
              urlImage: URL.createObjectURL(e.target.files[0]),
              imageFile: e.target.files[0],
            });
          }
        }}
        className="w-[.1px] h-[.1px] absolute z-10 "
        id="file"
        type="file"
      />
      <label
        onMouseEnter={() => setOnMouse(true)}
        onMouseLeave={() => setOnMouse(false)}
        className="cursor-pointer absolute left-0 right-0 top-0 z-30  w-full h-full bg-white rounded-full"
        htmlFor="file"
      >
        <div className="w-full h-full relative flex justify-center items-center  ">
          {image ? (
            <img
              className="object-cover h-full w-full rounded-full bg-black/20"
              src={image}
              alt=""
            />
          ) : (
            <CgImage className="h-1/2 w-1/2 " color="black" />
          )}
          {onMouse && (
            <span className="   text-center text-[3rem] font-bold text-black/60 absolute inset-0 flex items-center justify-center">
              +
            </span>
          )}
        </div>
      </label>
    </div>
  );
};

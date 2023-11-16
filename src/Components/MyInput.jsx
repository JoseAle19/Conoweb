
export const MyInput = ({ placeholder, svg, type, name,value, arrowFunction }) => {
    return (
      <>
        <div className="w-full text-black  rounded-full bg-white p-2 flex gap-3 items-center">
          {svg}
          <input
            name={name}
            value={value}
            onChange={(e) => {
              arrowFunction(e);
            }}
            type={type}
            className="w-full bg-transparent outline-none "
            placeholder={placeholder}
            autoComplete="Correo"
          />
        </div>
      </>
    );
  };
  
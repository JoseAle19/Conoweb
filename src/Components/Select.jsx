
export const Select = ({
  name = "",
  value = "",
  options = [],
  initial = "",
  callBack
}) => {
  return (
    <select
      name={name}
      className="w-full border border-gray-400 bg-white rounded-md p-2 text-md "
      value={value}
      onChange={(e) => callBack(e)}
    >
      <option value="" disabled>{initial} </option>
      {options.map((option) => (
        <option 
        className="text-black  text-sm  " 
         key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

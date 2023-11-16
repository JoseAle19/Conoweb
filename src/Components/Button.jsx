import React from "react";

export const Button = ({ texttype, typefunction }) => {
  return (
    <button
      onClick={(e) => {
        typefunction(e)
      }}
      className="bg-[#EC038D] py-2 px-12 font-bold rounded-full text-2xl text-white mt-5 hover:scale-105 duration-300"
    >
      {texttype}
    </button>
  );
};

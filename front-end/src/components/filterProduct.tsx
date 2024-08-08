import React from "react";
import { CiForkAndKnife } from "react-icons/ci";

interface FilterProductProps {
  category: string;
  onClick: () => void;
  isActive: boolean;
}

function FilterProduct(props:FilterProductProps){
  return (
    <div onClick={props.onClick}>
      <div className={`text-3xl p-5 m-8 rounded-full cursor-pointer ${props.isActive ? "bg-red-600 text-white" : "bg-yellow-500"}`}>
        <CiForkAndKnife />
      </div>
      <p className="text-center font-medium my-1 capitalize">{props.category}</p>
    </div>
  );
};

export default FilterProduct;

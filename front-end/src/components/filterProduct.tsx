import React from "react";
import { TiThSmallOutline } from "react-icons/ti";
// import { GiCarrot, GiMeat } from "react-icons/gi";

interface FilterProductProps {
  category: string;
  onClick: () => void;
  isActive: boolean;
}

// Map categories to icons or images
const categoryIcons: { [key: string]: React.ReactNode } = {
  all: <TiThSmallOutline />,
  "fresh vegetable": <img src="../images/vegetable.png" alt="Fruits" className="h-8 w-8" />,
  fruits: <img src="../images/fruit.png" alt="Fruits" className="h-8 w-8" />,
  green: <img src="../images/parsley.png" alt="Green" className="h-8 w-8" />,
  organic: <img src="../images/organic.png" alt="Organic" className="h-8 w-8" />,
  exotic: <img src="../images/guava.png" alt="Exotic" className="h-8 w-8" />,
  juice: <img src="../images/juices.png" alt="Juice" className="h-8 w-8" />,
};

function FilterProduct(props: FilterProductProps) {
  return (
    <div onClick={props.onClick} className="text-center">
      <div
        className={`text-3xl p-5 m-8 rounded-full cursor-pointer ${
          props.isActive ? "bg-red-600 text-white" : "bg-yellow-500"
        }`}
      >
        {/* Render icon or image based on category */}
        {categoryIcons[props.category] || <TiThSmallOutline />}
      </div>
      <p className="text-center font-medium my-1 capitalize">{props.category}</p>
    </div>
  );
}

export default FilterProduct;

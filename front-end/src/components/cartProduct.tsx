import React from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { removeCartItem,} from "../redux/cart";

// Define the props for CartProduct component using TypeScript interface
interface CartProductProps {
  id: string;
  name: string;
  image: string;
  category: string;
  qty: number;
  total: number;
  price: number;
}

const CartProduct: React.FC<CartProductProps> = ({ id, name, image, category, qty, total, price }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-slate-200 p-2 flex gap-4 rounded border border-slate-300">
      <div className="p-3 bg-white rounded overflow-hidden">
        <img src={image} className="h-28 w-40 object-cover " alt={name} />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold text-slate-600 capitalize text-lg md:text-xl">
            {name}
          </h3>
          <div
            className="cursor-pointer text-slate-700 hover:text-red-500"
            onClick={() => dispatch(removeCartItem(id))}
          >
            <AiFillDelete />
          </div>
        </div>
        <p className="text-slate-500 font-medium">{category}</p>
        <p className="font-bold text-base">
          <span className="text-red-500">RS:</span>
          <span  className="text-black">{price}</span>
        </p>
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <button
              
              className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1"
            >
              <TbPlus />
            </button>
            <p className="font-semibold p-1 text-black">{qty}</p>
            <button
              
              className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1"
            >
              <TbMinus />
            </button>
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <p>Total :</p>
            <p  className="text-black">
              <span className="text-red-500">RS:</span>{total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;

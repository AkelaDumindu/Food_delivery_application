import React, { useContext } from "react";
import { Link } from "react-router-dom";

// Define the props for CardFeature
interface CardFeatureProps {
  image?: string;
  name?: string;
  price?: number;
  category?: string;
  id?: string;
}

// Create a CartContext to manage the cart state globally
const CartContext = React.createContext({
  addCartItem: (item: any) => {},
});

function CardFeature({ image, name, price, category, id }: CardFeatureProps) {
  const { addCartItem } = useContext(CartContext); // Use the CartContext

  const handleAddCartProduct = () => {
    if (id && name && price && category && image) {
      addCartItem({
        _id: id,
        name: name,
        price: price,
        category: category,
        image: image,
      });
    }
  };

  return (
    <div className="w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col">
      <Link
        to={`/menu/${id}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <div className="h-28 flex flex-col justify-center items-center">
          <img src={image} className="h-full" alt={name} />
        </div>
        <h3 className="font-semibold text-slate-600 capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
          {name}
        </h3>
        <p className="text-slate-500 font-medium">{category}</p>
        <p className="font-bold">
          <span className="text-red-500">₹</span>
          <span>{price}</span>
        </p>
      </Link>
      <button
        className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 w-full"
        onClick={handleAddCartProduct}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default CardFeature;

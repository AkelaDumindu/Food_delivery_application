import React from "react";
import { useSelector } from "react-redux";
// import emptyCartImage from "../assets/empty.gif";
import { toast } from "react-hot-toast";
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";
import CartProduct from "../components/cartProduct"; // Assuming you have a CartProduct component



// Define a CartItem type
interface CartItem {
  _id: string;
  name: string;
  category: string;
  image: string;
  qty: number;
  total: number;
  price: number;
}

const Cart: React.FC = () => {
  const navigate = useNavigate();

  // Retrieve cart items from the Redux store
  const productCartItem = useSelector((state: any) => state.cart.cartItem) as CartItem[];
  const totalQty = productCartItem.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = productCartItem.reduce((acc, item) => acc + item.total, 0);

  // Stripe payment function (assuming you have your Stripe API key)
  const handlePayment = async () => {
    const stripe = await loadStripe("your-stripe-public-key");

    const response = await fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: productCartItem,
      }),
    });

    const session = await response.json();

    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    });

    // if (result?.error) {
    //   toast.error(result.error.message);
    // }
  };

  return (
    <div className="p-2 md:p-4">
      <h2 className="text-lg md:text-2xl font-bold text-slate-600">
        Your Cart Items
      </h2>

      (
        <div className="my-4 flex gap-3">
          {/* Display cart items */}
          <div className="w-full max-w-3xl">
            {productCartItem.map((el) => (
              <CartProduct
                key={el._id}
                id={el._id}
                name={el.name}
                image={el.image}
                category={el.category}
                qty={el.qty}
                total={el.total}
                price={el.price}
              />
            ))}
          </div>

          {/* Total cart summary */}
          <div className="w-full max-w-md ml-auto">
            <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
            <div className="flex w-full py-2 text-lg border-b text-black">
              <p>Total Qty :</p>
              <p className="ml-auto w-32 font-bold">{totalQty}</p>
            </div>
            <div className="flex w-full py-2 text-lg border-b text-black">
              <p>Total Price</p>
              <p className="ml-auto w-32 font-bold">
                <span className="text-red-500">RS:</span> {totalPrice}
              </p>
            </div>
            <button
              className="bg-red-500 w-full text-lg font-bold py-2 text-white"
              onClick={handlePayment}
            >
              Payment
            </button>
          </div>
        </div>
      ) 
    </div>
  );
};

export default Cart;

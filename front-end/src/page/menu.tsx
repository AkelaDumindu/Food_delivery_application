import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AxiosInstance from '../config/axiosInstance';
import AllProduct from '../components/allProduct';
import { addCartItem } from '../redux/cart';
import { toast } from 'react-hot-toast';

interface Product {
  _id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  unitPrice: number;
}

const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    findProduct();
  }, [id]);

  const findProduct = async () => {
    try {
      const response = await AxiosInstance.get(`/products/find-product/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addCartItem(product));
      toast.success('Item added to cart successfully');
    } else {
      toast.error('Failed to add item to cart');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl m-auto md:flex bg-white">
        <div className="max-w-sm overflow-hidden w-full p-5">
          <img
            src={product.image}
            className="hover:scale-105 transition-all h-full"
            alt={product.name}
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-slate-600 capitalize text-2xl md:text-4xl">
            {product.name}
          </h3>
          <p className="text-slate-500 font-medium text-2xl">
            {product.category}
          </p>
          <p className="font-bold md:text-2xl">
            <span className="text-red-500">RS:</span>
            <span className="text-red-500">{product.unitPrice}</span>
          </p>
          <div className="flex gap-3">
            <button
              className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
            >
              Buy
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
            >
              Add Cart
            </button>
          </div>
          <div>
            <p className="text-slate-600 font-medium">Description:</p>
            <p className="text-slate-600 font-medium">{product.description}</p>
          </div>
        </div>
      </div>

      <AllProduct heading="Related Products" />
    </div>
  );
};

export default Menu;

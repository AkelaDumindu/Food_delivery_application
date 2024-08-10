import React, { useEffect, useRef, useState } from 'react';
import '../utility/home.css';
// import HomeCard from '../components/HomeCard';
import AxiosInstance from '../config/axiosInstance';
import { GrNext, GrPrevious } from 'react-icons/gr';
import AllProduct from '../components/allProduct';
import HomeCard from '../components/homeCard';

interface Product {
  _id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  unitPrice: number;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const slideProductRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    findAllProducts();
  }, []); // Run only once on component mount

  const findAllProducts = async () => {
    const response = await AxiosInstance.get('/products/find-all-product');
    setProducts(response.data.data);
  };

  const deleteProduct = async (id: string) => {
    await AxiosInstance.delete(`/products/delete-by-id/${id}`);
    findAllProducts();
  };

  const nextProduct = () => {
    if (slideProductRef.current) {
      slideProductRef.current.scrollLeft += 200;
    }
  };

  const preveProduct = () => {
    if (slideProductRef.current) {
      slideProductRef.current.scrollLeft -= 200;
    }
  };

  return (
    <div className="p-2 md:p-4 mx-8">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              className="h-7"
              alt="Bike Delivery"
            />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3 text-black">
            The Fasted Delivery in{" "}
            <span className="text-red-600 text-">Your Home</span>
          </h2>
          <p className="py-3 text-2xl text-black">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">
            Order Now
          </button>
        </div>

        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {products
            .filter((product) => product.category.toLowerCase() === "vegetable")
            .slice(0, 4)
            .map((product, index) => (
              <HomeCard
                key={product._id}
                name={product.name}
                description={product.description}
                category={product.category}
                price={product.unitPrice}
                image={product.image}
                id={product._id}
              />
            ))}
        </div>
      </div>

      <div>
        <div className="flex w-full items-center">
          <h2 className="font-bold text-3xl text-slate-800 mb-8">Fresh Vegetables</h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all justify-center"
          ref={slideProductRef}
        >
          {products
            .filter((product) => product.category.toLowerCase() === "vegetable")
            .map((product, index) => (
              <HomeCard
                key={index}
                name={product.name}
                description={product.description}
                category={product.category}
                price={product.unitPrice}
                image={product.image}
                id={product._id}
              />
            ))}
        </div>
      </div>

      <AllProduct heading="Your Product" />
    </div>
  );
};

export default Home;

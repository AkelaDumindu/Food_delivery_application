import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../config/axiosInstance';
import AllProduct from '../components/allProduct';

// interface Product {
//   _id: string;
//   name: string;
//   category: string;
//   description: string;
//   image: string;
//   unitPrice: number;
// }

const Menu: React.FC = () => {
  
  // const [products, setProducts] = useState<Product[]>([]);
  const { id } = useParams<{ id: string }>();
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [unitPrice, setUnitPrice] = useState<number | ''>('');
  const [category, setCategory] = useState('');
  
  const [selectedId, setSelectedId] = useState('');
  
  useEffect(() => {
    findProduct();
  }, [id]); 
  
  const findProduct = async()=>{
    // console.log(id);
    const product = await AxiosInstance.get(`/products/find-product/`+id);
    
    setSelectedId(product.data);
    // console.log(product.data);
    setName(product.data.name);
    setDescription(product.data.description);
    setImage(product.data.image);
    setUnitPrice(parseFloat(product.data.unitPrice));
    setCategory(product.data.category);
    
    
}

  
  

  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl m-auto md:flex bg-white">
        <div className="max-w-sm overflow-hidden w-full p-5">
          <img
            src={image}
            className="hover:scale-105 transition-all h-full"
            alt={name}
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-slate-600 capitalize text-2xl md:text-4xl">
            {name}
          </h3>
          <p className="text-slate-500 font-medium text-2xl">
            {category}
          </p>
          <p className="font-bold md:text-2xl">
            <span className="text-red-500">₹</span>
            <span className="text-red-500">{unitPrice}</span>

          </p>
          <div className="flex gap-3">
            <button
              
              className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
            >
              Buy
            </button>
            <button
              
              className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
            >
              Add Cart
            </button>
          </div>
          <div>
            <p className="text-slate-600 font-medium">Description:</p>
            <p className="text-slate-600 font-medium">{description}</p>
          </div>
        </div>
      </div>

      <AllProduct heading="Related Products" />
    </div>
  );
};

export default Menu;

import React, { useEffect, useState } from "react";
import AxiosInstance from '../config/axiosInstance';
import FilterProduct from "./filterProduct";
import CardFeature from "./cardFeature";


interface Product {
  _id: string;
  name: string;
  category: string;
  image: string;
  unitPrice: number;
}

interface AllProductProps {
  heading: string;
}

const AllProduct: React.FC<AllProductProps> = ({ heading }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [filterBy, setFilterBy] = useState<string>('All');
  const [dataFilter, setDataFilter] = useState<Product[]>([]);

  useEffect(() => {
    findAllProducts();
  }, []); // Run only once on component mount

  useEffect(() => {
    if (filterBy === 'All') {
      setDataFilter(products);
    } else {
      setDataFilter(products.filter(product => product.category === filterBy));
    }
  }, [filterBy, products]);

  const findAllProducts = async () => {
    const response = await AxiosInstance.get('/products/find-all-product');
    const productsData: Product[] = response.data.data;
    
    setProducts(productsData);

    // Extract categories and ensure they are strings
    const uniqueCategories = Array.from(new Set(productsData.map((product: Product) => product.category || '')));
    
    // Add "All" to the beginning of the categories array
    setCategories(['All', ...uniqueCategories]);
};


  const deleteProduct = async (id: string) => {
    await AxiosInstance.delete(`/products/delete-by-id/${id}`);
    findAllProducts();
  };

  return (
    <div className="my-5 p-24 pt-0 pb-0">
      <h2 className="font-bold text-3xl text-slate-800 mb-8 mt-8">{heading}</h2>

      <div className="flex gap-4 justify-center overflow-scroll scrollbar-none text-black ">
        {categories.map((category, index) => (
          <FilterProduct 
            key={index}
            category={category}
            isActive={category === filterBy}
            onClick={() => setFilterBy(category)}
          />
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4 my-4">
        {dataFilter.length ? (
          dataFilter.map((el) => (
            <CardFeature
              key={el._id}
              id={el._id}
              image={el.image}
              name={el.name}
              category={el.category}
              unitPrice={el.unitPrice}
            />
          ))
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProduct;


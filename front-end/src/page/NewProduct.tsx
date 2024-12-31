import React, { useState, ChangeEvent, FormEvent } from 'react';
import { BsCloudUpload } from 'react-icons/bs';
import { ImagetoBase64 } from '../utility/imageToBase64';
import axios, { Axios } from 'axios';
import AxiosInstance from '../config/axiosInstance';

interface Product {
  _id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  unitPrice: number;
}

const Product: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [unitPrice, setUnitPrice] = useState<number | ''>('');
  const [category, setCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const data = await ImagetoBase64(file);
    setImage(data as string);
  };


  

  const saveProduct = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

     // Form validation
     if (!name || !category || !unitPrice) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }


    try {
      // const response = await axios.post('http://localhost:3000/api/v1/products/save-product', {
        const response = await AxiosInstance.post('/products/save-product', {
        name,
        description,
        category,
        unitPrice,
        image
      });

      // Add the new product to the products state
      const newProduct: Product = response.data;
      setProducts((prev) => [...prev, newProduct]);

      // Reset form fields
      setName('');
      setDescription('');
      setCategory('');
      setUnitPrice('');
      setImage(null);
      setErrorMessage('');
      setSuccessMessage('Product uploaded successfully!');

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <form
        className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white'
        onSubmit={saveProduct}
      >
        {errorMessage && <div className="text-red-500 mb-2">{errorMessage}</div>}
        {successMessage && <div className="text-green-500 mb-2">{successMessage}</div>}
        <label htmlFor='name' className='my-1 text-black'>Name</label>
        <input
          type="text"
          name="name"
          className='bg-slate-200 p-1 my-1 text-black'
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <label htmlFor='category' className='my-1 text-black'>Category</label>
        <select
          className='bg-slate-200 p-1 my-1 text-black'
          id='category'
          name='category'
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option value="">Select category</option>
          <option value="fresh vegetable">Fresh Vegetable</option>
          <option value="fruits">Fresh Fruits</option>
          <option value="green">Green & Herbs</option>
          <option value="organic">Organic Vegetables and Fruits</option>
          <option value="exotic">Exotic Fruits & Vegetables</option>
          <option value="juice">Juices & Smoothie Ingredients</option>
          {/* <option value="cake">Cake</option>
          <option value="burger">Burger</option>
          <option value="paneer">Paneer</option>
          <option value="sandwich">Sandwich</option> */}
        </select>

        <label htmlFor='image' className='my-1 text-black'>Image
        <div className='h-40 w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer'>
          {image ? (
            <img src={image} className="h-full" alt="Product" />
          ) : (
            <span className='text-5xl'><BsCloudUpload /></span>
          )}
          <input type="file" accept="image/*" id="image" onChange={uploadImage} className="hidden" />
        </div>
        </label>

        <label htmlFor='price' className='my-1 text-black'>Price</label>
        <input
          type="text"
          className='bg-slate-200 p-1 my-1 text-black'
          name='price'
          onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
          value={unitPrice}
        />

        <label htmlFor='description' className='my-1 text-black'>Description</label>
        <textarea
          rows={2}
          value={description}
          className='bg-slate-200 p-1 my-1 resize-none text-black'
          name='description'
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button type="submit" className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow'>
          Save
        </button>
      </form>
    </div>
  );
};

export default Product;

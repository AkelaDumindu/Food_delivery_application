import React, { useEffect, useRef, useState } from "react";
import "../utility/home.css";
import AxiosInstance from "../config/axiosInstance";
import { GrNext, GrPrevious } from "react-icons/gr";
import AllProduct from "../components/allProduct";
import HomeCard from "../components/homeCard";

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
  }, []);

  const findAllProducts = async () => {
    const response = await AxiosInstance.get("/products/find-all-product");
    setProducts(response.data.data);
  };

  const nextProduct = () => {
    if (slideProductRef.current) {
      slideProductRef.current.scrollLeft += 300;
    }
  };

  const preveProduct = () => {
    if (slideProductRef.current) {
      slideProductRef.current.scrollLeft -= 300;
    }
  };

  return (
    <div className="home-container">
      {/* Banner Section */}
      <div className="banner">
        <div className="banner-text">
          <h1 className="banner-title">
            Delicious Food <span>Delivered to Your Doorstep</span>
          </h1>
          <p className="banner-description">
            Experience the best food delivery service with our wide selection of
            restaurants and fresh, hot meals delivered to your location.
          </p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter delivery location"
              className="search-input"
            />
            <select className="distance-selector">
              <option>10KM</option>
              <option>5KM</option>
              <option>20KM</option>
            </select>
            <button className="search-button">Search</button>
          </div>
        </div>
        <div className="banner-image">
          <img
            src="../images/food_delivery.png"
            alt="Delicious Food"
          />
        </div>
      </div>

      {/* Featured Section */}
      <div className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Fresh Vegetables</h2>
          <div className="navigation-buttons">
            <button onClick={preveProduct} className="nav-button">
              <GrPrevious />
            </button>
            <button onClick={nextProduct} className="nav-button">
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="product-slider"
          ref={slideProductRef}
        >
          {products
            .filter(
              (product) => product.category.toLowerCase() === "vegetable"
            )
            .map((product) => (
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

      {/* All Products */}
      <AllProduct heading="Your Product" />
    </div>
  );
};

export default Home;

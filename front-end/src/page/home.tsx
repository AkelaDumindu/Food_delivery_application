import React, { useEffect, useRef, useState } from "react";
import "../utility/home.css";
import AxiosInstance from "../config/axiosInstance";
import { GrNext, GrPrevious } from "react-icons/gr";
import AllProduct from "../components/allProduct";
import HomeCard from "../components/homeCard";
import { TiThSmallOutline } from "react-icons/ti";

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
          Farm-Fresh Goodness <span>Right at Your Doorstep!</span>
          </h1>
          <p className="banner-description">
          Savor the taste of nature with our handpicked, farm-fresh vegetables delivered straight to your home. From lush farms to your kitchen, we ensure the freshest, highest-quality produce packed with flavor and nutrition. Whether you're cooking a family dinner or whipping up a quick snack, our vegetables are here to elevate every dish. Enjoy seasonal favorites, locally sourced varieties, and organic options—all with just a few clicks. Eat fresh, live healthy—one doorstep at a time
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
              (product) => product.category.toLowerCase() === "fresh vegetable"
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

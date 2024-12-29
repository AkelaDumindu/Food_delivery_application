import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import { useState } from 'react';
import Home from "./page/home";
import Contact from "./page/contact";
import About from "./page/about";
import NewProduct from "./page/NewProduct";
import Login from "./page/login";
import Signup from "./page/Signup";
import Menu from "./page/menu";
import { BsCartFill } from "react-icons/bs";
import Cart from "./page/cart";

function App() {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div className="app-container">
      <Router>
      <header className="fixed shadow-md w-full h-16 px-4 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
  {/* Desktop Navigation */}
  <div className="flex items-center h-full justify-between max-w-7xl mx-auto">
    {/* Logo */}
    <Link to="/">
      <div className="h-10 flex items-center">
        <img src="./assest/logo2.png" alt="Logo" className="h-full" />
        <span className="ml-2 font-bold text-lg">FoodieHub</span>
      </div>
    </Link>

    {/* Nav Links */}
    <nav className="hidden md:flex items-center gap-6 font-medium">
      <Link
        to="/"
        className="hover:text-yellow-300 transition duration-300 ease-in-out"
      >
        Home
      </Link>
      <Link
        to="/menu/66b479c7feb597c604dba5e5"
        className="hover:text-yellow-300 transition duration-300 ease-in-out"
      >
        Menu
      </Link>
      <Link
        to="/about"
        className="hover:text-yellow-300 transition duration-300 ease-in-out"
      >
        About
      </Link>
      <Link
        to="/contact"
        className="hover:text-yellow-300 transition duration-300 ease-in-out"
      >
        Contact
      </Link>
    </nav>

    {/* Icons and Avatar */}
    <div className="flex items-center gap-4">
      {/* Cart Icon */}
      <div className="relative">
        <Link to="/cart" className="text-2xl">
          <BsCartFill />
        </Link>
        <div className="absolute -top-1 -right-1 bg-red-500 text-xs text-white h-4 w-4 flex items-center justify-center rounded-full">
          3
        </div>
      </div>

      {/* User Avatar */}
      <div className="relative">
        <div
          className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden cursor-pointer"
          onClick={handleShowMenu}
        >
          <img src="./assest/avatar.png" alt="User Avatar" />
        </div>
        {showMenu && (
          <div className="absolute right-0 mt-2 bg-white text-black shadow-md rounded-lg py-2 w-40">
            <Link
              to="/newproduct"
              className="block px-4 py-2 hover:bg-gray-200 transition"
            >
              New Product
            </Link>
            <Link
              to="/login"
              className="block px-4 py-2 hover:bg-gray-200 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block px-4 py-2 hover:bg-gray-200 transition"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  </div>

  {/* Mobile Navigation */}
  <div className="md:hidden">
    <div className="flex justify-between items-center">
      <Link to="/">
        <img src="./assest/logo2.png" alt="Logo" className="h-10" />
      </Link>
      <button
        className="text-3xl text-white"
        onClick={() => setShowMenu(!showMenu)}
      >
        ☰
      </button>
    </div>
    {showMenu && (
      <nav className="bg-blue-600 text-white p-4 flex flex-col space-y-2 mt-2">
        <Link
          to="/"
          className="hover:bg-blue-700 p-2 rounded transition duration-300"
        >
          Home
        </Link>
        <Link
          to="/menu/66b479c7feb597c604dba5e5"
          className="hover:bg-blue-700 p-2 rounded transition duration-300"
        >
          Menu
        </Link>
        <Link
          to="/about"
          className="hover:bg-blue-700 p-2 rounded transition duration-300"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="hover:bg-blue-700 p-2 rounded transition duration-300"
        >
          Contact
        </Link>
        <Link
          to="/cart"
          className="hover:bg-blue-700 p-2 rounded transition duration-300"
        >
          Cart
        </Link>
      </nav>
    )}
  </div>
</header>


        {/* Main content area, outside of the header */}
        <main className="pt-16 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/newproduct" element={<NewProduct />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/menu/:id" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>


        

      </Router>
    </div>
  );
}

export default App;

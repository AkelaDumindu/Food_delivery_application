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

function App() {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div className="app-container container-fluid">
      <Router>
        <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
          {/* desktop */}
          <div className="flex items-center h-full justify-between">
            <Link to="/">
              <div className="h-10">
                <img src="" alt="Logo" className="h-full" />
              </div>
            </Link>

            <div className="flex items-center gap-4 md:gap-7">
              <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
                <Link to="/">Home</Link>
                <Link to="/menu">Menu</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
              </nav>
              <div className="text-2xl text-slate-600 relative">
                <Link to="cart">
                  <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center"></div>
                </Link>
              </div>
              <div className="text-slate-600" onClick={handleShowMenu}>
                <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
                  {/* Add your avatar image here */}
                  <img src="" alt="User Avatar" className="h-full w-full" />
                </div>
                {showMenu && (
                  <div className="absolute right-2 bg-white py-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                    <Link to="/newproduct" className="whitespace-nowrap cursor-pointer px-2">New product</Link>
                    <Link to="/login" className="whitespace-nowrap cursor-pointer px-2">Login</Link>
                    <nav className="text-base md:text-lg flex flex-col md:hidden">
                      <Link to="/" className="px-2 py-1">Home</Link>
                      <Link to="/menu" className="px-2 py-1">Menu</Link>
                      <Link to="/about" className="px-2 py-1">About</Link>
                      <Link to="/contact" className="px-2 py-1">Contact</Link>
                    </nav>
                  </div>
                )}
              </div>
            </div>
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
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;

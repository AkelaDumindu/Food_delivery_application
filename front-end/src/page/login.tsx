import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/users/login', { email, password });

      
      const { role } = response.data.user;

      
      setEmail('');
      setPassword('');

      
      if (role === "admin") {
        
        navigate('/newproduct');
      } else {
       
        navigate('/');
      }

    } catch (error) {
      console.error("Login failed:", error);
      
    }
  };

  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        <form className="w-full py-3 flex flex-col">
          <label htmlFor="email" className="text-black">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-2 py-1 bg-slate-200 rounded mt-1 mb-2 text-black"
          />

          <label htmlFor="password" className="text-black">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-200 border-none outline-none"
            />
            <span className="flex text-xl cursor-pointer" onClick={handleShowPassword}>
              {showPassword ? "👁️" : "🙈"}
            </span>
          </div>

          <button
            type="button"
            className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 text-white text-xl font-medium text-center py-1 rounded-full mt-4"
            onClick={login}
          >
            Login
          </button>
        </form>
        <p className="text-left text-black text-sm mt-2">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-red-500 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

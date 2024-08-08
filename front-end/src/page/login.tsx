import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
// import AxiosInstance  from '../config/axiosInstance';
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";
import '../App.css'
import axios from "axios";



const Login:React.FC= ()=> {
 
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async ()=>{
        
      try {
          const response = await axios.post('/users/login', {
             email, password
          });
  
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate()+2);

          const cookieValue=encodeURIComponent('token')+'='
              +encodeURIComponent(response.data)+'; expires='+expirationDate.toUTCString()+'; path=/';
          document.cookie = cookieValue;

          console.log(response.data);
          
          setEmail('');
          setPassword('');
          
      } catch (error) {
          console.log(error);
          
          
      }
      
  }
  

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
 

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
        {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1> */}
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
        <img src={loginSignupImage} className="w-full" />
      </div>


        <form className="w-full py-3 flex flex-col">
          

          <label htmlFor="email" className="text-black">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            onChange={(e)=>{
              setEmail(e.target.value);
            }}
            className="px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300 text-black"
            
          />

          <label htmlFor="password" className="text-black">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300 text-black">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              onChange={(e)=>{
                setPassword(e.target.value);
              }}
              className=" w-full bg-slate-200 border-none outline-none "
              
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          
          

          <button className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4" 
          onClick={(e)=>{
            login();
          }}
          >
            Login
          </button>
        </form>
        <p className="text-left text-black text-sm mt-2">
          Already have account ?{" "}
          <Link to={"/signup"} className="text-red-500 underline">
            signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;


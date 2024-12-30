import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { ImagetoBase64 } from "../utility/imageToBase64";
import axios from "axios";

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const data = await ImagetoBase64(file);
    setImage(data as string);
  };

  const signup = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/users/register', {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        image,
      });

      console.log(response);

      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setImage(null);

      // Redirect to login page (optional)
      // window.location.href = "/login";
    } catch (error) {
      console.log(error);
      
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative ">
          <img src="" className="w-full h-full" alt="Profile" />
          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
              <p className="text-sm p-1 text-white">Upload</p>
            </div>
            <input type={"file"} id="profileImage" onChange={uploadImage} accept="image/*" className="hidden" />
          </label>
        </div>

        <form className="w-full py-3 flex flex-col">
          <label htmlFor="firstName" className="text-black">First Name</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2">
            <input
              type={"text"}
              id="firstName"
              name="firstName"
              className="w-full bg-slate-200 border-none outline-none text-black"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <label htmlFor="lastName" className="text-black">Last Name</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2">
            <input
              type={"text"}
              id="lastName"
              name="lastName"
              className="w-full bg-slate-200 border-none outline-none text-black"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <label htmlFor="email" className="text-black">Email</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2">
            <input
              type={"email"}
              id="email"
              name="email"
              className="w-full bg-slate-200 border-none outline-none text-black"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label htmlFor="password" className="text-black">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full bg-slate-200 border-none outline-none text-black"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="flex text-xl cursor-pointer" onClick={handleShowPassword}>
              {showPassword ? "👁️" : "🙈"}
            </span>
          </div>

          <label htmlFor="confirmPassword" className="text-black">Confirm Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className="w-full bg-slate-200 border-none outline-none text-black"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span className="flex text-xl cursor-pointer" onClick={handleShowConfirmPassword}>
              {showConfirmPassword ? "👁️" : "🙈"}
            </span>
          </div>

          <button
            type="button"
            className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 text-white text-xl font-medium text-center py-1 rounded-full mt-4"
            onClick={signup}
          >
            Sign up
          </button>
        </form>
        <p className="text-left text-black text-sm mt-2">
          Already have an account?{" "}
          <Link to={"/login"} className="text-red-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

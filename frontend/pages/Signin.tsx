import { useState } from "react";
import AuthHeading from "../components/AuthHeading";
import SubHeading from "../components/AuthsubHeading";
import InputBox from "../components/inputbox";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function SignInPage() {
  const navigate=useNavigate()
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          userName,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate('/Dashboard')
    } catch (e) {
      console.log("Server Not Responding");
    }
  };

  return (
    <div className="bg-gray-300 min-h-screen font-roboto">
      <Navbar />
      <div className="flex items-center justify-center pt-36">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <AuthHeading label="Sign In" />
            <SubHeading label="Enter your Credentials To Access your Account" />
          </div>

          <InputBox
            onchange={(e) => {
              setUserName(e.target.value);
            }}
            heading="Username"
            placeholder="xxx@gmail.com"
          />
          <InputBox
            onchange={(e) => {
              setPassword(e.target.value);
            }}
            heading="Password"
            placeholder="*******"
          />
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              SignIn
            </button>
          </div>

          <div className="py-2 text-sm flex justify-center">
            <div>Don't have an account?</div>
            <Link
              className="pointer underline pl-1 cursor-pointer"
              to="/signup"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

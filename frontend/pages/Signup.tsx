import AuthHeading from "../components/AuthHeading";
import SubHeading from "../components/AuthsubHeading";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import InputBox from "../components/inputbox";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

export default function SignupPage() {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const { toast } = useToast();
  const handleSubmit = () => {
    try {
      axios.post("http://localhost:3000/api/v1/user/signup", {
        userName,
        firstName,
        lastName,
        password,
      });
      toast({
        title: "Sign Up Successful",
        description: "Lets Go",
      });
    } catch (e) {
      console.log("Server Not Responding");
      toast({
        title: "Oop's Something Went Wrong",
        description: "Sign Up Unsuccessful",
      });
    }
  };

  return (
    <div className="bg-gray-300 min-h-screen font-roboto">
      <Navbar />
      <div className="flex items-center justify-center pt-16">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <AuthHeading label="Sign Up" />
            <SubHeading label="Enter Your Information To Create an Account" />
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
              setFirstName(e.target.value);
            }}
            heading="Firstname"
            placeholder="Sanghrakshit"
          />
          <InputBox
            onchange={(e) => {
              setLastName(e.target.value);
            }}
            heading="Lastname"
            placeholder="gautam"
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
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Sign Up
            </button>
          </div>

          <div className="py-2 text-sm flex justify-center">
            <div>Already have an account?</div>
            <Link
              className="pointer underline pl-1 cursor-pointer"
              to="/signin"
            >
              SignIn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

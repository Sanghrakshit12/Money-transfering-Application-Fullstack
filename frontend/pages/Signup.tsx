import AuthHeading from "../components/AuthHeading";
import SubHeading from "../components/AuthsubHeading";
import InputBox from "../components/inputbox";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; 

export default function SignupPage() {
  return (
    <div className="bg-gray-300 min-h-screen font-roboto">
      <Navbar /> 
      <div className="flex items-center justify-center pt-16">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <AuthHeading label="Sign Up" />
            <SubHeading label="Enter Your Information To Create an Account" />
          </div>
          <form className="mt-4">
            <InputBox heading="Username" placeholder="xxx@gmail.com" />
            <InputBox heading="Firstname" placeholder="Sanghrakshit" />
            <InputBox heading="Lastname" placeholder="gautam" />
            <InputBox heading="Password" placeholder="*******" />
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Sign Up
              </button>
            </div>
          </form>
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

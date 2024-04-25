
import AuthHeading from "../components/AuthHeading";
import SubHeading from "../components/AuthsubHeading";
import InputBox from "../components/inputbox";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function SignInPage() {
  return (
    <div className="bg-gray-300 min-h-screen font-roboto">
      <Navbar /> 
      <div className="flex items-center justify-center pt-36">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <AuthHeading label="Sign In" />
            <SubHeading label="Enter your Credentials To Access your Account" />
          </div>
          <form className="mt-4">
            <InputBox heading="Username" placeholder="xxx@gmail.com" />
            <InputBox heading="Password" placeholder="*******" />
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                SignIn
              </button>
            </div>
          </form>
          <div className="py-2 text-sm flex justify-center">
            <div>Don't have an account?</div>
            <Link className="pointer underline pl-1 cursor-pointer" to="/signup">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

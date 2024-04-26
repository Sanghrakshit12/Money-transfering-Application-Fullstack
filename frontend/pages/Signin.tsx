import { useState } from "react";
import AuthHeading from "../components/AuthHeading";
import SubHeading from "../components/AuthsubHeading";
import InputBox from "../components/inputbox";
import Navbar from "../components/Navbar";
import AuthButton from "../components/SignInButton";
import AuthNavigator from "../components/AuthNavigator";

export default function SignInPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

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
          <AuthButton userName={userName} password={password} />
          <AuthNavigator
            to="/signup"
            message="Don't have an account?"
            where="SignUp"
          />
        </div>
      </div>
    </div>
  );
}

import AuthHeading from "../components/AuthHeading";
import SubHeading from "../components/AuthsubHeading";
import AuthNavigator from "../components/AuthNavigator";
import Navbar from "../components/Navbar";
import InputBox from "../components/inputbox";
import { useState } from "react";
import SignupButton from "../components/SignupButton";

export default function SignupPage() {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

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
            <SignupButton
              userName={userName}
              firstName={firstName}
              lastName={lastName}
              password={password}
            />
          </div>
          <AuthNavigator
            to={"/signin"}
            message={"Already have an account?"}
            where="SignIn"
          />
        </div>
      </div>
    </div>
  );
}

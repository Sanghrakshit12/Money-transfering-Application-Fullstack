import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");


  return (
    <div className="flex items-center justify-between bg-blue-700 p-2 pl-10 pr-4">
      <div className="flex items-center">
        <div className="text-xl font-bold text-white">
          <Link to={"/"} className="font-serif font-semibold">
            MoneyTransferX{" "}
          </Link>
        </div>
        <div className="pl-2">
        </div>
      </div>
      <div className="p-2 ml-32">
        <Link
          to="/dashboard"
          className="font-serif font-semibold text-white text-xl hover:text-green-400 p-8"
        >
          Dashboard
        </Link>
        {!isLoggedIn && (
          <>
            <Link
              to="/signup"
              className="font-serif font-semibold text-white text-xl hover:text-green-400 p-8"
            >
              Sign Up
            </Link>
            <Link
              to="/signin"
              className="font-serif font-semibold text-white text-xl hover:text-green-400 p-8"
            >
              Sign In
            </Link>
          </>
        )}
        {isLoggedIn && (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            type="button"
            className="font-serif font-semibold text-white text-xl  p-8 rounded-md px-5 py-2 ml-4 hover:text-green-400"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
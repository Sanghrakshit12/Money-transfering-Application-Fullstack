import { Link, useNavigate } from "react-router-dom";
import pg2 from "/pg2.png";

export default function Home() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${pg2})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="bg-gray-200 min-h-screen"
      >
        <div className="flex flex-col">
          <div className="w-screen flex items-center justify-start pl-2">
            <div className="pl-20">
              <Link to={"/"}>
                <img
                  style={{ width: "70%", height: "70%" }}
                  src="/icon.png"
                  alt="Icon"
                />
              </Link>
            </div>
            <div className="p-4 ml-32">
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
        </div>
      </div>
    </>
  );
}

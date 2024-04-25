import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="bg-gray-200 min-h-screen">
        <div className="flex flex-col">
          <div className="w-screen flex items-center justify-between bg-blue-700 p-4">
            <div className="text-xl font-semibold text-white">
              MoneyTransferX
            </div>
            <div>
              <Link to="/signup">
                <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded-md ml-4 hover:bg-green-600 focus:outline-none"
                >
                  Sign Up
                </button>
              </Link>
              <Link to="/signin">
                <button
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded-md ml-4 hover:bg-green-600 focus:outline-none"
                >
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

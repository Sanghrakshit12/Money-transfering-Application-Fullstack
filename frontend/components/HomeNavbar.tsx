import { Link, useNavigate } from "react-router-dom";

export default function HomeNavbar() {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("token");
    return (
        <div className="fixed left-0 right-0 top-0 z-10 border-b bg-gray-900 py-2">
            <div className="container mx-auto flex items-center justify-between px-4">
                <div className="flex items-center">
                    <div className="text-xl font-bold text-white">
                        <Link to={"/"} className="font-serif font-semibold text-3xl">
                            MoneyTransferX
                        </Link>
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-center p-2 ml-0 md:ml-32">
                    {isLoggedIn && (
                        <Link
                            to="/dashboard"
                            className="inline-block bg-green-500 hover:bg-green-800 text-white font-semibold mx-2 md:mx-5 my-1 px-5 py-2 rounded shadow"
                        >
                            Dashboard
                        </Link>
                    )}
                    {!isLoggedIn && (
                        <>
                            <Link
                                to="/signup"
                                className="inline-block bg-green-500 hover:bg-green-800 text-white font-semibold mx-2 md:mx-5 my-1 px-5 py-2 rounded shadow"
                            >
                                Sign Up
                            </Link>
                            <Link
                                to="/signin"
                                className="inline-block bg-green-500 hover:bg-green-800 text-white font-semibold mx-2 md:mx-5 my-1 px-5 py-2 rounded shadow"
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
                            className="inline-block bg-red-600 hover:bg-red-500 text-white font-semibold mx-2 md:mx-5 my-1 px-5 py-2 rounded shadow"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

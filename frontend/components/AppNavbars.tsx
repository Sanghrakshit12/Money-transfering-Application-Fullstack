import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Balance {
  Balance: number;
}

export default function AppNavbar() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState<Balance | null>(null);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = localStorage.getItem("token");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/accounts/balance",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBalance(response.data);
      } catch (error) {
        console.error("Error fetching account balance:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchBalance();
    }
  }, [isLoggedIn]);

  return (
    <div className="flex items-center justify-between bg-gray-900 p-5 pl-10 pr-4">
      <div className="flex items-center">
        <div className="text-xl font-bold text-white">
          <Link to={"/"} className="font-serif font-semibold">
            MoneyTransferX
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {loading ? (
          <div className="text-white">Loading...</div>
        ) : (
          balance && (
            <div className="text-xl font-semibold text-white px-4">
              Balance: {balance.Balance}
            </div>
          )
        )}
        {isLoggedIn && (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            type="button"
            className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

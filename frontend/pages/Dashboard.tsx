import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  firstName: string;
  lastName: string;
  _id: string;
}

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [, /*filter*/ setFilter] = useState("");
  const [balance, setBalance] = useState("");
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/user/bulk").then((response) => {
      setUsers(response.data.user);
    });
  }, []);

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
      }
    };

    fetchBalance();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="flex flex-col">
        <div className="w-screen flex items-center justify-between bg-blue-700 p-4">
          <div className="text-xl font-serif font-semibold text-white">
            MoneyTransferX
          </div>
        </div>

        <div className="w-screen p-4 text-2xl font-sans font-semibold text-gray-800">
          Your Balance {balance.Balance}
        </div>
        <div className="w-screen bg-gray-300 p-4 text-2xl font-serif font-semibold text-gray-800">
          Application Users
        </div>
        <div className="w-full p-4 text-lg font-medium text-gray-800">
          <div className="w-full">
            <input
              onChange={(e) => {
                const newFilter = e.target.value;
                setFilter(newFilter);
                axios
                  .get(
                    `http://localhost:3000/api/v1/user/bulk?filter=${newFilter}`
                  )
                  .then((response) => {
                    setUsers(response.data.user);
                  });
              }}
              type="text"
              placeholder="Search"
              className="w-full border border-gray-300 bg-white px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="pt-4">
            {users.map((user: User) => (
              <div
                key={user._id}
                className="flex justify-between items-center bg-gray-300 border-b border-gray-300 p-4"
              >
                <div>{user.firstName}</div>

                <button
                  onClick={() => {
                    navigate(`/send?id=${user._id}&name=${user.firstName}`);
                  }}
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
                >
                  Transfer
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

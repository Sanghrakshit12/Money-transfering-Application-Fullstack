import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../components/AppNavbars";

interface User {
  username: string;
  firstName: string;
  lastName: string;
  _id: string;
}

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [, /*filter*/ setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUsers(response.data.user);
      });
  }, []);

  const navigate = useNavigate();
  return (
    <div className="bg-gray-200 min-h-screen">
      <AppNavbar />
      <div className="bg-gray-600 p-4 pl-10 text-2xl font-serif font-semibold text-white">
        Application Users
      </div>
      <div className="p-4 text-lg font-medium text-gray-800">
        <div className="w-full">
          <input
            onChange={(e) => {
              const newFilter = e.target.value;
              setFilter(newFilter);
              axios.get(
                `http://localhost:3000/api/v1/user/bulk?filter=${newFilter}`,
                {
                  headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              )
              .then((response) => {
                setUsers(response.data.user);
              })
              .catch((error) => {
                console.log(error)
              });
              
            }}
            type="text"
            placeholder="Search User"
            className="w-full border border-gray-300 bg-white px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="pt-4">
          {users.map((user: User, index: number) => (
            <div
              key={user._id}
              className={`flex justify-between items-center bg-gray-300 border-b border-gray-300 p-4 ${
                index < users.length - 1 ? "border-white" : ""
              }`}
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
  );
}
